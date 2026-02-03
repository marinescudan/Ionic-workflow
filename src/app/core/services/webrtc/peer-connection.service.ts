import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Peer Connection Service
 *
 * Wraps RTCPeerConnection with observable state
 *
 * 💡 INTERVIEW: RTCPeerConnection is the heart of WebRTC
 * It manages the peer-to-peer connection and media streaming
 */
@Injectable({
  providedIn: 'root',
})
export class PeerConnectionService {
  private peerConnection: RTCPeerConnection | null = null;

  // Connection state
  private connectionStateSubject = new BehaviorSubject<RTCPeerConnectionState>('new');
  public connectionState$ = this.connectionStateSubject.asObservable();

  // ICE connection state
  private iceConnectionStateSubject = new BehaviorSubject<RTCIceConnectionState>('new');
  public iceConnectionState$ = this.iceConnectionStateSubject.asObservable();

  // Signaling state
  private signalingStateSubject = new BehaviorSubject<RTCSignalingState>('stable');
  public signalingState$ = this.signalingStateSubject.asObservable();

  // Remote stream
  private remoteStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  public remoteStream$ = this.remoteStreamSubject.asObservable();

  /**
   * ICE server configuration
   *
   * 💡 INTERVIEW: ICE servers help with NAT traversal
   * - STUN: Discovers public IP
   * - TURN: Relays media when direct connection fails
   */
  private iceServers: RTCIceServer[] = [
    // Google's public STUN server
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },

    // Example TURN server (replace with your own)
    // {
    //   urls: 'turn:your-turn-server.com:3478',
    //   username: 'user',
    //   credential: 'pass',
    // },
  ];

  /**
   * Create RTCPeerConnection
   *
   * @param config Optional custom configuration
   */
  createPeerConnection(config?: RTCConfiguration): RTCPeerConnection {
    const configuration: RTCConfiguration = config || {
      iceServers: this.iceServers,
      iceCandidatePoolSize: 10, // Pre-gather candidates
    };

    this.peerConnection = new RTCPeerConnection(configuration);

    // Set up event listeners
    this.setupEventListeners(this.peerConnection);

    return this.peerConnection;
  }

  /**
   * Set up RTCPeerConnection event listeners
   */
  private setupEventListeners(pc: RTCPeerConnection): void {
    // Connection state changes
    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
      this.connectionStateSubject.next(pc.connectionState);

      // Clean up on closed
      if (pc.connectionState === 'closed') {
        this.cleanup();
      }
    };

    // ICE connection state changes
    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
      this.iceConnectionStateSubject.next(pc.iceConnectionState);
    };

    // Signaling state changes
    pc.onsignalingstatechange = () => {
      console.log('Signaling state:', pc.signalingState);
      this.signalingStateSubject.next(pc.signalingState);
    };

    // ICE gathering state changes
    pc.onicegatheringstatechange = () => {
      console.log('ICE gathering state:', pc.iceGatheringState);
    };

    // Remote track added
    pc.ontrack = (event) => {
      console.log('Remote track added:', event.track.kind);
      const [remoteStream] = event.streams;
      this.remoteStreamSubject.next(remoteStream);
    };

    // Negotiation needed (renegotiation)
    pc.onnegotiationneeded = () => {
      console.log('Negotiation needed');
      // Caller should create new offer
    };
  }

  /**
   * Add local stream tracks to peer connection
   */
  addLocalStream(stream: MediaStream): void {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    // Add each track to the peer connection
    stream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, stream);
    });
  }

  /**
   * Replace video track (e.g., switch camera)
   *
   * 💡 INTERVIEW: replaceTrack() doesn't require renegotiation
   * More efficient than removing and re-adding track
   */
  async replaceVideoTrack(newTrack: MediaStreamTrack): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    const sender = this.peerConnection
      .getSenders()
      .find(s => s.track?.kind === 'video');

    if (sender) {
      await sender.replaceTrack(newTrack);
    }
  }

  /**
   * Create offer (caller side)
   *
   * @returns SDP offer
   */
  async createOffer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  /**
   * Create answer (callee side)
   *
   * @returns SDP answer
   */
  async createAnswer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  /**
   * Set remote description (offer or answer)
   */
  async setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    await this.peerConnection.setRemoteDescription(description);
  }

  /**
   * Add ICE candidate
   *
   * 💡 INTERVIEW: ICE candidates can be sent as soon as they're generated
   * This is called "Trickle ICE" and reduces connection time
   */
  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    try {
      await this.peerConnection.addIceCandidate(candidate);
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  /**
   * Get connection statistics
   *
   * Returns detailed stats about the connection
   */
  async getStats(): Promise<RTCStatsReport> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not created');
    }

    return await this.peerConnection.getStats();
  }

  /**
   * Get current peer connection
   */
  getPeerConnection(): RTCPeerConnection | null {
    return this.peerConnection;
  }

  /**
   * Close peer connection
   */
  close(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.cleanup();
    }
  }

  /**
   * Clean up resources
   */
  private cleanup(): void {
    this.peerConnection = null;
    this.remoteStreamSubject.next(null);
    this.connectionStateSubject.next('closed');
  }
}
