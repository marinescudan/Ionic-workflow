import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SocketService } from '../socket/socket.service';

/**
 * Signaling Service
 *
 * Uses Socket.io (from Lesson 10) for WebRTC signaling
 *
 * 💡 INTERVIEW: Signaling is NOT part of WebRTC spec
 * Can use WebSocket, HTTP polling, SIP, XMPP, etc.
 *
 * Signaling messages:
 * - offer: SDP offer from caller
 * - answer: SDP answer from callee
 * - ice-candidate: ICE candidate
 * - call-request: Initiate call
 * - call-accept: Accept incoming call
 * - call-reject: Reject incoming call
 * - call-end: Hang up
 */
@Injectable({
  providedIn: 'root',
})
export class SignalingService {
  // Incoming signaling messages
  private offerSubject = new Subject<RTCSessionDescriptionInit>();
  private answerSubject = new Subject<RTCSessionDescriptionInit>();
  private iceCandidateSubject = new Subject<RTCIceCandidateInit>();
  private callRequestSubject = new Subject<{ from: string; callId: string }>();
  private callAcceptSubject = new Subject<{ callId: string }>();
  private callRejectSubject = new Subject<{ callId: string; reason?: string }>();
  private callEndSubject = new Subject<{ callId: string }>();

  public offer$ = this.offerSubject.asObservable();
  public answer$ = this.answerSubject.asObservable();
  public iceCandidate$ = this.iceCandidateSubject.asObservable();
  public callRequest$ = this.callRequestSubject.asObservable();
  public callAccept$ = this.callAcceptSubject.asObservable();
  public callReject$ = this.callRejectSubject.asObservable();
  public callEnd$ = this.callEndSubject.asObservable();

  constructor(private socket: SocketService) {
    this.setupListeners();
    this.registerUser();
  }

  /**
   * Register user with signaling server
   */
  private registerUser(): void {
    // Generate or get user ID (you can customize this)
    const userId = this.getUserId();

    // Connect to socket if not connected
    if (!this.socket.isConnected) {
      this.socket.connect();
    }

    // Register when connected
    this.socket.on('connect').subscribe(() => {
      console.log('Socket connected, registering user:', userId);
      this.socket.emit('register', userId);
    });

    // Confirm registration
    this.socket.on<{ userId: string; socketId: string }>('registered').subscribe(data => {
      console.log('User registered successfully:', data);
    });
  }

  /**
   * Generate memorable user ID
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
   * Get or generate user ID
   * You can customize this to use actual user authentication
   */
  private getUserId(): string {
    // Check if user ID exists in localStorage
    let userId = localStorage.getItem('webrtc-user-id');

    if (!userId) {
      // Generate memorable user ID
      userId = this.generateMemorableId();
      localStorage.setItem('webrtc-user-id', userId);
    }

    return userId;
  }

  /**
   * Set up Socket.io listeners for signaling messages
   */
  private setupListeners(): void {
    // Receive offer
    this.socket.on<{ offer: RTCSessionDescriptionInit }>('offer').subscribe(data => {
      console.log('Received offer');
      this.offerSubject.next(data.offer);
    });

    // Receive answer
    this.socket.on<{ answer: RTCSessionDescriptionInit }>('answer').subscribe(data => {
      console.log('Received answer');
      this.answerSubject.next(data.answer);
    });

    // Receive ICE candidate
    this.socket.on<{ candidate: RTCIceCandidateInit }>('ice-candidate').subscribe(data => {
      console.log('Received ICE candidate');
      this.iceCandidateSubject.next(data.candidate);
    });

    // Incoming call request
    this.socket.on<{ from: string; callId: string }>('call-request').subscribe(data => {
      console.log('Incoming call from:', data.from);
      this.callRequestSubject.next(data);
    });

    // Call accepted
    this.socket.on<{ callId: string }>('call-accept').subscribe(data => {
      console.log('Call accepted');
      this.callAcceptSubject.next(data);
    });

    // Call rejected
    this.socket.on<{ callId: string; reason?: string }>('call-reject').subscribe(data => {
      console.log('Call rejected:', data.reason);
      this.callRejectSubject.next(data);
    });

    // Call ended
    this.socket.on<{ callId: string }>('call-end').subscribe(data => {
      console.log('Call ended');
      this.callEndSubject.next(data);
    });
  }

  /**
   * Send call request
   */
  sendCallRequest(to: string, callId: string): void {
    this.socket.emit('call-request', { to, callId });
  }

  /**
   * Accept incoming call
   */
  acceptCall(callId: string): void {
    this.socket.emit('call-accept', { callId });
  }

  /**
   * Reject incoming call
   */
  rejectCall(callId: string, reason?: string): void {
    this.socket.emit('call-reject', { callId, reason });
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
}
