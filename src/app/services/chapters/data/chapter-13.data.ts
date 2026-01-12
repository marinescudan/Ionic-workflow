// src/app/services/chapters/data/chapter-13.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_13_DATA: Chapter = {
  id: 13,
  title: 'WebRTC - Video & Audio Calls',
  description: 'Build real-time peer-to-peer video/audio communication with WebRTC, screen sharing, and data channels',
  icon: 'videocam-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 130,
      title: 'WebRTC Fundamentals',
      content: `
        <h2>Understanding WebRTC</h2>
        <p>WebRTC (Web Real-Time Communication) enables peer-to-peer audio, video, and data sharing directly between browsers without intermediary servers for media.</p>

        <h3>Key Components</h3>
        <ul>
          <li><strong>MediaStream API:</strong> Access camera and microphone</li>
          <li><strong>RTCPeerConnection API:</strong> Establish peer-to-peer connections</li>
          <li><strong>RTCDataChannel API:</strong> Send arbitrary data peer-to-peer</li>
          <li><strong>Signaling:</strong> Exchange connection information (not part of WebRTC spec)</li>
        </ul>

        <h3>WebRTC vs Traditional Architecture</h3>
        <table>
          <tr>
            <th>Approach</th>
            <th>Latency</th>
            <th>Server Cost</th>
            <th>Quality</th>
          </tr>
          <tr>
            <td>Traditional (Server-Relay)</td>
            <td>Higher</td>
            <td>High (bandwidth)</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>WebRTC (Peer-to-Peer)</td>
            <td>Very Low</td>
            <td>Low (only signaling)</td>
            <td>Excellent</td>
          </tr>
        </table>

        <h3>WebRTC Call Flow</h3>
        <pre><code>Caller                Signaling Server              Callee
  |                          |                         |
  |-- getUserMedia() ------->|                         |
  |-- createOffer() -------->|                         |
  |-- send OFFER ----------->|-- forward OFFER ------->|
  |                          |                         |
  |<-- receive ANSWER -------|<-- send ANSWER ---------|
  |                          |                         |
  |<-- ICE candidates ------>|<-- ICE candidates ----->|
  |                          |                         |
  |<========= MEDIA STREAM (peer-to-peer) ===========>|</code></pre>

        <h3>Real-World Applications</h3>
        <ul>
          <li><strong>Zoom:</strong> Video conferencing with screen sharing</li>
          <li><strong>Google Meet:</strong> Browser-based video calls</li>
          <li><strong>Discord:</strong> Voice and video chat for gaming</li>
          <li><strong>WhatsApp Web:</strong> Voice/video calls in browser</li>
        </ul>

        <h3>Browser Support</h3>
        <p>WebRTC is supported in all modern browsers:</p>
        <ul>
          <li>Chrome/Edge: Full support</li>
          <li>Firefox: Full support</li>
          <li>Safari: Full support (iOS 11+)</li>
          <li>Opera: Full support</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1300,
          language: 'typescript',
          title: 'WebRTC Core Concepts',
          code: `/**
 * WebRTC Core Concepts
 *
 * 💡 INTERVIEW: WebRTC has three main APIs
 */

/**
 * 1. MediaStream API
 * - Represents streams of media (audio/video)
 * - Contains MediaStreamTrack objects
 * - getUserMedia() to access camera/mic
 * - getDisplayMedia() for screen sharing
 */

/**
 * 2. RTCPeerConnection API
 * - Manages peer-to-peer connections
 * - Handles media streaming
 * - Manages ICE candidates
 * - Monitors connection state
 *
 * States:
 * - new: Initial state
 * - connecting: Connecting to peer
 * - connected: Successfully connected
 * - disconnected: Temporarily lost connection
 * - failed: Connection failed
 * - closed: Connection closed
 */

/**
 * 3. RTCDataChannel API
 * - Send arbitrary data peer-to-peer
 * - Like WebSocket but peer-to-peer
 * - Configurable reliability
 * - Ordered/unordered delivery
 *
 * Use cases:
 * - Text chat during video call
 * - File transfer
 * - Game state synchronization
 */`,
          description: 'Overview of WebRTC APIs and their purposes',
          copyable: true,
        },
        {
          id: 1301,
          language: 'typescript',
          title: 'ICE, STUN, and TURN',
          code: `/**
 * ICE (Interactive Connectivity Establishment)
 * - Framework for NAT traversal
 * - Finds the best path between peers
 * - Collects "candidates" (possible connection paths)
 *
 * Candidate types:
 * - host: Local IP address
 * - srflx (Server Reflexive): Public IP via STUN
 * - relay: Relayed via TURN server
 *
 * 💡 INTERVIEW: ICE tries multiple paths simultaneously
 */

/**
 * STUN (Session Traversal Utilities for NAT)
 * - Discovers public IP address
 * - Helps with NAT traversal
 * - Free Google STUN: stun:stun.l.google.com:19302
 *
 * Use when:
 * - Both peers behind different NATs
 * - Need to discover public IP
 */

