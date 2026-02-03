/**
 * WebRTC Models
 *
 * Type definitions for WebRTC feature
 */

/**
 * Call state enum
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

/**
 * Call information
 */
export interface CallInfo {
  callId: string;
  peerId: string;
  state: CallState;
  startTime?: Date;
  endTime?: Date;
  duration?: number; // in seconds
}

/**
 * Media device info
 */
export interface MediaDevice {
  deviceId: string;
  kind: 'videoinput' | 'audioinput' | 'audiooutput';
  label: string;
  groupId: string;
}

/**
 * Connection quality metrics
 */
export interface ConnectionQuality {
  bandwidth: number;      // Mbps
  packetLoss: number;     // Percentage
  latency: number;        // Milliseconds
  quality: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown';
}

/**
 * Call settings
 */
export interface CallSettings {
  videoEnabled: boolean;
  audioEnabled: boolean;
  selectedCamera?: string;
  selectedMicrophone?: string;
  selectedSpeaker?: string;
  videoResolution?: {
    width: number;
    height: number;
  };
  frameRate?: number;
}

/**
 * Recording state
 */
export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  startTime?: Date;
  duration?: number; // in seconds
}

/**
 * Peer info
 */
export interface PeerInfo {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
}

/**
 * Call event types
 */
export enum CallEventType {
  CallStarted = 'CALL_STARTED',
  CallEnded = 'CALL_ENDED',
  CallAccepted = 'CALL_ACCEPTED',
  CallRejected = 'CALL_REJECTED',
  PeerJoined = 'PEER_JOINED',
  PeerLeft = 'PEER_LEFT',
  MediaToggled = 'MEDIA_TOGGLED',
  RecordingStarted = 'RECORDING_STARTED',
  RecordingStopped = 'RECORDING_STOPPED',
}

/**
 * Call event
 */
export interface CallEvent {
  type: CallEventType;
  timestamp: Date;
  data?: any;
}
