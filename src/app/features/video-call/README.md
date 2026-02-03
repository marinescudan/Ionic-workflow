# WebRTC Video Call Feature - Lesson 13

This feature implements real-time peer-to-peer video and audio calling using WebRTC.

## Features Implemented

### Core Services (`src/app/core/services/webrtc/`)

1. **MediaDevicesService** - Camera and microphone access
   - `getUserMedia()` - Access camera/microphone
   - `getDisplayMedia()` - Screen sharing
   - `enumerateDevices()` - List available devices
   - `switchCamera()` - Switch between front/back camera
   - `toggleVideo()` / `toggleAudio()` - Enable/disable tracks

2. **PeerConnectionService** - RTCPeerConnection management
   - `createPeerConnection()` - Initialize peer connection
   - `createOffer()` / `createAnswer()` - SDP exchange
   - `addIceCandidate()` - Handle ICE candidates
   - `replaceVideoTrack()` - Switch camera without renegotiation

3. **SignalingService** - WebSocket signaling (uses Socket.IO from Lesson 10)
   - `sendOffer()` / `sendAnswer()` - SDP signaling
   - `sendIceCandidate()` - ICE candidate exchange
   - `sendCallRequest()` / `acceptCall()` / `rejectCall()` - Call control

4. **WebRTCService** - Main orchestration service
   - `initiateCall()` - Start outgoing call
   - `acceptCall()` / `rejectCall()` - Handle incoming calls
   - `endCall()` - Hang up
   - `toggleMute()` / `toggleCamera()` - Media controls
   - `switchCamera()` - Change camera device

5. **StreamRecorderService** - Stream recording
   - `startRecording()` - Begin recording
   - `stopRecording()` - End recording and get Blob
   - `downloadRecording()` - Save recording to file

### UI Components

- **VideoCallPage** (`src/app/features/video-call/pages/video-call/`)
  - Full-screen remote video
  - Picture-in-picture local video
  - Call controls (mute, camera toggle, hang up, record)
  - Device selection
  - Incoming call overlay

## Usage

### 1. Navigate to Video Call Page

The video call page is available at `/video-call` route.

### 2. Start a Call

1. Enter the remote peer ID
2. Click "Start Call"
3. Allow camera/microphone access
4. Wait for peer to accept

### 3. Accept Incoming Call

1. When a call comes in, you'll see the incoming call overlay
2. Click "Accept" to answer or "Decline" to reject

### 4. During Call

- **Mute/Unmute**: Toggle microphone
- **Camera On/Off**: Toggle video
- **Hang Up**: End the call
- **Record**: Start/stop recording (downloads automatically)

## WebRTC Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Caller     │         │ Signaling Server │         │   Callee    │
│  (Browser)  │         │  (WebSocket)     │         │  (Browser)  │
└─────────────┘         └──────────────────┘         └─────────────┘
       │                         │                          │
       │──── getUserMedia() ─────│                          │
       │──── createOffer() ──────│                          │
       │──── send OFFER ─────────│──── forward OFFER ──────>│
       │                         │                          │
       │                         │<──── send ANSWER ────────│
       │<──── receive ANSWER ────│                          │
       │                         │                          │
       │<──── ICE candidates ────│──── ICE candidates ──────>│
       │                         │                          │
       │<===================MEDIA STREAM====================>│
       │              (peer-to-peer, no server)             │
```

## Signaling Server Setup

The WebRTC feature requires a signaling server for coordinating connections. The signaling uses the Socket.IO setup from Lesson 10.

### Signaling Events

**Client → Server:**
- `call-request` - Initiate call
- `call-accept` - Accept incoming call
- `call-reject` - Reject incoming call
- `offer` - Send SDP offer
- `answer` - Send SDP answer
- `ice-candidate` - Send ICE candidate
- `call-end` - Hang up

**Server → Client:**
- `call-request` - Incoming call
- `call-accept` - Call accepted
- `call-reject` - Call rejected
- `offer` - Received SDP offer
- `answer` - Received SDP answer
- `ice-candidate` - Received ICE candidate
- `call-end` - Call ended

### Example Signaling Server (Node.js + Socket.IO)

```typescript
import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: { origin: '*' },
});

