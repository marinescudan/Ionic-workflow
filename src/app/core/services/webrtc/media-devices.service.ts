import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Media Devices Service
 *
 * Handles camera and microphone access
 *
 * 💡 INTERVIEW: getUserMedia() requires HTTPS (except localhost)
 * Permissions are per-origin and persist until revoked
 */
@Injectable({
  providedIn: 'root',
})
export class MediaDevicesService {
  private localStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  public localStream$ = this.localStreamSubject.asObservable();

  private availableDevices: MediaDeviceInfo[] = [];

  constructor() {
    // Listen for device changes (plug/unplug camera/mic)
    navigator.mediaDevices?.addEventListener('devicechange', () => {
      this.enumerateDevices();
    });
  }

  /**
   * Get user media (camera + microphone)
   *
   * @param constraints Media constraints
   * @returns Promise resolving to MediaStream
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
   * Get display media (screen sharing)
   *
   * 💡 INTERVIEW: getDisplayMedia() always requires user gesture
   * Cannot be called on page load
   */
  async getDisplayMedia(constraints: MediaStreamConstraints = {
    video: true,
    audio: false, // Screen audio requires user permission
  }): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      return stream;
    } catch (error) {
      console.error('Error accessing display media:', error);
      throw this.handleMediaError(error as DOMException);
    }
  }

  /**
   * Enumerate available media devices
   *
   * Returns cameras, microphones, and speakers
   */
  async enumerateDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableDevices = devices;
      return devices;
    } catch (error) {
      console.error('Error enumerating devices:', error);
      return [];
    }
  }

  /**
   * Get available video input devices (cameras)
   */
  async getVideoDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
  }

  /**
   * Get available audio input devices (microphones)
   */
  async getAudioDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.enumerateDevices();
    return devices.filter(device => device.kind === 'audioinput');
  }

  /**
   * Get available audio output devices (speakers)
   */
  async getAudioOutputDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.enumerateDevices();
    return devices.filter(device => device.kind === 'audiooutput');
  }

  /**
   * Switch camera (useful for mobile - front/back)
   *
   * @param deviceId Camera device ID
   * @returns New MediaStream
   */
  async switchCamera(deviceId: string): Promise<MediaStream> {
    // Stop current video tracks
    const currentStream = this.localStreamSubject.value;
    currentStream?.getVideoTracks().forEach(track => track.stop());

    // Get new stream with specific device
    const constraints: MediaStreamConstraints = {
      video: { deviceId: { exact: deviceId } },
      audio: true, // Keep existing audio
    };

    return this.getUserMedia(constraints);
  }

  /**
   * Toggle video track (enable/disable camera)
   */
  toggleVideo(enabled: boolean): void {
    const stream = this.localStreamSubject.value;
    stream?.getVideoTracks().forEach(track => {
      track.enabled = enabled;
    });
  }

  /**
   * Toggle audio track (mute/unmute microphone)
   */
  toggleAudio(enabled: boolean): void {
    const stream = this.localStreamSubject.value;
    stream?.getAudioTracks().forEach(track => {
      track.enabled = enabled;
    });
  }

  /**
   * Stop all tracks in current stream
   */
  stopLocalStream(): void {
    const stream = this.localStreamSubject.value;
    stream?.getTracks().forEach(track => track.stop());
    this.localStreamSubject.next(null);
  }

  /**
   * Handle media errors with user-friendly messages
   */
  private handleMediaError(error: DOMException): Error {
    switch (error.name) {
      case 'NotAllowedError':
      case 'PermissionDeniedError':
        return new Error('Permission denied. Please allow camera/microphone access.');

      case 'NotFoundError':
      case 'DevicesNotFoundError':
        return new Error('No camera or microphone found.');

      case 'NotReadableError':
      case 'TrackStartError':
        return new Error('Camera or microphone is already in use.');

      case 'OverconstrainedError':
        return new Error('Requested device not available.');

      case 'TypeError':
        return new Error('Invalid constraints provided.');

      default:
        return new Error(`Media access error: ${error.message}`);
    }
  }

  /**
   * Get supported constraints for current browser
   */
  getSupportedConstraints(): MediaTrackSupportedConstraints {
    return navigator.mediaDevices.getSupportedConstraints();
  }

  /**
   * Apply video constraints (resolution, frame rate)
   *
   * Common constraints:
   * - 320x240 (QVGA) - Low quality
   * - 640x480 (VGA) - Medium quality
   * - 1280x720 (HD) - High quality
   * - 1920x1080 (Full HD) - Very high quality
   */
  async applyVideoConstraints(constraints: {
    width?: number;
    height?: number;
    frameRate?: number;
    facingMode?: 'user' | 'environment'; // front/back camera
  }): Promise<MediaStream> {
    const mediaConstraints: MediaStreamConstraints = {
      video: {
        width: { ideal: constraints.width || 1280 },
        height: { ideal: constraints.height || 720 },
        frameRate: { ideal: constraints.frameRate || 30 },
        ...(constraints.facingMode && { facingMode: constraints.facingMode }),
      },
      audio: true,
    };

    return this.getUserMedia(mediaConstraints);
  }
}
