import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';

import { WebRTCService, CallState } from '@app/core/services/webrtc/webrtc.service';
import { MediaDevicesService } from '@app/core/services/webrtc/media-devices.service';
import { StreamRecorderService } from '@app/core/services/webrtc/stream-recorder.service';

/**
 * Video Call Page
 *
 * Full-featured video call interface
 */
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.page.html',
  styleUrls: ['./video-call.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class VideoCallPage implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef<HTMLVideoElement>;

  private destroy$ = new Subject<void>();

  // Call state
  callState: CallState = 'idle';
  remotePeerId: string = '';
  myPeerId: string = '';
  iceConnectionState: string = 'new';
  connectionState: string = 'new';

  // Media controls
  isMuted = false;
  isCameraOff = false;
  isRecording = false;

  // Available devices
  cameras: MediaDeviceInfo[] = [];
  microphones: MediaDeviceInfo[] = [];
  selectedCamera?: string;
  selectedMicrophone?: string;

  constructor(
    private webrtc: WebRTCService,
    private mediaDevices: MediaDevicesService,
    private recorder: StreamRecorderService
  ) {}

  async ngOnInit() {
    // Get my peer ID
    this.myPeerId = this.getMyPeerId();

    // Subscribe to call state
    this.webrtc.callState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.callState = state;
        console.log('📞 Call state changed:', state);
      });

    // Subscribe to ICE connection state
    (this.webrtc as any).peerConnection?.iceConnectionState$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((state: string) => {
        this.iceConnectionState = state;
        console.log('🧊 ICE connection state:', state);
      });

    // Subscribe to connection state
    (this.webrtc as any).peerConnection?.connectionState$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((state: string) => {
        this.connectionState = state;
        console.log('🔌 Connection state:', state);
      });

    // Subscribe to local stream
    this.mediaDevices.localStream$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stream) => {
        if (stream && this.localVideoRef?.nativeElement) {
          const videoElement = this.localVideoRef.nativeElement;
          videoElement.srcObject = stream;
          videoElement.muted = true; // Important: prevent echo
          videoElement.play().catch(err => console.error('Error playing local video:', err));
          console.log('✅ Local stream assigned to video element');
        }
        // Reload devices when stream changes (permissions granted)
        if (stream) {
          this.loadDevices();
        }
      });

    // Subscribe to remote stream
    this.webrtc.remoteStream$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stream) => {
        if (stream && this.remoteVideoRef?.nativeElement) {
          const videoElement = this.remoteVideoRef.nativeElement;
          videoElement.srcObject = stream;
          videoElement.play().catch(err => console.error('Error playing remote video:', err));
          console.log('✅ Remote stream assigned to video element');
        } else if (!stream && this.remoteVideoRef?.nativeElement) {
          // Clear remote video when stream is null
          this.remoteVideoRef.nativeElement.srcObject = null;
          console.log('🔄 Remote stream cleared');
        }
      });

    // Try to enumerate devices (will show generic names without permissions)
    await this.loadDevices();
  }

  /**
   * Generate memorable peer ID
   */
  private generateMemorableId(): string {
    const adjectives = [
      'happy', 'swift', 'calm', 'bright', 'clever', 'brave', 'gentle', 'kind',
      'wise', 'bold', 'cool', 'warm', 'quick', 'shy', 'proud', 'wild'
    ];

    const animals = [
      'panda', 'tiger', 'eagle', 'wolf', 'fox', 'bear', 'deer', 'owl',
      'lion', 'hawk', 'seal', 'otter', 'lynx', 'koala', 'raven', 'falcon'
    ];

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const num = Math.floor(Math.random() * 999) + 1;

    return `${adj}-${animal}-${num}`;
  }

  /**
   * Get my peer ID from localStorage
   */
  private getMyPeerId(): string {
    let userId = localStorage.getItem('webrtc-user-id');
    if (!userId) {
      userId = this.generateMemorableId();
      localStorage.setItem('webrtc-user-id', userId);
    }
    return userId;
  }

  /**
   * Copy peer ID to clipboard
   */
  async copyPeerId() {
    try {
      await navigator.clipboard.writeText(this.myPeerId);
      this.showAlert('✅ Peer ID Copied', 'Your Peer ID has been copied to clipboard. Share it with the person you want to call using any messaging app.');
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = this.myPeerId;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showAlert('✅ Peer ID Copied', 'Your Peer ID has been copied to clipboard. Share it with the person you want to call using any messaging app.');
    }
  }

  /**
   * Generate new memorable peer ID
   */
  generateNewPeerId() {
    const newId = this.generateMemorableId();
    localStorage.setItem('webrtc-user-id', newId);
    this.myPeerId = newId;
    this.showAlert('✅ New Peer ID Generated', 'Your new memorable Peer ID is: ' + newId + '. Make sure to share this new ID with people you want to call.');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    // End call if active
    if (this.callState !== 'idle') {
      this.endCall();
    }
  }

  /**
   * Load available media devices
   */
  async loadDevices() {
    this.cameras = await this.mediaDevices.getVideoDevices();
    this.microphones = await this.mediaDevices.getAudioDevices();

    if (this.cameras.length > 0) {
      this.selectedCamera = this.cameras[0].deviceId;
    }
    if (this.microphones.length > 0) {
      this.selectedMicrophone = this.microphones[0].deviceId;
    }
  }

  /**
   * Test local camera (without connecting to peer)
   */
  async testLocalCamera() {
    // Check if getUserMedia is supported
    const hasMediaDevices = !!navigator.mediaDevices;
    const hasGetUserMedia = hasMediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function';

    if (!hasMediaDevices || !hasGetUserMedia) {
      const debugInfo =
        'navigator.mediaDevices: ' + (hasMediaDevices ? 'exists' : 'MISSING') + '. ' +
        'getUserMedia: ' + (hasGetUserMedia ? 'exists' : 'MISSING') + '. ' +
        'isSecureContext: ' + (window.isSecureContext ? 'YES' : 'NO') + '. ' +
        'Protocol: ' + window.location.protocol + '. ' +
        'Hostname: ' + window.location.hostname;

      this.showAlert(
        '❌ Camera Not Available',
        '⚠️ Chrome requires HTTPS for camera access on network IPs. DEBUG: ' + debugInfo + ' FIX: Go to chrome://flags/#unsafely-treat-insecure-origin-as-secure and add this URL: ' + window.location.origin
      );
      return;
    }

    try {
      // Use simple constraints that work on all mobile browsers
      const stream = await this.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }, // Use front camera on mobile
        audio: true,
      });

      this.showAlert(
        '✅ Camera Test Successful',
        'Camera and microphone are working! You should see yourself in the video preview above. Device selectors are now available below.'
      );
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);

      let message = '';
      const errorName = error.name || '';

      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        message = '⚠️ Permission Denied. ' +
                 '1️⃣ Tap the lock or ⓘ icon in your browser address bar. ' +
                 '2️⃣ Find Camera and Microphone permissions. ' +
                 '3️⃣ Change both to Allow (not Ask). ' +
                 '4️⃣ Close this tab and open the page again.';
      } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
        message = '📵 No camera or microphone found. Make sure your device has a working camera and microphone, and no other app is using them.';
      } else if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
        message = '⚠️ Camera is busy. Close any other apps using the camera (including other browser tabs with this page) and try again.';
      } else if (errorName === 'OverconstrainedError' || errorName === 'ConstraintNotSatisfiedError') {
        message = '⚠️ Camera settings not supported. Your device camera may not support the requested settings. Try using Chrome browser.';
      } else if (errorName === 'TypeError') {
        message = '⚠️ Browser compatibility issue. Please use Chrome or Firefox browser. If already using Chrome, make sure you are accessing via http:// (not https://) on local network.';
      } else if (errorName === 'SecurityError') {
        message = '🔒 Security Error. Camera access is only allowed on secure connections. Make sure the URL starts with http://YOUR_IP:8100 (not https or file://)';
      } else {
        message = '❌ Cannot access camera. Error: ' + errorName + ' - ' + error.message + '. Try using Chrome browser or check that another app is not using the camera.';
      }

      this.showAlert('Camera Test Failed', message);
    }
  }

  /**
   * Show alert with proper formatting
   */
  private async showAlert(title: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = title;
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  /**
   * Start call
   */
  async startCall() {
    if (!this.remotePeerId) {
      this.showAlert('⚠️ Peer ID Required', 'Please enter the Peer ID of the person you want to call in the text field above.');
      return;
    }

    if (this.remotePeerId === this.myPeerId) {
      this.showAlert('⚠️ Invalid Peer ID', 'You cannot call yourself. Please enter a different Peer ID from another device.');
      return;
    }

    try {
      await this.webrtc.initiateCall(this.remotePeerId);
    } catch (error: any) {
      console.error('Error starting call:', error);

      let message = '';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        message = '⚠️ Camera permission denied. To fix: 1️⃣ Tap the lock icon in your browser address bar. 2️⃣ Change Camera and Microphone to Allow. 3️⃣ Refresh this page and try calling again.';
      } else if (error.message) {
        message = '❌ Call failed: ' + error.message + ' Make sure both devices are on the same network and the signaling server is running.';
      } else {
        message = '❌ Cannot start call. Check that: Both devices are on the same WiFi network, signaling server is running on your PC, and the remote peer is online.';
      }

      this.showAlert('Call Failed', message);
    }
  }

  /**
   * Accept incoming call
   */
  async acceptCall() {
    try {
      await this.webrtc.acceptCall();
    } catch (error: any) {
      console.error('Error accepting call:', error);

      let message = '';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        message = '⚠️ Camera permission denied. To fix: 1️⃣ Tap the lock icon in your browser address bar. 2️⃣ Change Camera and Microphone to Allow. 3️⃣ Ask the caller to call you again after you refresh the page.';
      } else {
        message = '❌ Cannot accept call. Error: ' + (error.message || 'Unknown error') + ' Please ask the caller to try again.';
      }

      this.showAlert('Failed to Accept Call', message);
    }
  }

  /**
   * Reject incoming call
   */
  rejectCall() {
    this.webrtc.rejectCall('User declined');
  }

  /**
   * End call
   */
  endCall() {
    this.webrtc.endCall();
  }

  /**
   * Toggle microphone mute
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.webrtc.toggleMute(this.isMuted);
  }

  /**
   * Toggle camera
   */
  toggleCamera() {
    this.isCameraOff = !this.isCameraOff;
    this.webrtc.toggleCamera(!this.isCameraOff);
  }

  /**
   * Switch camera
   */
  async switchCamera() {
    if (!this.selectedCamera) return;

    try {
      await this.webrtc.switchCamera(this.selectedCamera);
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }

  /**
   * Toggle recording
   */
  async toggleRecording() {
    if (this.isRecording) {
      await this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  /**
   * Start recording
   */
  private async startRecording() {
    const localStream = this.webrtc.getLocalStream();
    if (!localStream) return;

    try {
      await this.recorder.startRecording(localStream);
      this.isRecording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording');
    }
  }

  /**
   * Stop recording
   */
  private async stopRecording() {
    try {
      const blob = await this.recorder.stopRecording();
      this.isRecording = false;

      // Download recording
      this.recorder.downloadRecording(blob, `recording-${Date.now()}.webm`);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }

  /**
   * Get call state label
   */
  getCallStateLabel(): string {
    const labels: Record<CallState, string> = {
      idle: 'No active call',
      calling: 'Calling...',
      ringing: 'Incoming call',
      accepting: 'Accepting...',
      connecting: 'Connecting...',
      connected: 'Connected',
      disconnected: 'Disconnected',
      failed: 'Connection failed',
    };
    return labels[this.callState];
  }

  /**
   * Check if call is active
   */
  isCallActive(): boolean {
    return this.callState === 'connected';
  }

  /**
   * Check if incoming call
   */
  isIncomingCall(): boolean {
    const isRinging = this.callState === 'ringing';
    if (isRinging) {
      console.log('🔔 Incoming call detected, callState:', this.callState);
    }
    return isRinging;
  }

  /**
   * Check if test mode is active
   */
  isTestMode(): boolean {
    return this.webrtc.isTestMode();
  }

  /**
   * Check if local stream is available
   */
  hasLocalStream(): boolean {
    return this.webrtc.getLocalStream() !== null;
  }

  /**
   * Check if remote stream is available
   */
  hasRemoteStream(): boolean {
    return this.remoteVideoRef?.nativeElement?.srcObject !== null;
  }

  /**
   * Debug: Log stream info
   */
  debugStreams() {
    console.log('=== Stream Debug Info ===');
    console.log('Local video element:', this.localVideoRef?.nativeElement);
    console.log('Local video srcObject:', this.localVideoRef?.nativeElement?.srcObject);
    console.log('Local stream tracks:', this.webrtc.getLocalStream()?.getTracks());
    console.log('Remote video element:', this.remoteVideoRef?.nativeElement);
    console.log('Remote video srcObject:', this.remoteVideoRef?.nativeElement?.srcObject);
    console.log('Call state:', this.callState);
    console.log('My Peer ID:', this.myPeerId);
    console.log('Remote Peer ID:', this.remotePeerId);
    console.log('========================');
  }

  /**
   * Debug: Check connection stats
   */
  async debugConnection() {
    console.log('=== WebRTC Connection Stats ===');
    const pc = (this.webrtc as any).peerConnection?.getPeerConnection();
    if (pc) {
      console.log('Connection state:', pc.connectionState);
      console.log('ICE connection state:', pc.iceConnectionState);
      console.log('Signaling state:', pc.signalingState);

      const stats = await pc.getStats();
      stats.forEach((report: any) => {
        if (report.type === 'inbound-rtp' || report.type === 'outbound-rtp') {
          console.log(`${report.type}:`, report);
        }
      });
    } else {
      console.log('No peer connection active');
    }
    console.log('================================');
  }
}