const users = new Map<string, string>(); // userId -> socketId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins
  socket.on('join', (userId: string) => {
    users.set(userId, socket.id);
  });

  // Forward call request
  socket.on('call-request', ({ to, callId }) => {
    const calleeSocketId = users.get(to);
    if (calleeSocketId) {
      io.to(calleeSocketId).emit('call-request', {
        from: getUserIdBySocketId(socket.id),
        callId,
      });
    }
  });

  // Forward offer
  socket.on('offer', ({ to, offer }) => {
    const toSocketId = users.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('offer', { offer });
    }
  });

  // Forward answer
  socket.on('answer', ({ to, answer }) => {
    const toSocketId = users.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('answer', { answer });
    }
  });

  // Forward ICE candidate
  socket.on('ice-candidate', ({ to, candidate }) => {
    const toSocketId = users.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('ice-candidate', { candidate });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const userId = getUserIdBySocketId(socket.id);
    if (userId) {
      users.delete(userId);
    }
  });
});
```

## STUN/TURN Servers

The application uses Google's public STUN servers for NAT traversal:
- `stun:stun.l.google.com:19302`
- `stun:stun1.l.google.com:19302`

For production, you may need TURN servers for better connectivity (especially behind symmetric NAT or corporate firewalls). Popular TURN server providers:
- **Twilio** - Free tier available
- **Xirsys** - WebRTC infrastructure
- **coturn** - Open-source TURN server

## Browser Requirements

- **HTTPS Required** (except localhost)
- **Modern Browser**:
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14+
  - Opera 76+

## Mobile Considerations

### iOS (Safari/Capacitor)
- Requires HTTPS
- Use `playsinline` attribute on video elements
- Handle app backgrounding (stop video, keep audio)
- Lower resolution for better performance (640x480)

### Android (Chrome/Capacitor)
- Works well with default settings
- Support front/back camera switching
- Handle network changes (WiFi ↔ cellular)

## Security

- **Encryption**: DTLS (peer connection) + SRTP (media) mandatory
- **Permissions**: Camera/microphone requires user consent
- **Signaling**: Use WSS (WebSocket Secure) in production
- **TURN**: Authenticate TURN servers with credentials
- **IP Leakage**: WebRTC can expose local/public IPs

## Interview Key Points

1. **WebRTC = 3 APIs**: MediaStream, RTCPeerConnection, RTCDataChannel
2. **Signaling is NOT part of WebRTC**: Use WebSocket, HTTP, SIP, etc.
3. **ICE tries**: host → STUN (srflx) → TURN (relay)
4. **TURN used in ~8%** of connections
5. **replaceTrack()** more efficient than remove/add
6. **Mandatory encryption**: DTLS + SRTP
7. **getUserMedia() requires**: HTTPS, user permission, user gesture

## Troubleshooting

### Camera/Mic Permission Denied
- Check HTTPS (required except localhost)
- Browser may have blocked permissions
- Try another browser
- Check if device is in use by another app

### Connection Failed
- Check STUN/TURN servers
- Firewall may be blocking WebRTC
- Add TURN server for relay
- Both peers must be online

### Audio Echo
- Enable `echoCancellation: true`
- Mute local video element
- Use headphones

### Poor Video Quality
- Lower resolution (640x480)
- Reduce frame rate (15-20 fps)
- Check network bandwidth
- Use audio-only mode on poor networks

## Learning Resources

- [WebRTC Official](https://webrtc.org/)
- [MDN WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC Samples](https://webrtc.github.io/samples/)
- [WebRTC for the Curious](https://webrtcforthecurious.com/)

## Next Steps

- Implement group calls (multi-peer)
- Add virtual backgrounds
- Implement SFU (Selective Forwarding Unit)
- Add connection quality monitoring
- Implement adaptive bitrate
- Add end-to-end encryption