/**
 * TURN (Traversal Using Relays around NAT)
 * - Relay server when direct connection fails
 * - Fallback when STUN doesn't work
 * - Requires server infrastructure
 * - Costs bandwidth
 *
 * Use when:
 * - Symmetric NAT
 * - Corporate firewall
 * - VPN blocking P2P
 *
 * 💡 INTERVIEW: TURN is used in ~8% of connections
 */

// ICE server configuration
const iceServers: RTCIceServer[] = [
  // Google's public STUN server
  { urls: 'stun:stun.l.google.com:19302' },

  // Example TURN server
  {
    urls: 'turn:your-turn-server.com:3478',
    username: 'user',
    credential: 'password',
  },
];`,
          description: 'Understanding NAT traversal with ICE, STUN, and TURN',
          copyable: true,
        },
      ],
      interviewTips: [
        'WebRTC = peer-to-peer media, signaling = coordination server',
        'Three main APIs: MediaStream, RTCPeerConnection, RTCDataChannel',
        'ICE tries host → STUN → TURN for connectivity',
        'TURN relay is needed for ~8% of connections',
        'Signaling is NOT part of WebRTC spec (use WebSocket, HTTP, etc.)',
      ],
    },
    {
      id: 131,
      title: 'Media Device Access',
      content: `
        <h2>Accessing Camera and Microphone</h2>
        <p>The MediaStream API provides access to media devices like cameras and microphones through the getUserMedia() method.</p>

        <h3>getUserMedia() Requirements</h3>
        <ul>
          <li><strong>HTTPS Required:</strong> Only works on HTTPS (except localhost)</li>
          <li><strong>User Permission:</strong> Browser prompts user for permission</li>
          <li><strong>User Gesture:</strong> Some browsers require user interaction</li>
          <li><strong>Per-Origin:</strong> Permission is per-origin and persists</li>
        </ul>

        <h3>MediaStreamConstraints</h3>
        <p>Constraints specify requirements for the media stream:</p>
        <ul>
          <li><strong>Resolution:</strong> Width and height (ideal, min, max)</li>
          <li><strong>Frame Rate:</strong> FPS (ideal, min, max)</li>
          <li><strong>Facing Mode:</strong> Front or back camera (mobile)</li>
          <li><strong>Echo Cancellation:</strong> Remove audio echo</li>
          <li><strong>Noise Suppression:</strong> Reduce background noise</li>
        </ul>

        <h3>Device Enumeration</h3>
        <p>List available cameras and microphones:</p>
        <pre><code>const devices = await navigator.mediaDevices.enumerateDevices();
