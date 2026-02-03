# Deployment Checklist

## ✅ Pre-Deployment Setup Complete

- [x] Created `.env.example` for signaling server
- [x] Created `.env.example` for Ionic app  
- [x] Updated signaling server to use environment variables
- [x] Created deployment guide
- [x] Configured `.gitignore` for sensitive files

## 📋 Next Steps

### Step 1: Set Up GitHub Repository

```bash
# 1. Create new repository on GitHub (via web interface)
#    Repository name: ionic-webrtc-app
#    Visibility: Private (recommended) or Public

# 2. Commit all changes
git add .
git commit -m "Add WebRTC video calling feature with deployment configs"

# 3. If no remote origin exists:
git remote add origin https://github.com/YOUR_USERNAME/ionic-webrtc-app.git

# 4. Push to GitHub
git push -u origin main
```

### Step 2: Deploy Signaling Server to Render

1. **Sign up**: Go to [render.com](https://render.com)

2. **New Web Service**: 
   - Click "New +" → "Web Service"
   - Connect GitHub → Select your repository
   - Root Directory: `webrtc-signaling-server`

3. **Configure**:
   - Name: `ionic-webrtc-signaling`
   - Build: `npm install`
   - Start: `npm start`

4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   ALLOWED_ORIGINS=https://YOUR-APP-URL.onrender.com
   ENABLE_DEBUG_LOGGING=false
   ENABLE_STATS_ENDPOINT=false
   ```

5. **Deploy** → Copy your server URL: `https://ionic-webrtc-signaling-XXXX.onrender.com`

### Step 3: Deploy Ionic Web App to Render

1. **Build the app locally**:
   ```bash
   cd Ionic-workflow
   
   # Update environment.prod.ts with your signaling server URL
   npm run build --configuration=production
   ```

2. **New Static Site on Render**:
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Root Directory: `Ionic-workflow`

3. **Configure**:
   - Build Command: `npm install && npm run build --configuration=production`
   - Publish Directory: `www`

4. **Deploy** → Copy your app URL: `https://your-app.onrender.com`

5. **Update CORS**: Go back to signaling server settings and update `ALLOWED_ORIGINS`

### Step 4: Test on Preprod

1. **Open on two devices**:
   - Device 1: `https://your-app.onrender.com/video-call`
   - Device 2: `https://your-app.onrender.com/video-call`

2. **Get new IDs**: Click "🔄 New ID" on both devices

3. **Make a call**:
   - Device 1: Copy peer ID
   - Device 2: Paste ID → Start call
   - Device 1: Accept call

4. **Verify**:
   - ✅ Both cameras show
   - ✅ Audio works (use headphones!)
   - ✅ Controls work (mute, camera off, end call)

### Step 5: Production Configuration

Once testing is successful, update your production environment:

**Ionic App** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  signalingServerUrl: 'https://ionic-webrtc-signaling-XXXX.onrender.com',
  appPort: 443,
  // ... other production configs
};
```

**Signaling Server** (Render dashboard):
```
ALLOWED_ORIGINS=https://your-production-domain.com,https://www.your-production-domain.com
```

## 🎯 Quick Reference

### Local Development URLs
- Ionic App: `http://localhost:8100`
- Signaling Server: `http://localhost:3001`

### Production URLs (Update after deployment)
- Ionic App: `https://______.onrender.com`
- Signaling Server: `https://______.onrender.com`

### Important Files
- Signaling Server Config: `webrtc-signaling-server/.env`
- Ionic App Config: `Ionic-workflow/src/environments/environment.prod.ts`
- Deployment Guide: `webrtc-signaling-server/DEPLOYMENT.md`

## 🔒 Security Notes

- ✅ `.env` files are git-ignored
- ✅ Use HTTPS in production (Render provides this)
- ✅ Set specific CORS origins (not *)
- ✅ Disable debug features in production
- ✅ Never commit secrets to git

## 💰 Render Costs

- **Free Tier**: Both services free (with auto-sleep)
- **Starter**: $7/month per service for always-on
- **Total for basic production**: ~$14/month

## 🚀 Alternative Platforms

If Render doesn't work for you:

1. **Railway**: Similar to Render, better EU servers
2. **Fly.io**: Better for global distribution
3. **Vercel**: Good for frontend, but NO WebSocket support
4. **Heroku**: More expensive but reliable

## 📞 Need Help?

Common issues are documented in:
- `webrtc-signaling-server/DEPLOYMENT.md`
- `Ionic-workflow/NETWORK_SETUP.md`
