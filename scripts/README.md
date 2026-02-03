# Setup Scripts

Automated configuration scripts for WebRTC development environment.

## Available Scripts

### setup-network.js
Auto-detects your local IP and configures the app for multi-device testing.

**Usage:**
```bash
npm run setup:network
```

**What it does:**
- Detects your PC's local IP address using Node.js `os.networkInterfaces()`
- Updates `src/environments/environment.ts` with network IP
- Creates `.env` file for signaling server
- Backs up original environment file
- Displays connection instructions

**Use when:** Testing with tablet, phone, or another computer on same WiFi

---

### setup-localhost.js
Resets configuration to localhost for single-device testing.

**Usage:**
```bash
npm run setup:localhost
```

**What it does:**
- Resets `src/environments/environment.ts` to localhost
- Updates signaling server `.env` for localhost
- Displays configuration summary

**Use when:** Testing on PC with multiple browser tabs

---

## How They Work

### Network Detection
```javascript
const os = require('os');
const interfaces = os.networkInterfaces();

// Finds first non-internal IPv4 address
// Usually your WiFi or Ethernet IP
```

### Environment File Generation
```javascript
const environmentContent = `
export const environment = {
  signalingServerUrl: 'http://${localIp}:3001',
  appPort: 8100,
};
`;

fs.writeFileSync(envPath, environmentContent);
```

### Signaling Server .env
```javascript
const serverEnvContent = `
PORT=3001
ALLOWED_ORIGINS=http://${localIp}:8100,http://localhost:8100
NODE_ENV=development
`;

fs.writeFileSync(serverEnvPath, serverEnvContent);
```

## Environment Variables

These scripts respect the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `SIGNALING_PORT` | 3001 | WebRTC signaling server port |
| `APP_PORT` | 8100 | Ionic dev server port |

**Example:**
```bash
# Use custom ports
SIGNALING_PORT=4000 APP_PORT=8080 npm run setup:network
```

## File Backups

The `setup-network.js` script creates a backup:
- **Original:** `src/environments/environment.ts`
- **Backup:** `src/environments/environment.backup.ts`

This backup is created only once. To restore:
```bash
npm run setup:localhost
```

## Troubleshooting

### "Cannot find module 'os'"
Node.js `os` module is built-in. If you see this error, your Node.js installation may be corrupted.

**Fix:**
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

### Wrong IP Detected
The script picks the first non-internal IPv4 address. If you have multiple network adapters:

**Manual override:**
```bash
# Edit setup-network.js
const localIp = '192.168.1.100'; // Force specific IP
```

### Script Permissions Error
On Windows, you may need to run as administrator.

**Fix:**
```bash
# Run PowerShell as Administrator
npm run setup:network
```

## Adding New Scripts

To add a new setup script:

1. Create script in `scripts/` directory
2. Add to `package.json`:
   ```json
   "scripts": {
     "setup:custom": "node scripts/setup-custom.js"
   }
   ```
3. Document in this README

## Development Notes

- Scripts use **synchronous** file operations for simplicity
- Environment files are **not** git-tracked (in .gitignore)
- Paths use `path.join()` for cross-platform compatibility
- Console output uses emojis for better readability