const cameras = devices.filter(d => d.kind === 'videoinput');
const microphones = devices.filter(d => d.kind === 'audioinput');</code></pre>

        <h3>Common Errors</h3>
        <table>
          <tr>
            <th>Error Name</th>
            <th>Cause</th>
            <th>Solution</th>
          </tr>
          <tr>
            <td>NotAllowedError</td>
            <td>User denied permission</td>
            <td>Show instructions to enable</td>
          </tr>
          <tr>
            <td>NotFoundError</td>
            <td>No device found</td>
            <td>Check device connection</td>
          </tr>
          <tr>
            <td>NotReadableError</td>
            <td>Device in use</td>
            <td>Close other apps using camera</td>
          </tr>
          <tr>
            <td>OverconstrainedError</td>
            <td>Constraints too strict</td>
            <td>Relax constraints</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1310,
          language: 'typescript',
          title: 'Media Devices Service',
          code: `// src/app/core/services/webrtc/media-devices.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaDevicesService {
  private localStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  public localStream$ = this.localStreamSubject.asObservable();

  /**
   * Get user media (camera + microphone)
   *
   * 💡 INTERVIEW: getUserMedia() requires HTTPS
   */
  async getUserMedia(constraints: MediaStreamConstraints = {
    video: true,
    audio: true,
  }): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStreamSubject.next(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw this.handleMediaError(error as DOMException);
    }
  }

  /**
   * Enumerate available media devices
   */
  async enumerateDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices;
  }

  /**
   * Get video devices (cameras)
   */
  async getVideoDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
  }

  /**
   * Switch camera (useful for mobile)
   */
  async switchCamera(deviceId: string): Promise<MediaStream> {
    const currentStream = this.localStreamSubject.value;
    currentStream?.getVideoTracks().forEach(track => track.stop());

    const constraints: MediaStreamConstraints = {
      video: { deviceId: { exact: deviceId } },
      audio: true,
    };

    return this.getUserMedia(constraints);
  }

  /**
   * Toggle video track
   */
  toggleVideo(enabled: boolean): void {
    const stream = this.localStreamSubject.value;
    stream?.getVideoTracks().forEach(track => {
      track.enabled = enabled;
    });
  }

  /**
   * Toggle audio track
   */
  toggleAudio(enabled: boolean): void {
    const stream = this.localStreamSubject.value;
    stream?.getAudioTracks().forEach(track => {
      track.enabled = enabled;
    });
  }

  /**
   * Stop all tracks
   */
  stopLocalStream(): void {
    const stream = this.localStreamSubject.value;
    stream?.getTracks().forEach(track => track.stop());
    this.localStreamSubject.next(null);
  }

  /**
   * Handle media errors
   */
  private handleMediaError(error: DOMException): Error {
    switch (error.name) {
      case 'NotAllowedError':
        return new Error('Permission denied');
      case 'NotFoundError':
        return new Error('No camera or microphone found');
      case 'NotReadableError':
        return new Error('Device already in use');
      default:
        return new Error(\`Media error: \${error.message}\`);
    }
  }
}`,
          description: 'Service for managing media devices',
          copyable: true,
        },
        {
          id: 1311,
          language: 'typescript',
          title: 'Media Constraints Examples',
          code: `/**
 * Common MediaStreamConstraints configurations
 */

// 1. Basic video + audio
const basicConstraints: MediaStreamConstraints = {
  video: true,
  audio: true,
};

// 2. HD video with noise suppression
const hdConstraints: MediaStreamConstraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
};

// 3. Mobile - front camera
const frontCameraConstraints: MediaStreamConstraints = {
  video: {
    facingMode: 'user', // front camera
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
  audio: true,
};

// 4. Mobile - back camera
const backCameraConstraints: MediaStreamConstraints = {
  video: {
    facingMode: 'environment', // back camera
  },
  audio: true,
};

// 5. Audio only (voice call)
const audioOnlyConstraints: MediaStreamConstraints = {
  video: false,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
  },
};`,
          description: 'Common media constraint configurations',
          copyable: true,
        },
      ],
      interviewTips: [
        'getUserMedia() requires HTTPS (except localhost)',
        'Permissions are per-origin and persist across sessions',
        'echoCancellation: true prevents audio feedback',
        'facingMode: "user" (front) or "environment" (back) for mobile',
        'Always stop tracks when done: track.stop()',
      ],
    },
    {
      id: 132,
      title: 'RTCPeerConnection',
      content: `
        <h2>Peer Connection Management</h2>
        <p>RTCPeerConnection is the core of WebRTC, managing the peer-to-peer connection and media streaming.</p>

        <h3>Connection States</h3>
        <table>
          <tr>
            <th>State</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>new</td>
            <td>Initial state, no connection attempt</td>
          </tr>
          <tr>
            <td>connecting</td>
            <td>Attempting to establish connection</td>
          </tr>
          <tr>
            <td>connected</td>
            <td>Successfully connected</td>
          </tr>
          <tr>
            <td>disconnected</td>
            <td>Temporarily lost connection</td>
          </tr>
          <tr>
            <td>failed</td>
            <td>Connection failed permanently</td>
          </tr>
          <tr>
            <td>closed</td>
            <td>Connection closed</td>
          </tr>
        </table>

        <h3>ICE Gathering States</h3>
        <ul>
          <li><strong>new:</strong> No gathering started</li>
          <li><strong>gathering:</strong> Actively gathering candidates</li>
          <li><strong>complete:</strong> All candidates gathered</li>
        </ul>

        <h3>Signaling States</h3>
        <ul>
          <li><strong>stable:</strong> No offer/answer exchange in progress</li>
          <li><strong>have-local-offer:</strong> Local offer created</li>
          <li><strong>have-remote-offer:</strong> Remote offer received</li>
          <li><strong>have-local-pranswer:</strong> Provisional answer sent</li>
          <li><strong>have-remote-pranswer:</strong> Provisional answer received</li>
        </ul>

        <h3>Adding Media Tracks</h3>
        <p>Add local stream tracks to the peer connection:</p>
        <pre><code>stream.getTracks().forEach(track => {
  peerConnection.addTrack(track, stream);
});</code></pre>

        <h3>Replacing Tracks</h3>
        <p>Switch camera without renegotiation:</p>
        <pre><code>const sender = pc.getSenders().find(s => s.track?.kind === 'video');
await sender.replaceTrack(newVideoTrack);</code></pre>
      `,
      codeSnippets: [
        {
          id: 1320,
          language: 'typescript',
          title: 'Peer Connection Service',
          code: `// src/app/core/services/webrtc/peer-connection.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeerConnectionService {
  private peerConnection: RTCPeerConnection | null = null;

  // Connection state
  private connectionStateSubject = new BehaviorSubject<RTCPeerConnectionState>('new');
  public connectionState$ = this.connectionStateSubject.asObservable();

  // Remote stream
  private remoteStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  public remoteStream$ = this.remoteStreamSubject.asObservable();

  /**
   * ICE server configuration
   */
  private iceServers: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ];

  /**
   * Create RTCPeerConnection
   */
  createPeerConnection(): RTCPeerConnection {
    const configuration: RTCConfiguration = {
      iceServers: this.iceServers,
      iceCandidatePoolSize: 10,
    };

    this.peerConnection = new RTCPeerConnection(configuration);
    this.setupEventListeners(this.peerConnection);
    return this.peerConnection;
  }

  /**
   * Set up event listeners
   */
  private setupEventListeners(pc: RTCPeerConnection): void {
    // Connection state changes
    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
      this.connectionStateSubject.next(pc.connectionState);
    };

    // ICE connection state changes
    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
    };

    // Remote track added
    pc.ontrack = (event) => {
      console.log('Remote track added:', event.track.kind);
      const [remoteStream] = event.streams;
      this.remoteStreamSubject.next(remoteStream);
    };
  }

  /**
   * Add local stream tracks
   */
  addLocalStream(stream: MediaStream): void {
    stream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, stream);
    });
  }

  /**
   * Create offer (caller side)
   */
  async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    return offer;
  }

  /**
   * Create answer (callee side)
   */
  async createAnswer(): Promise<RTCSessionDescriptionInit> {
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);
    return answer;
  }

  /**
   * Set remote description
   */
  async setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    await this.peerConnection!.setRemoteDescription(description);
  }

  /**
   * Add ICE candidate
   */
  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    try {
      await this.peerConnection!.addIceCandidate(candidate);
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  /**
   * Close peer connection
   */
  close(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  /**
   * Get peer connection
   */
  getPeerConnection(): RTCPeerConnection | null {
    return this.peerConnection;
  }
}`,
          description: 'RTCPeerConnection wrapper service',
          copyable: true,
        },
      ],
      interviewTips: [
        'RTCPeerConnection is the heart of WebRTC',
        'Always close() peer connection when done',
        'replaceTrack() is more efficient than removing/adding tracks',
        'Monitor connectionState for connection failures',
        'ICE candidates can be sent immediately (Trickle ICE)',
      ],
    },
    {
      id: 133,
      title: 'Signaling with WebSocket',
      content: `
        <h2>WebRTC Signaling</h2>
        <p>Signaling is the process of coordinating communication before a WebRTC connection is established. It's NOT part of the WebRTC spec.</p>

        <h3>What Signaling Exchanges</h3>
        <ul>
          <li><strong>SDP Offer:</strong> Session description from caller</li>
          <li><strong>SDP Answer:</strong> Session description from callee</li>
          <li><strong>ICE Candidates:</strong> Network paths for connection</li>
          <li><strong>Call Control:</strong> Request, accept, reject, hang up</li>
        </ul>

        <h3>Signaling Methods</h3>
        <table>
          <tr>
            <th>Method</th>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
          <tr>
            <td>WebSocket</td>
            <td>Real-time, bi-directional</td>
            <td>Requires server</td>
          </tr>
          <tr>
            <td>HTTP Polling</td>
            <td>Simple, works everywhere</td>
            <td>Higher latency</td>
          </tr>
          <tr>
            <td>SIP</td>
            <td>Standard for telephony</td>
            <td>Complex</td>
          </tr>
          <tr>
            <td>XMPP</td>
            <td>Standard for messaging</td>
            <td>Overhead</td>
          </tr>
        </table>

        <h3>Signaling Flow</h3>
        <pre><code>1. Caller: Create offer
2. Caller: Send offer via WebSocket
3. Callee: Receive offer
4. Callee: Create answer
5. Callee: Send answer via WebSocket
6. Caller: Receive answer
7. Both: Exchange ICE candidates via WebSocket</code></pre>

        <h3>Security Considerations</h3>
        <ul>
          <li>Use WSS (WebSocket Secure) for signaling</li>
          <li>Validate all signaling messages</li>
          <li>Implement authentication</li>
          <li>Rate limiting on signaling server</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1330,
          language: 'typescript',
          title: 'Signaling Service',
          code: `// src/app/core/services/webrtc/signaling.service.ts

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

/**
 * Signaling Service using Socket.io
 *
 * 💡 INTERVIEW: Signaling is NOT part of WebRTC
 * Can use WebSocket, HTTP, SIP, XMPP, etc.
 */
@Injectable({
  providedIn: 'root',
})
export class SignalingService {
  // Incoming messages
  private offerSubject = new Subject<RTCSessionDescriptionInit>();
  private answerSubject = new Subject<RTCSessionDescriptionInit>();
  private iceCandidateSubject = new Subject<RTCIceCandidateInit>();
  private callRequestSubject = new Subject<{ from: string; callId: string }>();

  public offer$ = this.offerSubject.asObservable();
  public answer$ = this.answerSubject.asObservable();
  public iceCandidate$ = this.iceCandidateSubject.asObservable();
  public callRequest$ = this.callRequestSubject.asObservable();

  constructor(private socket: Socket) {
    this.setupListeners();
  }

  /**
   * Set up Socket.io listeners
   */
  private setupListeners(): void {
    this.socket.on('offer', (data: { offer: RTCSessionDescriptionInit }) => {
      this.offerSubject.next(data.offer);
    });

    this.socket.on('answer', (data: { answer: RTCSessionDescriptionInit }) => {
      this.answerSubject.next(data.answer);
    });

    this.socket.on('ice-candidate', (data: { candidate: RTCIceCandidateInit }) => {
      this.iceCandidateSubject.next(data.candidate);
    });

    this.socket.on('call-request', (data: { from: string; callId: string }) => {
      this.callRequestSubject.next(data);
    });
  }

  /**
   * Send call request
   */
  sendCallRequest(to: string, callId: string): void {
    this.socket.emit('call-request', { to, callId });
  }

  /**
   * Send offer
   */
  sendOffer(to: string, offer: RTCSessionDescriptionInit): void {
    this.socket.emit('offer', { to, offer });
  }

  /**
   * Send answer
   */
  sendAnswer(to: string, answer: RTCSessionDescriptionInit): void {
    this.socket.emit('answer', { to, answer });
  }

  /**
   * Send ICE candidate
   */
  sendIceCandidate(to: string, candidate: RTCIceCandidateInit): void {
    this.socket.emit('ice-candidate', { to, candidate });
  }

  /**
   * End call
   */
  endCall(callId: string): void {
    this.socket.emit('call-end', { callId });
  }
}`,
          description: 'Signaling service using Socket.io from Lesson 10',
          copyable: true,
        },
      ],
      interviewTips: [
        'Signaling is NOT part of WebRTC spec',
        'WebSocket is the most common signaling method',
        'Signaling exchanges SDP and ICE candidates only',
        'Media streams flow peer-to-peer, not through signaling server',
        'Always use secure signaling (WSS, HTTPS)',
      ],
    },
    {
      id: 134,
      title: 'Screen Sharing',
      content: `
        <h2>Screen Sharing with getDisplayMedia()</h2>
        <p>WebRTC supports screen sharing through the getDisplayMedia() API, allowing users to share their screen, window, or tab.</p>

        <h3>getDisplayMedia() Requirements</h3>
        <ul>
          <li><strong>User Gesture Required:</strong> Must be called from user interaction</li>
          <li><strong>HTTPS Required:</strong> Same as getUserMedia()</li>
          <li><strong>Browser Prompt:</strong> User chooses what to share</li>
          <li><strong>Permissions:</strong> Requested each time (not persisted)</li>
        </ul>

        <h3>Display Surface Options</h3>
        <table>
          <tr>
            <th>Surface</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>monitor</td>
            <td>Entire screen</td>
          </tr>
          <tr>
            <td>window</td>
            <td>Specific application window</td>
          </tr>
          <tr>
            <td>browser</td>
            <td>Browser tab</td>
          </tr>
        </table>

        <h3>Constraints</h3>
        <pre><code>const constraints: DisplayMediaStreamConstraints = {
  video: {
    cursor: 'always',              // Show cursor
    displaySurface: 'monitor',     // Prefer full screen
  },
  audio: false,  // System audio (requires permission)
};</code></pre>

        <h3>Screen Share + Camera</h3>
        <p>You can combine screen sharing with camera by using replaceTrack():</p>
        <pre><code>// Get screen stream
const screenStream = await getDisplayMedia();
const screenTrack = screenStream.getVideoTracks()[0];

// Replace camera track with screen track
const sender = pc.getSenders().find(s => s.track?.kind === 'video');
await sender.replaceTrack(screenTrack);</code></pre>

        <h3>Stop Sharing Detection</h3>
        <p>Listen for user clicking "Stop Sharing":</p>
        <pre><code>screenTrack.onended = () => {
  console.log('Screen sharing stopped');
  // Switch back to camera
};</code></pre>
      `,
      codeSnippets: [
        {
          id: 1340,
          language: 'typescript',
          title: 'Screen Sharing Service',
          code: `/**
 * Screen Sharing Service
 *
 * 💡 INTERVIEW: getDisplayMedia() requires user gesture
 */
export class ScreenShareService {
  private screenStream: MediaStream | null = null;
  private originalVideoTrack: MediaStreamTrack | null = null;

  constructor(
    private mediaDevices: MediaDevicesService,
    private peerConnection: PeerConnectionService
  ) {}

  /**
   * Start screen sharing
   */
  async startScreenShare(): Promise<void> {
    try {
      // Get screen stream
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'monitor',
        },
        audio: false,
      });

      // Get current video track
      const pc = this.peerConnection.getPeerConnection();
      const sender = pc!.getSenders().find(s => s.track?.kind === 'video');

      if (sender && sender.track) {
        // Save original track
        this.originalVideoTrack = sender.track;

        // Replace with screen track
        const screenTrack = this.screenStream.getVideoTracks()[0];
        await sender.replaceTrack(screenTrack);

        // Listen for stop
        screenTrack.onended = () => {
          this.stopScreenShare();
        };
      }

    } catch (error) {
      console.error('Error starting screen share:', error);
      throw error;
    }
  }

  /**
   * Stop screen sharing
   */
  async stopScreenShare(): Promise<void> {
    if (!this.screenStream) return;

    // Stop screen stream
    this.screenStream.getTracks().forEach(track => track.stop());
    this.screenStream = null;

    // Restore camera track
    if (this.originalVideoTrack) {
      const pc = this.peerConnection.getPeerConnection();
      const sender = pc!.getSenders().find(s => s.track?.kind === 'video');
      if (sender) {
        await sender.replaceTrack(this.originalVideoTrack);
      }
      this.originalVideoTrack = null;
    }
  }

  /**
   * Check if screen sharing
   */
  isScreenSharing(): boolean {
    return this.screenStream !== null;
  }
}`,
          description: 'Service for screen sharing functionality',
          copyable: true,
        },
      ],
      interviewTips: [
        'getDisplayMedia() requires user gesture (cannot auto-start)',
        'Permission is requested each time (not persisted)',
        'Use replaceTrack() to switch between camera and screen',
        'Listen to track.onended to detect user stopping share',
        'Screen audio requires separate permission',
      ],
    },
    {
      id: 135,
      title: 'Data Channels',
      content: `
        <h2>RTCDataChannel for Messaging</h2>
        <p>RTCDataChannel enables peer-to-peer data transfer beyond media streams. It's like WebSocket but peer-to-peer.</p>

        <h3>Data Channel Features</h3>
        <ul>
          <li><strong>Peer-to-Peer:</strong> No server in the middle</li>
          <li><strong>Configurable Reliability:</strong> Reliable or unreliable delivery</li>
          <li><strong>Ordered/Unordered:</strong> Messages can arrive out of order</li>
          <li><strong>Low Latency:</strong> Direct peer connection</li>
          <li><strong>Binary Support:</strong> Send ArrayBuffer, Blob, or string</li>
        </ul>

        <h3>Reliability Options</h3>
        <table>
          <tr>
            <th>Option</th>
            <th>Description</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Reliable + Ordered</td>
            <td>Guaranteed delivery in order</td>
            <td>Chat messages, file transfer</td>
          </tr>
          <tr>
            <td>Reliable + Unordered</td>
            <td>Guaranteed delivery, any order</td>
            <td>State updates</td>
          </tr>
          <tr>
            <td>Unreliable</td>
            <td>Best effort, may drop packets</td>
            <td>Game state, sensor data</td>
          </tr>
        </table>

        <h3>Creating Data Channel</h3>
        <pre><code>// Caller creates channel
