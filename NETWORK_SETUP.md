# Network Setup Guide

This guide explains how to configure your development environment for WebRTC video calling.

## Quick Start

### For PC-Only Testing (localhost)

```bash
npm run setup:localhost
```

This configures:
- ✅ Signaling server: `http://localhost:3001`
- ✅ App server: `http://localhost:8100`
- ✅ Perfect for testing on a single device

### For Multi-Device Testing (PC + Tablet/Phone)

```bash
npm run setup:network
```

This will:
- 🔍 Auto-detect your PC's local IP address
- ⚙️ Configure both the app and signaling server
- 📋 Display connection URLs for all devices

## What These Scripts Do

### `npm run setup:localhost`
- Resets configuration to use `localhost`
- Updates `src/environments/environment.ts`
- Creates `.env` file for signaling server with localhost settings
- Best for: Testing on the same PC with multiple browser tabs

### `npm run setup:network`
- Detects your PC's local network IP (e.g., `192.168.1.100`)
- Updates `src/environments/environment.ts` with network IP
- Creates `.env` file for signaling server with network settings
- Creates backup of original environment file
- Best for: Testing between PC and tablet/phone on same WiFi

## Manual Configuration

If you prefer to configure manually:

### 1. Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  signalingServerUrl: 'http://YOUR_IP:3001', // Replace YOUR_IP
  appPort: 8100,
};
```

### 2. Create `webrtc-signaling-server/.env`:

```env
PORT=3001
ALLOWED_ORIGINS=http://YOUR_IP:8100,http://localhost:8100
NODE_ENV=development
```

## Testing Workflow

### 1. Run Setup Script

```bash
# For tablet testing
npm run setup:network

# For PC-only testing
npm run setup:localhost
```

### 2. Start Signaling Server

```bash
cd ..\webrtc-signaling-server
npm run dev
```

You should see:
```
🚀 WebRTC Signaling Server Started!
📡 Server running on port 3001
```

### 3. Start Ionic App

In another terminal:
```bash
npm run serve
```

You should see:
```
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:8100 **
```

### 4. Open App

**On PC:**
```
http://localhost:8100/video-call
```

**On Tablet/Phone:**
```
http://YOUR_IP:8100/video-call
```
(Replace `YOUR_IP` with the IP shown by the setup script)

### 5. Make a Call

1. On PC: Copy your Peer ID
2. On Tablet: Paste the Peer ID and click "Start Call"
3. On PC: Accept the incoming call

## Troubleshooting

### ❌ "Connection Failed" or "Server Offline"

**Check:**
1. Is the signaling server running? (`npm run dev` in webrtc-signaling-server)
2. Are both devices on the same WiFi network?
3. Is your firewall blocking port 3001?

**Fix:**
```bash
# Restart signaling server
cd ..\webrtc-signaling-server
npm run dev

# Verify it's running
curl http://localhost:3001
```

### ❌ "Camera Already in Use"

**Problem:** Testing on same device with multiple browsers

**Fix:** Use two different devices, or test with PC + tablet

### ❌ Tablet Can't Connect

**Check:**
1. Both devices on same WiFi network?
2. Correct IP address in URL?
3. Firewall blocking connections?

**Debug:**
```bash
# On PC, check your IP
ipconfig

# On tablet browser, try accessing signaling server directly
http://YOUR_IP:3001
```

You should see:
```json
{
  "status": "online",
  "service": "WebRTC Signaling Server",
  "activeUsers": 0
}
```

### ❌ Video Not Showing

**Check browser console** (F12) for errors

**Click debug buttons** during call to see:
- Stream status
- Connection state
- ICE connection status

## Environment Files

### Development (environment.ts)
- Auto-configured by setup scripts
- Uses detected IP or localhost
- Git-ignored for security

### Production (environment.prod.ts)
- Manually configure with deployed server URL
- Example: `https://your-signaling-server.onrender.com`
- Never commit with real credentials

## Port Reference

| Service | Port | Protocol |
|---------|------|----------|
| Ionic App | 8100 | HTTP |
| Signaling Server | 3001 | HTTP/WebSocket |
| GraphQL Server | 4000 | HTTP |

## Security Notes

⚠️ **Local network only:** This setup is for development on trusted networks

🔒 **Production:** Use HTTPS and WSS (secure WebSocket)

🚫 **Never expose:** Don't port-forward 3001 to the internet without authentication

## Additional Resources

- [WebRTC Documentation](https://webrtc.org/)
- [Socket.IO CORS Guide](https://socket.io/docs/v4/handling-cors/)
- [Ionic CLI Commands](https://ionicframework.com/docs/cli)
