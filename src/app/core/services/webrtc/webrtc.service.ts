import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MediaDevicesService } from './media-devices.service';
import { PeerConnectionService } from './peer-connection.service';
import { SignalingService } from './signaling.service';

/**
 * Main WebRTC Service
 *
 * Orchestrates the entire WebRTC call flow
 *
 * 💡 INTERVIEW: This service ties together:
 * - Media devices
 * - Peer connection
 * - Signaling
 */
@Injectable({
  providedIn: 'root',
})
export class WebRTCService {
  // 🧪 TEST MODE: Set to true to test local camera without signaling server
  private TEST_MODE = false; // Change to false when signaling server is available

  // Call state
  private callStateSubject = new BehaviorSubject<CallState>('idle');
  public callState$ = this.callStateSubject.asObservable();

  // Current call ID
  private currentCallId: string | null = null;

  // Remote peer ID
  private remotePeerId: string | null = null;

  // Local stream
  private localStream: MediaStream | null = null;

  // Remote stream
  private remoteStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  public remoteStream$ = this.remoteStreamSubject.asObservable();

  // Call events
  private callEndedSubject = new Subject<void>();
  public callEnded$ = this.callEndedSubject.asObservable();

  constructor(
    private mediaDevices: MediaDevicesService,
    private peerConnection: PeerConnectionService,
    private signaling: SignalingService
  ) {
    if (!this.TEST_MODE) {
      this.setupSignalingListeners();
    }
    this.setupPeerConnectionListeners();
  }

  /**
   * Set up signaling listeners
   */
  private setupSignalingListeners(): void {
    // Incoming call request
    this.signaling.callRequest$.subscribe(async ({ from, callId }) => {
      this.remotePeerId = from;
      this.currentCallId = callId;
      this.callStateSubject.next('ringing');
    });

    // Call accepted
    this.signaling.callAccept$.subscribe(async ({ callId }) => {
      if (callId === this.currentCallId) {
        await this.startCall();
      }
    });

    // Call rejected
    this.signaling.callReject$.subscribe(({ callId, reason }) => {
      if (callId === this.currentCallId) {
        this.endCall();
      }
    });

    // Received offer
    this.signaling.offer$.subscribe(async (offer) => {
      await this.handleOffer(offer);
    });

    // Received answer
    this.signaling.answer$.subscribe(async (answer) => {
      await this.handleAnswer(answer);
    });

    // Received ICE candidate
    this.signaling.iceCandidate$.subscribe(async (candidate) => {
      await this.peerConnection.addIceCandidate(candidate);
    });

    // Call ended
    this.signaling.callEnd$.subscribe(() => {
      this.endCall();
    });
  }

  /**
   * Set up peer connection listeners
   */
  private setupPeerConnectionListeners(): void {
    // Remote stream
    this.peerConnection.remoteStream$.subscribe((stream) => {
      this.remoteStreamSubject.next(stream);
      if (stream) {
        this.callStateSubject.next('connected');
      }
    });

    // Connection state
    this.peerConnection.connectionState$.subscribe((state) => {
      if (state === 'failed' || state === 'disconnected') {
        this.endCall();
      }
    });
  }

  /**
   * Set up ICE candidate handler
   */
  private setupIceCandidateHandler(pc: RTCPeerConnection): void {
    pc.onicecandidate = (event) => {
      if (event.candidate && this.remotePeerId && !this.TEST_MODE) {
        this.signaling.sendIceCandidate(this.remotePeerId, event.candidate);
      }
    };
  }