const dataChannel = peerConnection.createDataChannel('chat', {
  ordered: true,
  maxRetransmits: 3,
});

// Callee receives channel
peerConnection.ondatachannel = (event) => {
  const dataChannel = event.channel;
};</code></pre>

        <h3>Use Cases</h3>
        <ul>
          <li><strong>Chat:</strong> Text messages during video call</li>
          <li><strong>File Transfer:</strong> Peer-to-peer file sharing</li>
          <li><strong>Gaming:</strong> Real-time game state synchronization</li>
          <li><strong>Collaboration:</strong> Whiteboard, document editing</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1350,
          language: 'typescript',
          title: 'Data Channel Service',
          code: `/**
 * Data Channel Service
 *
 * 💡 INTERVIEW: RTCDataChannel is like WebSocket but peer-to-peer
 */
export class DataChannelService {
  private dataChannel: RTCDataChannel | null = null;

  private messageSubject = new Subject<{ from: 'local' | 'remote'; text: string }>();
  public message$ = this.messageSubject.asObservable();

  /**
   * Create data channel (caller side)
   */
  createDataChannel(pc: RTCPeerConnection, label: string = 'chat'): RTCDataChannel {
    this.dataChannel = pc.createDataChannel(label, {
      ordered: true,         // Messages in order
      maxRetransmits: 3,    // Retry failed messages
    });

    this.setupDataChannelListeners(this.dataChannel);
    return this.dataChannel;
  }

  /**
   * Handle incoming data channel (callee side)
   */
  handleDataChannel(pc: RTCPeerConnection): void {
    pc.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.setupDataChannelListeners(this.dataChannel);
    };
  }

  /**
   * Set up listeners
   */
  private setupDataChannelListeners(channel: RTCDataChannel): void {
    channel.onopen = () => {
      console.log('Data channel opened');
    };

    channel.onclose = () => {
      console.log('Data channel closed');
    };

    channel.onerror = (error) => {
      console.error('Data channel error:', error);
    };

    channel.onmessage = (event) => {
      console.log('Data channel message:', event.data);
      this.messageSubject.next({
        from: 'remote',
        text: event.data,
      });
    };
  }

  /**
   * Send message
   */
  sendMessage(text: string): void {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      console.error('Data channel not ready');
      return;
    }

    this.dataChannel.send(text);
    this.messageSubject.next({
      from: 'local',
      text,
    });
  }

  /**
   * Close data channel
   */
  close(): void {
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
  }
}`,
          description: 'Service for peer-to-peer messaging via data channel',
          copyable: true,
        },
      ],
      interviewTips: [
        'RTCDataChannel is peer-to-peer (no server relay)',
        'Can be reliable (TCP-like) or unreliable (UDP-like)',
        'Ordered: true ensures messages arrive in order',
        'maxRetransmits: number of retry attempts',
        'Check readyState before sending (must be "open")',
      ],
    },
    {
      id: 136,
      title: 'Stream Recording',
      content: `
        <h2>Recording Media Streams</h2>
        <p>The MediaRecorder API allows recording video and audio streams to files.</p>

        <h3>MediaRecorder Features</h3>
        <ul>
          <li><strong>Multiple Formats:</strong> WebM, MP4 (browser-dependent)</li>
          <li><strong>Configurable Quality:</strong> Set video/audio bitrate</li>
          <li><strong>Pause/Resume:</strong> Control recording state</li>
          <li><strong>Timeslice:</strong> Get data in chunks</li>
        </ul>

        <h3>Supported MIME Types</h3>
        <table>
          <tr>
            <th>MIME Type</th>
            <th>Browser Support</th>
          </tr>
          <tr>
            <td>video/webm;codecs=vp9</td>
            <td>Chrome, Firefox, Edge</td>
          </tr>
          <tr>
            <td>video/webm;codecs=vp8</td>
            <td>Chrome, Firefox, Edge</td>
          </tr>
          <tr>
            <td>video/webm;codecs=h264</td>
            <td>Chrome, Edge</td>
          </tr>
          <tr>
            <td>video/mp4</td>
            <td>Safari</td>
          </tr>
        </table>

        <h3>Recording Options</h3>
        <pre><code>const options = {
  mimeType: 'video/webm;codecs=vp9,opus',
  videoBitsPerSecond: 2500000,  // 2.5 Mbps
  audioBitsPerSecond: 128000,   // 128 kbps
};</code></pre>

        <h3>Recording States</h3>
        <ul>
          <li><strong>inactive:</strong> Not recording</li>
          <li><strong>recording:</strong> Actively recording</li>
          <li><strong>paused:</strong> Recording paused</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1360,
          language: 'typescript',
          title: 'Stream Recorder Service',
          code: `// src/app/core/services/webrtc/stream-recorder.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Stream Recorder Service
 *
 * 💡 INTERVIEW: MediaRecorder supports multiple formats
 */
@Injectable({
  providedIn: 'root',
})
export class StreamRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  private recordingStateSubject = new Subject<'recording' | 'stopped' | 'paused'>();
  public recordingState$ = this.recordingStateSubject.asObservable();

  /**
   * Start recording stream
   */
  async startRecording(
    stream: MediaStream,
    options: {
      mimeType?: string;
      videoBitsPerSecond?: number;
      audioBitsPerSecond?: number;
    } = {}
  ): Promise<void> {
    const mimeType = this.getSupportedMimeType(options.mimeType);

    if (!mimeType) {
      throw new Error('No supported MIME type');
    }

    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: options.videoBitsPerSecond || 2500000,
      audioBitsPerSecond: options.audioBitsPerSecond || 128000,
    });

    this.recordedChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.recordingStateSubject.next('stopped');
    };

    this.mediaRecorder.start(1000); // Collect every 1 second
    this.recordingStateSubject.next('recording');
  }

  /**
   * Stop recording
   */
  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No active recording'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder!.mimeType,
        });
        this.recordedChunks = [];
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Pause recording
   */
  pauseRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.recordingStateSubject.next('paused');
    }
  }

  /**
   * Resume recording
   */
  resumeRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.recordingStateSubject.next('recording');
    }
  }

  /**
   * Get supported MIME type
   */
  private getSupportedMimeType(preferred?: string): string | null {
    const types = [
      preferred,
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
    ].filter(Boolean) as string[];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return null;
  }

  /**
   * Download recording
   */
  downloadRecording(blob: Blob, filename: string = 'recording.webm'): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}`,
          description: 'Service for recording video/audio streams',
          copyable: true,
        },
      ],
      interviewTips: [
        'MediaRecorder is built into browsers (no library needed)',
        'WebM is most widely supported format',
        'Use isTypeSupported() to check MIME type support',
        'Timeslice parameter controls chunk frequency',
        'Always stop() recorder to get final blob',
      ],
    },
    {
      id: 137,
      title: 'Video Call Component',
      content: `
        <h2>Building the Video Call UI</h2>
        <p>Create a full-featured video call interface with local and remote video, call controls, and device selection.</p>

        <h3>Key UI Components</h3>
        <ul>
          <li><strong>Remote Video:</strong> Full-screen display of remote peer</li>
          <li><strong>Local Video:</strong> Picture-in-picture of your camera</li>
          <li><strong>Call Controls:</strong> Mute, camera toggle, hang up, record</li>
          <li><strong>Device Selector:</strong> Choose camera and microphone</li>
          <li><strong>Connection Status:</strong> Display call state</li>
          <li><strong>Incoming Call Overlay:</strong> Accept/reject buttons</li>
        </ul>

        <h3>Video Element Setup</h3>
        <pre><code>&lt;video
  #localVideo
  autoplay
  playsinline
  muted
