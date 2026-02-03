import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Stream Recorder Service
 *
 * Records video/audio streams using MediaRecorder API
 *
 * 💡 INTERVIEW: MediaRecorder supports multiple formats
 * Browser support: All modern browsers
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
   *
   * @param stream MediaStream to record
   * @param options Recording options
   */
  async startRecording(
    stream: MediaStream,
    options: {
      mimeType?: string;
      videoBitsPerSecond?: number;
      audioBitsPerSecond?: number;
    } = {}
  ): Promise<void> {
    try {
      // Check supported MIME types
      const mimeType = this.getSupportedMimeType(options.mimeType);

      if (!mimeType) {
        throw new Error('No supported MIME type for recording');
      }

      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: options.videoBitsPerSecond || 2500000, // 2.5 Mbps
        audioBitsPerSecond: options.audioBitsPerSecond || 128000,  // 128 kbps
      });

      // Reset recorded chunks
      this.recordedChunks = [];

      // Handle data available
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // Handle recording stop
      this.mediaRecorder.onstop = () => {
        console.log('Recording stopped');
        this.recordingStateSubject.next('stopped');
      };

      // Handle errors
      this.mediaRecorder.onerror = (event: any) => {
        console.error('MediaRecorder error:', event.error);
      };

      // Start recording
      this.mediaRecorder.start(1000); // Collect data every 1 second
      this.recordingStateSubject.next('recording');

      console.log('Recording started with', mimeType);

    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  /**
   * Stop recording
   *
   * @returns Recorded blob
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
        this.recordingStateSubject.next('stopped');
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
   * Check if recording is active
   */
  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  /**
   * Get supported MIME type
   */
  private getSupportedMimeType(preferred?: string): string | null {
    const types = [
      preferred,
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
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
   * Download recorded blob as file
   */
  downloadRecording(blob: Blob, filename: string = 'recording.webm'): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Get recorded blob URL for playback
   */
  getRecordingUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}