  /**
   * Initiate call to remote peer
   */
  async initiateCall(peerId: string): Promise<void> {
    try {
      this.remotePeerId = peerId;
      this.currentCallId = this.generateCallId();
      this.callStateSubject.next('calling');

      // Get local media
      try {
        this.localStream = await this.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (mediaError) {
        console.error('⚠️ Could not access camera/microphone:', mediaError);
        console.log('💡 This is normal if another browser/app is using the camera');
        console.log('📞 Continuing call with receive-only mode (no camera/mic)');
        // Continue without local media - receive-only mode
      }

      // 🧪 TEST MODE: Skip signaling, show local camera only
      if (this.TEST_MODE) {
        console.log('🧪 TEST MODE: Local camera active. Set TEST_MODE=false to enable full calling.');
        this.callStateSubject.next('idle'); // Stay in idle to show local video
        return;
      }

      // Send call request
      this.signaling.sendCallRequest(peerId, this.currentCallId);

    } catch (error) {
      console.error('Error initiating call:', error);
      this.callStateSubject.next('idle');
      throw error;
    }
  }

  /**
   * Accept incoming call
   */
  async acceptCall(): Promise<void> {
    try {
      if (!this.currentCallId) {
        throw new Error('No incoming call to accept');
      }

      this.callStateSubject.next('accepting');

      // Get local media
      try {
        this.localStream = await this.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (mediaError) {
        console.error('⚠️ Could not access camera/microphone:', mediaError);
        console.log('💡 This is normal if another browser/app is using the camera');
        console.log('📞 Continuing call with receive-only mode (no camera/mic)');
        // Continue without local media - receive-only mode
      }

      // Accept call via signaling
      this.signaling.acceptCall(this.currentCallId);

      // Wait for offer from caller
      // (will be handled by signaling.offer$ subscription)

    } catch (error) {
      console.error('Error accepting call:', error);
      this.endCall();
      throw error;
    }
  }

  /**
   * Reject incoming call
   */
  rejectCall(reason?: string): void {
    if (this.currentCallId) {
      this.signaling.rejectCall(this.currentCallId, reason);
      this.callStateSubject.next('idle');
      this.currentCallId = null;
      this.remotePeerId = null;
    }
  }

  /**
   * Start call (after acceptance)
   */
  private async startCall(): Promise<void> {
    try {
      this.callStateSubject.next('connecting');

      // Create peer connection
      const pc = this.peerConnection.createPeerConnection();

      // Set up ICE candidate handler
      this.setupIceCandidateHandler(pc);

      // Add local stream
      if (this.localStream) {
        this.peerConnection.addLocalStream(this.localStream);
      }

      // Create and send offer
      const offer = await this.peerConnection.createOffer();
      if (this.remotePeerId) {
        this.signaling.sendOffer(this.remotePeerId, offer);
      }

    } catch (error) {
      console.error('Error starting call:', error);
      this.endCall();
      throw error;
    }
  }

  /**
   * Handle received offer (callee side)
   */
  private async handleOffer(offer: RTCSessionDescriptionInit): Promise<void> {
    try {
      // Create peer connection if not exists
      if (!this.peerConnection.getPeerConnection()) {
        const pc = this.peerConnection.createPeerConnection();

        // Set up ICE candidate handler
        this.setupIceCandidateHandler(pc);

        // Add local stream
        if (this.localStream) {
          this.peerConnection.addLocalStream(this.localStream);
        }
      }

      // Set remote description
      await this.peerConnection.setRemoteDescription(offer);

      // Create and send answer
      const answer = await this.peerConnection.createAnswer();
      if (this.remotePeerId) {
        this.signaling.sendAnswer(this.remotePeerId, answer);
      }

    } catch (error) {
      console.error('Error handling offer:', error);
      this.endCall();
      throw error;
    }
  }

  /**
   * Handle received answer (caller side)
   */
  private async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    try {
      await this.peerConnection.setRemoteDescription(answer);
    } catch (error) {
      console.error('Error handling answer:', error);
      this.endCall();
      throw error;
    }
  }

  /**
   * End call
   */
  endCall(): void {
    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Close peer connection
    this.peerConnection.close();

    // Notify remote peer
    if (this.currentCallId) {
      this.signaling.endCall(this.currentCallId);
    }

    // Reset state
    this.callStateSubject.next('idle');
    this.remoteStreamSubject.next(null);
    this.currentCallId = null;
    this.remotePeerId = null;

    // Emit call ended event
    this.callEndedSubject.next();
  }

  /**
   * Toggle microphone mute
   */
  toggleMute(muted: boolean): void {
    this.mediaDevices.toggleAudio(!muted);
  }

  /**
   * Toggle camera
   */
  toggleCamera(enabled: boolean): void {
    this.mediaDevices.toggleVideo(enabled);
  }

  /**
   * Switch camera (mobile)
   */
  async switchCamera(deviceId: string): Promise<void> {
    const newStream = await this.mediaDevices.switchCamera(deviceId);
    const videoTrack = newStream.getVideoTracks()[0];
    if (videoTrack) {
      await this.peerConnection.replaceVideoTrack(videoTrack);
    }
  }

  /**
   * Get current call state
   */
  getCurrentCallState(): CallState {
    return this.callStateSubject.value;
  }

  /**
   * Get local stream
   */
  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  /**
   * Check if test mode is active
   */
  isTestMode(): boolean {
    return this.TEST_MODE;
  }

  /**
   * Generate unique call ID
   */
  private generateCallId(): string {
    return `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Call states
 */
export type CallState =
  | 'idle'          // No active call
  | 'calling'       // Outgoing call, waiting for answer
  | 'ringing'       // Incoming call, not yet accepted
  | 'accepting'     // Accepting incoming call
  | 'connecting'    // Establishing connection
  | 'connected'     // Call active
  | 'disconnected'  // Call ended
  | 'failed';       // Connection failed