&gt;&lt;/video&gt;

&lt;video
  #remoteVideo
  autoplay
  playsinline
&gt;&lt;/video&gt;</code></pre>

        <h3>Important Attributes</h3>
        <ul>
          <li><strong>autoplay:</strong> Start playing immediately</li>
          <li><strong>playsinline:</strong> Prevent fullscreen on iOS</li>
          <li><strong>muted:</strong> Required for local video to prevent echo</li>
        </ul>

        <h3>Assigning Streams</h3>
        <pre><code>// Local stream
localVideoRef.nativeElement.srcObject = localStream;

// Remote stream
remoteVideoRef.nativeElement.srcObject = remoteStream;</code></pre>

        <h3>Responsive Layout</h3>
        <ul>
          <li>Remote video fills screen</li>
          <li>Local video in corner (150x200px)</li>
          <li>Controls at bottom center</li>
          <li>Incoming call overlay centered</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1370,
          language: 'typescript',
          title: 'Video Call Page Component',
          code: `// src/app/features/video-call/pages/video-call/video-call.page.ts

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';

import { WebRTCService, CallState } from '@app/core/services/webrtc/webrtc.service';
import { MediaDevicesService } from '@app/core/services/webrtc/media-devices.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.page.html',
  styleUrls: ['./video-call.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class VideoCallPage implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef<HTMLVideoElement>;

  private destroy$ = new Subject<void>();

  callState: CallState = 'idle';
  remotePeerId: string = '';

  isMuted = false;
  isCameraOff = false;

  cameras: MediaDeviceInfo[] = [];
  selectedCamera?: string;

  constructor(
    private webrtc: WebRTCService,
    private mediaDevices: MediaDevicesService
  ) {}

  async ngOnInit() {
    // Subscribe to call state
    this.webrtc.callState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.callState = state;
      });

    // Subscribe to local stream
    this.mediaDevices.localStream$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stream) => {
        if (stream && this.localVideoRef) {
          this.localVideoRef.nativeElement.srcObject = stream;
        }
      });

    // Subscribe to remote stream
    this.webrtc.remoteStream$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stream) => {
        if (stream && this.remoteVideoRef) {
          this.remoteVideoRef.nativeElement.srcObject = stream;
        }
      });

    await this.loadDevices();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.callState !== 'idle') {
      this.endCall();
    }
  }

  async loadDevices() {
    this.cameras = await this.mediaDevices.getVideoDevices();
    if (this.cameras.length > 0) {
      this.selectedCamera = this.cameras[0].deviceId;
    }
  }

  async startCall() {
    if (!this.remotePeerId) {
      alert('Please enter remote peer ID');
      return;
    }

    try {
      await this.webrtc.initiateCall(this.remotePeerId);
    } catch (error) {
      console.error('Error starting call:', error);
      alert('Failed to start call');
    }
  }

  async acceptCall() {
    try {
      await this.webrtc.acceptCall();
    } catch (error) {
      console.error('Error accepting call:', error);
    }
  }

  rejectCall() {
    this.webrtc.rejectCall('User declined');
  }

  endCall() {
    this.webrtc.endCall();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.webrtc.toggleMute(this.isMuted);
  }

  toggleCamera() {
    this.isCameraOff = !this.isCameraOff;
    this.webrtc.toggleCamera(!this.isCameraOff);
  }

  isCallActive(): boolean {
    return this.callState === 'connected';
  }

  isIncomingCall(): boolean {
    return this.callState === 'ringing';
  }
}`,
          description: 'Main video call page component',
          copyable: true,
        },
        {
          id: 1371,
          language: 'html',
          title: 'Video Call Template',
          code: `<!-- src/app/features/video-call/pages/video-call/video-call.page.html -->

<ion-header>
  <ion-toolbar>
    <ion-title>Video Call</ion-title>
    <ion-chip slot="end" [color]="isCallActive() ? 'success' : 'medium'">
      {{ callState }}
    </ion-chip>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="video-container">
    <!-- Remote video (full screen) -->
    <video
      #remoteVideo
      class="remote-video"
      autoplay
      playsinline
      [class.hidden]="callState !== 'connected'"
    ></video>

    <!-- Local video (picture-in-picture) -->
    <video
      #localVideo
      class="local-video"
      autoplay
      playsinline
      muted
      [class.hidden]="isCameraOff"
    ></video>

    <!-- Incoming call overlay -->
    <div class="incoming-call" *ngIf="isIncomingCall()">
      <h2>Incoming Call</h2>
      <p>From: {{ remotePeerId }}</p>
      <div class="call-actions">
        <ion-button color="success" (click)="acceptCall()">
          <ion-icon name="call" slot="start"></ion-icon>
          Accept
        </ion-button>
        <ion-button color="danger" (click)="rejectCall()">
          <ion-icon name="close" slot="start"></ion-icon>
          Decline
        </ion-button>
      </div>
    </div>
  </div>

  <!-- Call controls -->
  <div class="controls" *ngIf="isCallActive()">
    <ion-button [color]="isMuted ? 'danger' : 'medium'" (click)="toggleMute()">
      <ion-icon [name]="isMuted ? 'mic-off' : 'mic'"></ion-icon>
    </ion-button>

    <ion-button [color]="isCameraOff ? 'danger' : 'medium'" (click)="toggleCamera()">
      <ion-icon [name]="isCameraOff ? 'videocam-off' : 'videocam'"></ion-icon>
    </ion-button>

    <ion-button color="danger" (click)="endCall()">
      <ion-icon name="call" style="transform: rotate(135deg);"></ion-icon>
    </ion-button>
  </div>

  <!-- Start call form -->
  <div class="start-call" *ngIf="callState === 'idle'">
    <ion-item>
      <ion-label position="floating">Remote Peer ID</ion-label>
      <ion-input [(ngModel)]="remotePeerId"></ion-input>
    </ion-item>

    <ion-button expand="block" (click)="startCall()">
      <ion-icon name="call" slot="start"></ion-icon>
      Start Call
    </ion-button>
  </div>
</ion-content>`,
          description: 'Video call page template with controls',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use autoplay and playsinline attributes on video elements',
        'Local video must be muted to prevent echo',
        'Assign streams via srcObject, not src',
        'ViewChild to get ElementRef for video elements',
        'Clean up streams in ngOnDestroy',
      ],
    },
  ],
};
