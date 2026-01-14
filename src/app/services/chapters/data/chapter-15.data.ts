// src/app/services/chapters/data/chapter-15.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_15_DATA: Chapter = {
  id: 15,
  title: 'Audio Recording & File System',
  description: 'Master audio recording, playback, and file management with Capacitor plugins for cross-platform voice recording apps',
  icon: 'mic-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 150,
      title: 'Audio Recording Fundamentals',
      content: `
        <h2>Understanding Audio Recording</h2>
        <p>Audio recording on mobile devices involves several key concepts including audio formats, recording modes, and platform differences.</p>

        <h3>Audio Formats Comparison</h3>
        <table>
          <tr>
            <th>Format</th>
            <th>Compression</th>
            <th>File Size/Min</th>
            <th>Quality</th>
            <th>Platform Support</th>
          </tr>
          <tr>
            <td>WAV</td>
            <td>Uncompressed</td>
            <td>~10 MB</td>
            <td>Highest</td>
            <td>iOS, Android, Web</td>
          </tr>
          <tr>
            <td>M4A (AAC)</td>
            <td>Lossy</td>
            <td>~1-2 MB</td>
            <td>High</td>
            <td>iOS, Android, Web</td>
          </tr>
          <tr>
            <td>WebM (Opus)</td>
            <td>Lossy</td>
            <td>~0.5-1 MB</td>
            <td>Medium</td>
            <td>Web, Android</td>
          </tr>
          <tr>
            <td>MP3</td>
            <td>Lossy</td>
            <td>~1-2.5 MB</td>
            <td>Medium</td>
            <td>iOS, Android, Web</td>
          </tr>
        </table>

        <h3>Recording Modes</h3>
        <ul>
          <li><strong>Voice Recording:</strong> Optimized for speech (lower bitrate 32-64 kbps)</li>
          <li><strong>Music Recording:</strong> High fidelity (higher bitrate 128-256 kbps)</li>
          <li><strong>Compressed:</strong> Real-time compression during recording</li>
          <li><strong>Uncompressed:</strong> Raw audio data (post-processing needed)</li>
        </ul>

        <h3>Platform Differences</h3>
        <table>
          <tr>
            <th>Platform</th>
            <th>Preferred Format</th>
            <th>Framework</th>
            <th>Background Recording</th>
          </tr>
          <tr>
            <td>iOS</td>
            <td>M4A/AAC</td>
            <td>AVFoundation</td>
            <td>Yes (with config)</td>
          </tr>
          <tr>
            <td>Android</td>
            <td>Multiple formats</td>
            <td>MediaRecorder API</td>
            <td>Yes (foreground service)</td>
          </tr>
          <tr>
            <td>Web</td>
            <td>WebM/Opus</td>
            <td>MediaRecorder API</td>
            <td>No (tab must be active)</td>
          </tr>
        </table>

        <h3>File Size Considerations</h3>
        <p>For a 1-hour podcast:</p>
        <ul>
          <li>WAV: ~600 MB (uncompressed)</li>
          <li>M4A (128 kbps): ~60 MB (good quality)</li>
          <li>MP3 (64 kbps): ~30 MB (acceptable for voice)</li>
          <li>WebM (32 kbps): ~15 MB (voice-optimized)</li>
        </ul>
        <p><strong>Best Practice:</strong> Always compress before uploading to save bandwidth!</p>
      `,
      codeSnippets: [
        {
          id: 1500,
          language: 'typescript',
          title: 'Audio Format Comparison',
          copyable: true,
          code: `/*
💡 INTERVIEW: Audio Recording Concepts

Q: What's the difference between PCM and compressed audio?
A: PCM (Pulse Code Modulation) is uncompressed raw audio data.
   Compressed formats (AAC, MP3) reduce file size by removing
   inaudible frequencies. PCM = better quality, larger files.

Q: Why different formats on different platforms?
A: iOS has native hardware encoders for AAC (M4A).
   Android supports more formats but AAC is most efficient.
   Web uses WebM/Opus for browser compatibility.

Q: What's a good bitrate for voice recording?
A: Voice: 32-64 kbps (speech optimized)
   Music: 128-256 kbps (high fidelity)
   Higher bitrate = better quality but larger files
*/

// Audio format comparison
interface AudioFormat {
  name: string;
  extension: string;
  compression: 'lossy' | 'lossless' | 'uncompressed';
  typical_bitrate: string;
  file_size_per_minute: string;
  quality: 'low' | 'medium' | 'high' | 'highest';
  platform_support: string[];
}

const AUDIO_FORMATS: AudioFormat[] = [
  {
    name: 'WAV',
    extension: '.wav',
    compression: 'uncompressed',
    typical_bitrate: '1411 kbps',
    file_size_per_minute: '~10 MB',
    quality: 'highest',
    platform_support: ['iOS', 'Android', 'Web']
  },
  {
    name: 'M4A (AAC)',
    extension: '.m4a',
    compression: 'lossy',
    typical_bitrate: '128-256 kbps',
    file_size_per_minute: '~1-2 MB',
    quality: 'high',
    platform_support: ['iOS', 'Android', 'Web']
  },
  {
    name: 'WebM (Opus)',
    extension: '.webm',
    compression: 'lossy',
    typical_bitrate: '32-128 kbps',
    file_size_per_minute: '~0.5-1 MB',
    quality: 'medium',
    platform_support: ['Web', 'Android']
  }
];`,
        },
      ],
    },
    {
      id: 151,
      title: 'Capacitor Audio Recorder Plugin',
      content: `
        <h2>Installing the Audio Recorder Plugin</h2>
        <p>The @capacitor-community/audio-recorder plugin provides a unified API for audio recording across all platforms.</p>

        <h3>Installation Steps</h3>
        <pre><code># Install audio recorder plugin
npm install @capacitor-community/audio-recorder

# Install filesystem plugin
npm install @capacitor/filesystem

# Sync native projects
npx cap sync

💡 INTERVIEW: Always run 'cap sync' after installing plugins!
   This copies web assets and updates native projects.</code></pre>

        <h3>Why Use Capacitor Audio Recorder?</h3>
        <ul>
          <li>Unified API across iOS, Android, and Web</li>
          <li>Native platform optimizations (hardware encoders)</li>
          <li>Permission handling abstraction</li>
          <li>File system integration</li>
          <li>Background recording support (mobile)</li>
        </ul>

        <h3>iOS Configuration (Info.plist)</h3>
        <pre><code>&lt;key&gt;NSMicrophoneUsageDescription&lt;/key&gt;
&lt;string&gt;This app needs microphone access to record audio&lt;/string&gt;

&lt;!-- For background recording (optional) --&gt;
&lt;key&gt;UIBackgroundModes&lt;/key&gt;
&lt;array&gt;
  &lt;string&gt;audio&lt;/string&gt;
&lt;/array&gt;

💡 INTERVIEW: iOS requires usage description in Info.plist.
   Rejection reason: "Missing purpose string" if not included.</code></pre>

        <h3>Android Configuration (AndroidManifest.xml)</h3>
        <pre><code>&lt;uses-permission android:name="android.permission.RECORD_AUDIO" /&gt;
&lt;uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
                 android:maxSdkVersion="32" /&gt;
&lt;uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
                 android:maxSdkVersion="32" /&gt;

&lt;!-- For Android 13+ --&gt;
&lt;uses-permission android:name="android.permission.READ_MEDIA_AUDIO" /&gt;

💡 INTERVIEW: Android 13+ uses granular media permissions.
   No longer needs broad WRITE_EXTERNAL_STORAGE for app files.</code></pre>

        <h3>Permission Best Practices</h3>
        <ul>
          <li>Check permissions before recording</li>
          <li>Explain why you need permission (before requesting)</li>
          <li>Handle denial gracefully (show settings link)</li>
          <li>Don't spam requests (remember user choice)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1510,
          language: 'bash',
          title: 'Installation Commands',
          copyable: true,
          code: `# Install audio recorder plugin
npm install @capacitor-community/audio-recorder

# Install filesystem plugin
npm install @capacitor/filesystem

# Sync native projects
npx cap sync`,
        },
      ],
    },
    {
      id: 152,
      title: 'Audio Recording Models',
      content: `
        <h2>Audio Recording Data Models</h2>
        <p>Define TypeScript interfaces for audio recordings and recording status.</p>

        <h3>AudioRecording Interface</h3>
        <p>Stores metadata about recorded audio files:</p>
        <ul>
          <li><strong>id:</strong> Unique identifier</li>
          <li><strong>filename:</strong> Name of the audio file</li>
          <li><strong>filepath:</strong> Path to the audio file</li>
          <li><strong>duration:</strong> Recording length in seconds</li>
          <li><strong>size:</strong> File size in bytes</li>
          <li><strong>format:</strong> Audio format (wav, m4a, webm, mp3)</li>
          <li><strong>sampleRate:</strong> Sample rate (e.g., 44100 Hz)</li>
          <li><strong>bitRate:</strong> Bit rate (e.g., 128000 bps)</li>
          <li><strong>channels:</strong> Number of channels (1 = mono, 2 = stereo)</li>
          <li><strong>uploaded:</strong> Upload status flag</li>
        </ul>

        <h3>RecordingStatus Interface</h3>
        <p>Tracks the current recording state:</p>
        <ul>
          <li><strong>isRecording:</strong> Currently recording flag</li>
          <li><strong>isPaused:</strong> Paused state flag</li>
          <li><strong>currentTime:</strong> Current recording time in seconds</li>
          <li><strong>maxDuration:</strong> Maximum allowed duration</li>
        </ul>

        <h3>RecordingConfig Interface</h3>
        <p>Configuration options for recording:</p>
        <ul>
          <li><strong>format:</strong> Target audio format</li>
          <li><strong>sampleRate:</strong> Sample rate (8000, 16000, 44100, 48000)</li>
          <li><strong>channels:</strong> Mono (1) or stereo (2)</li>
          <li><strong>bitRate:</strong> For compressed formats</li>
          <li><strong>maxDuration:</strong> Auto-stop after N seconds</li>
        </ul>

        <h3>Sample Rate Guidelines</h3>
        <ul>
          <li><strong>16000 Hz (16 kHz):</strong> Perfect for speech, smaller files</li>
          <li><strong>44100 Hz (44.1 kHz):</strong> CD quality, music recording</li>
          <li><strong>48000 Hz (48 kHz):</strong> Professional audio, video sync</li>
        </ul>
        <p><strong>Rule:</strong> Higher sample rate = better quality + larger files</p>
      `,
      codeSnippets: [
        {
          id: 1520,
          language: 'typescript',
          title: 'Audio Recording Models',
          copyable: true,
          code: `// src/app/features/voice-notes/models/audio-recording.model.ts

export interface AudioRecording {
  id: string;
  filename: string;
  filepath: string;
  duration: number;          // Duration in seconds
  size: number;              // File size in bytes
  format: 'wav' | 'm4a' | 'webm' | 'mp3';
  sampleRate: number;        // e.g., 44100 Hz
  bitRate?: number;          // e.g., 128000 bps
  channels: number;          // 1 = mono, 2 = stereo
  mimeType: string;          // e.g., 'audio/wav'
  createdAt: number;         // Timestamp
  title?: string;            // User-defined title
  transcription?: string;    // Speech-to-text (future)
  uploaded: boolean;
  uploadUrl?: string;
}

export interface RecordingStatus {
  isRecording: boolean;
  isPaused: boolean;
  currentTime: number;       // Current recording time (seconds)
  maxDuration?: number;      // Max allowed duration
}

export interface RecordingConfig {
  format?: 'wav' | 'm4a' | 'webm';
  sampleRate?: number;       // 8000, 16000, 44100, 48000
  channels?: 1 | 2;          // Mono or stereo
  bitRate?: number;          // For compressed formats
  maxDuration?: number;      // Auto-stop after N seconds
}

/*
💡 INTERVIEW: Audio Recording Metadata

Q: Why store sampleRate and bitRate?
A: Essential for:
   1. Quality assessment
   2. Compression decisions
   3. Playback compatibility checks
   4. File size estimation
   5. Server-side processing
*/`,
        },
      ],
    },
    {
      id: 153,
      title: 'Audio Recorder Service',
      content: `
        <h2>Building the Audio Recorder Service</h2>
        <p>The AudioRecorderService wraps the Capacitor plugin with RxJS observables and error handling.</p>

        <h3>Core Features</h3>
        <ul>
          <li><strong>Start Recording:</strong> Begin audio capture with configuration</li>
          <li><strong>Stop Recording:</strong> End recording and return file URI</li>
          <li><strong>Pause/Resume:</strong> Pause and resume recording (platform dependent)</li>
          <li><strong>Permission Management:</strong> Check and request microphone access</li>
          <li><strong>Recording Timer:</strong> Track recording duration in real-time</li>
          <li><strong>Error Handling:</strong> User-friendly error messages</li>
        </ul>

        <h3>Native Recording APIs</h3>
        <table>
          <tr>
            <th>Platform</th>
            <th>API</th>
            <th>Default Format</th>
            <th>Background Support</th>
          </tr>
          <tr>
            <td>iOS</td>
            <td>AVAudioRecorder (AVFoundation)</td>
            <td>M4A (hardware-accelerated AAC)</td>
            <td>Yes (with config)</td>
          </tr>
          <tr>
            <td>Android</td>
            <td>MediaRecorder API</td>
            <td>M4A or WEBM</td>
            <td>Yes (foreground service)</td>
          </tr>
          <tr>
            <td>Web</td>
            <td>MediaRecorder API</td>
            <td>WebM/Opus</td>
            <td>No (tab must be active)</td>
          </tr>
        </table>

        <h3>Pause/Resume Limitations</h3>
        <ul>
          <li><strong>iOS:</strong> AVAudioRecorder supports pause/resume natively</li>
          <li><strong>Android:</strong> MediaRecorder does NOT support pause (API 24+)</li>
          <li><strong>Web:</strong> MediaRecorder.pause() available in modern browsers</li>
        </ul>
        <p><strong>Workaround for Android:</strong> Stop recording, save chunk, start new recording, merge chunks on final stop</p>

        <h3>Error Handling</h3>
        <p>Common errors and solutions:</p>
        <ul>
          <li><strong>Permission denied:</strong> Show settings link</li>
          <li><strong>Microphone busy:</strong> Another app using it</li>
          <li><strong>Storage full:</strong> Can't save recording</li>
          <li><strong>Format not supported:</strong> Fallback to different format</li>
          <li><strong>Background recording blocked:</strong> iOS needs config</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1530,
          language: 'typescript',
          title: 'Audio Recorder Service',
          copyable: true,
          code: `// src/app/core/services/audio/audio-recorder.service.ts

import { Injectable } from '@angular/core';
import { AudioRecorder } from '@capacitor-community/audio-recorder';
import { from, Observable, BehaviorSubject, throwError, interval } from 'rxjs';
import { catchError, map, takeWhile, tap } from 'rxjs/operators';
import { RecordingConfig, RecordingStatus } from '@app/features/voice-notes/models/audio-recording.model';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {
  private recordingStatus$ = new BehaviorSubject<RecordingStatus>({
    isRecording: false,
    isPaused: false,
    currentTime: 0
  });

  private recordingStartTime = 0;
  private timerSubscription?: any;

  get status$(): Observable<RecordingStatus> {
    return this.recordingStatus$.asObservable();
  }

  async checkPermissions(): Promise<boolean> {
    try {
      const result = await AudioRecorder.checkPermissions();
      return result.hasPermission;
    } catch (error) {
      console.error('Error checking audio permissions:', error);
      return false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const result = await AudioRecorder.requestPermissions();
      return result.hasPermission;
    } catch (error) {
      console.error('Error requesting audio permissions:', error);
      return false;
    }
  }

  startRecording(config?: RecordingConfig): Observable<void> {
    return from(this._startRecording(config)).pipe(
      tap(() => {
        this.recordingStartTime = Date.now();
        this.startTimer(config?.maxDuration);

        this.recordingStatus$.next({
          isRecording: true,
          isPaused: false,
          currentTime: 0,
          maxDuration: config?.maxDuration
        });
      }),
      catchError((error) => this.handleError('Failed to start recording', error))
    );
  }

  private async _startRecording(config?: RecordingConfig): Promise<void> {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) {
      const granted = await this.requestPermissions();
      if (!granted) {
        throw new Error('Microphone permission denied');
      }
    }

    await AudioRecorder.startRecording();
  }

  stopRecording(): Observable<{ uri: string; mimeType: string }> {
    return from(AudioRecorder.stopRecording()).pipe(
      map((result) => {
        this.stopTimer();

        this.recordingStatus$.next({
          isRecording: false,
          isPaused: false,
          currentTime: 0
        });

        return {
          uri: result.value.recordDataBase64 || result.value.url || '',
          mimeType: result.value.mimeType || 'audio/m4a'
        };
      }),
      catchError((error) => this.handleError('Failed to stop recording', error))
    );
  }

  private startTimer(maxDuration?: number, startTime: number = 0): void {
    let elapsed = startTime;

    this.timerSubscription = interval(100)
      .pipe(
        takeWhile(() => {
          const status = this.recordingStatus$.value;
          return status.isRecording && !status.isPaused;
        })
      )
      .subscribe(() => {
        elapsed = (Date.now() - this.recordingStartTime) / 1000 + startTime;

        this.recordingStatus$.next({
          ...this.recordingStatus$.value,
          currentTime: elapsed
        });

        if (maxDuration && elapsed >= maxDuration) {
          this.stopRecording().subscribe();
        }
      });
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);

    let userMessage = message;

    if (error.message?.includes('permission')) {
      userMessage = 'Microphone permission denied. Please enable in Settings.';
    } else if (error.message?.includes('busy')) {
      userMessage = 'Microphone is busy. Close other apps using audio.';
    }

    return throwError(() => new Error(userMessage));
  }
}`,
        },
        {
          id: 1531,
          language: 'typescript',
          title: 'Using Audio Recorder Service',
          copyable: true,
          code: `// Example: Voice recorder component usage

import { Component } from '@angular/core';
import { AudioRecorderService } from '@app/core/services/audio/audio-recorder.service';

export class VoiceRecorderComponent {
  recordingStatus$ = this.audioRecorder.status$;

  constructor(private audioRecorder: AudioRecorderService) {}

  async startRecording(): Promise<void> {
    const hasPermission = await this.audioRecorder.checkPermissions();

    if (!hasPermission) {
      const granted = await this.audioRecorder.requestPermissions();
      if (!granted) {
        alert('Microphone permission required');
        return;
      }
    }

    this.audioRecorder.startRecording({
      maxDuration: 300, // 5 minutes max
      sampleRate: 44100,
      channels: 1 // Mono
    }).subscribe({
      next: () => console.log('Recording started'),
      error: (error) => console.error('Recording error:', error)
    });
  }

  stopRecording(): void {
    this.audioRecorder.stopRecording().subscribe({
      next: (result) => {
        console.log('Recording saved:', result.uri);
      },
      error: (error) => console.error('Stop error:', error)
    });
  }
}`,
        },
      ],
    },
    {
      id: 154,
      title: 'File System Operations',
      content: `
        <h2>Capacitor Filesystem Plugin</h2>
        <p>The Filesystem plugin provides cross-platform file operations for reading, writing, and managing files.</p>

        <h3>Storage Directories</h3>
        <table>
          <tr>
            <th>Directory</th>
            <th>iOS</th>
            <th>Android</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>DOCUMENTS</td>
            <td>User-visible, iCloud backup</td>
            <td>Internal app storage</td>
            <td>Audio recordings (user wants to keep)</td>
          </tr>
          <tr>
            <td>DATA</td>
            <td>Library/Application Support</td>
            <td>Internal files</td>
            <td>App config (private, backed up)</td>
          </tr>
          <tr>
            <td>CACHE</td>
            <td>Library/Caches</td>
            <td>Cache directory</td>
            <td>Temp processing (can be cleared)</td>
          </tr>
          <tr>
            <td>EXTERNAL</td>
            <td>N/A</td>
            <td>Public external storage</td>
            <td>Shared files (deprecated API 29+)</td>
          </tr>
        </table>

        <h3>File Operations</h3>
        <ul>
          <li><strong>writeFile:</strong> Write text or binary data to file</li>
          <li><strong>readFile:</strong> Read file as string or Base64</li>
          <li><strong>deleteFile:</strong> Remove file from storage</li>
          <li><strong>readdir:</strong> List files in directory</li>
          <li><strong>mkdir:</strong> Create directory (with recursive option)</li>
          <li><strong>rmdir:</strong> Delete directory and contents</li>
          <li><strong>stat:</strong> Get file metadata (size, timestamps)</li>
          <li><strong>copy:</strong> Copy file to new location</li>
          <li><strong>rename:</strong> Rename or move file</li>
        </ul>

        <h3>File Writing Strategies</h3>
        <table>
          <tr>
            <th>Data Type</th>
            <th>Format</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Text</td>
            <td>String</td>
            <td>Text files, JSON, XML, CSV</td>
          </tr>
          <tr>
            <td>Binary</td>
            <td>Base64</td>
            <td>Audio, images, video</td>
          </tr>
        </table>

        <h3>Best Practices</h3>
        <ul>
          <li>Always use appropriate directory for file type</li>
          <li>Handle platform differences (iOS strict permissions, Android scoped storage)</li>
          <li>Clean up temporary files regularly</li>
          <li>Check storage space before writing</li>
          <li>Validate paths and handle permission errors</li>
          <li>Don't store sensitive data in EXTERNAL directory</li>
          <li>Encrypt sensitive files</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1540,
          language: 'typescript',
          title: 'File Metadata Model',
          copyable: true,
          code: `// src/app/features/voice-notes/models/file-metadata.model.ts

export interface FileMetadata {
  name: string;
  path: string;
  directory: DirectoryType;
  size: number;              // Bytes
  mtime: number;             // Modified timestamp
  ctime?: number;            // Created timestamp
  uri: string;               // Full file URI
  type: 'file' | 'directory';
  extension?: string;
  mimeType?: string;
}

export type DirectoryType =
  | 'DOCUMENTS'    // App documents
  | 'DATA'         // App private data
  | 'CACHE'        // Temporary cached files
  | 'EXTERNAL'     // Public external storage (Android)
  | 'EXTERNAL_STORAGE'; // External SD card (Android)

export interface DirectoryInfo {
  path: string;
  directory: DirectoryType;
  files: FileMetadata[];
  totalSize: number;
  fileCount: number;
}`,
        },
        {
          id: 1541,
          language: 'typescript',
          title: 'Filesystem Service',
          copyable: true,
          code: `// src/app/core/services/filesystem/filesystem.service.ts

import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileMetadata, DirectoryInfo, DirectoryType } from '@app/features/voice-notes/models/file-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  writeFile(
    path: string,
    data: string | Blob,
    directory: DirectoryType = 'DOCUMENTS'
  ): Observable<{ uri: string }> {
    return from(this._writeFile(path, data, directory)).pipe(
      catchError((error) => this.handleError('Failed to write file', error))
    );
  }

  private async _writeFile(
    path: string,
    data: string | Blob,
    directory: DirectoryType
  ): Promise<{ uri: string }> {
    const dirEnum = this.getDirectoryEnum(directory);

    if (typeof data === 'string') {
      const result = await Filesystem.writeFile({
        path,
        data,
        directory: dirEnum,
        encoding: Encoding.UTF8
      });
      return { uri: result.uri };
    } else {
      const base64Data = await this.blobToBase64(data);
      const result = await Filesystem.writeFile({
        path,
        data: base64Data,
        directory: dirEnum
      });
      return { uri: result.uri };
    }
  }

  readFile(
    path: string,
    directory: DirectoryType = 'DOCUMENTS'
  ): Observable<string> {
    return from(
      Filesystem.readFile({
        path,
        directory: this.getDirectoryEnum(directory)
      })
    ).pipe(
      map((result) => result.data as string),
      catchError((error) => this.handleError('Failed to read file', error))
    );
  }

  deleteFile(
    path: string,
    directory: DirectoryType = 'DOCUMENTS'
  ): Observable<void> {
    return from(
      Filesystem.deleteFile({
        path,
        directory: this.getDirectoryEnum(directory)
      })
    ).pipe(
      map(() => undefined),
      catchError((error) => this.handleError('Failed to delete file', error))
    );
  }

  listFiles(
    path: string = '',
    directory: DirectoryType = 'DOCUMENTS'
  ): Observable<DirectoryInfo> {
    return from(
      Filesystem.readdir({
        path,
        directory: this.getDirectoryEnum(directory)
      })
    ).pipe(
      map((result) => {
        const files: FileMetadata[] = result.files.map((file) => ({
          name: file.name,
          path: path ? \`\${path}/\${file.name}\` : file.name,
          directory,
          size: file.size || 0,
          mtime: file.mtime || Date.now(),
          ctime: file.ctime,
          uri: file.uri || '',
          type: file.type,
          extension: this.getFileExtension(file.name),
          mimeType: this.getMimeType(file.name)
        }));

        const totalSize = files.reduce((sum, f) => sum + f.size, 0);

        return {
          path,
          directory,
          files,
          totalSize,
          fileCount: files.length
        };
      }),
      catchError((error) => this.handleError('Failed to list files', error))
    );
  }

  private getDirectoryEnum(directory: DirectoryType): Directory {
    const dirMap: Record<DirectoryType, Directory> = {
      DOCUMENTS: Directory.Documents,
      DATA: Directory.Data,
      CACHE: Directory.Cache,
      EXTERNAL: Directory.External,
      EXTERNAL_STORAGE: Directory.ExternalStorage
    };
    return dirMap[directory];
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()! : '';
  }

  private getMimeType(filename: string): string {
    const ext = this.getFileExtension(filename).toLowerCase();
    const mimeTypes: Record<string, string> = {
      'mp3': 'audio/mpeg',
      'm4a': 'audio/mp4',
      'wav': 'audio/wav',
      'webm': 'audio/webm',
      'ogg': 'audio/ogg'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    let userMessage = message;

    if (error.message?.includes('not found')) {
      userMessage = 'File or directory not found';
    } else if (error.message?.includes('permission')) {
      userMessage = 'Permission denied. Check storage permissions.';
    }

    return throwError(() => new Error(userMessage));
  }
}`,
        },
      ],
    },
    {
      id: 155,
      title: 'Voice Notes Service & Components',
      content: `
        <h2>Building Voice Notes Application</h2>
        <p>Combine audio recording and file system services to create a complete voice notes application.</p>

        <h3>Voice Notes Features</h3>
        <ul>
          <li><strong>Record Voice Notes:</strong> Start/stop recording with timer</li>
          <li><strong>Manage Recordings:</strong> List, play, delete recordings</li>
          <li><strong>Upload to Server:</strong> Compress and upload audio files</li>
          <li><strong>File Management:</strong> Organize recordings in folders</li>
          <li><strong>Storage Tracking:</strong> Monitor storage usage</li>
          <li><strong>Offline Support:</strong> Record and store locally when offline</li>
        </ul>

        <h3>Component Architecture</h3>
        <ul>
          <li><strong>Audio Recorder Component:</strong> Recording controls and timer display</li>
          <li><strong>Audio Player Component:</strong> Playback controls with progress bar</li>
          <li><strong>File Browser Component:</strong> Navigate and manage recordings</li>
          <li><strong>Voice Notes Page:</strong> Main page with recorder and list</li>
        </ul>

        <h3>Upload Flow</h3>
        <pre><code>1. User records audio
2. Save to filesystem (DOCUMENTS directory)
3. Convert to Blob for upload
4. Compress audio (optional)
5. Upload to server via FormData
6. Update metadata with server URL
7. Mark as uploaded
8. Clean up local file (optional)</code></pre>

        <h3>State Management</h3>
        <p>Use RxJS BehaviorSubject for reactive state:</p>
        <ul>
          <li>Recording status (isRecording, currentTime)</li>
          <li>List of recordings (observable)</li>
          <li>Upload progress for each recording</li>
          <li>Storage usage statistics</li>
        </ul>

        <h3>User Experience Best Practices</h3>
        <ul>
          <li>Show recording timer with visual feedback</li>
          <li>Display waveform during recording (optional)</li>
          <li>Confirm before deleting recordings</li>
          <li>Show upload progress with percentage</li>
          <li>Handle interruptions (phone calls, notifications)</li>
          <li>Save partial recordings on errors</li>
          <li>Provide playback speed controls (1x, 1.5x, 2x)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1550,
          language: 'typescript',
          title: 'Voice Notes Service',
          copyable: true,
          code: `// src/app/features/voice-notes/services/voice-notes.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AudioRecorderService } from '@app/core/services/audio/audio-recorder.service';
import { FilesystemService } from '@app/core/services/filesystem/filesystem.service';
import { HttpClient } from '@angular/common/http';
import { AudioRecording } from '../models/audio-recording.model';

@Injectable({
  providedIn: 'root'
})
export class VoiceNotesService {
  private recordingsSubject = new BehaviorSubject<AudioRecording[]>([]);
  public recordings$ = this.recordingsSubject.asObservable();

  constructor(
    private audioRecorder: AudioRecorderService,
    private filesystem: FilesystemService,
    private http: HttpClient
  ) {
    this.loadRecordings();
  }

  startRecording(): Observable<void> {
    return this.audioRecorder.startRecording({
      maxDuration: 600, // 10 minutes
      sampleRate: 44100,
      channels: 1
    });
  }

  stopRecording(): Observable<AudioRecording> {
    return this.audioRecorder.stopRecording().pipe(
      switchMap((result) => this.saveRecording(result)),
      tap((recording) => this.addToList(recording))
    );
  }

  private async saveRecording(result: { uri: string; mimeType: string }): Promise<AudioRecording> {
    const filename = \`recording_\${Date.now()}.m4a\`;

    // Save metadata
    const recording: AudioRecording = {
      id: this.generateId(),
      filename,
      filepath: result.uri,
      duration: 0, // Would need to calculate from audio
      size: 0, // Would need to get from file stats
      format: 'm4a',
      sampleRate: 44100,
      channels: 1,
      mimeType: result.mimeType,
      createdAt: Date.now(),
      uploaded: false
    };

    return recording;
  }

  uploadRecording(recording: AudioRecording): Observable<{ url: string }> {
    return this.filesystem.readFile(recording.filepath).pipe(
      switchMap((base64Data) => {
        const blob = this.base64ToBlob(base64Data, recording.mimeType);
        const formData = new FormData();
        formData.append('audio', blob, recording.filename);

        return this.http.post<{ url: string }>('/api/audio/upload', formData);
      }),
      tap((response) => {
        this.updateRecording(recording.id, {
          uploaded: true,
          uploadUrl: response.url
        });
      })
    );
  }

  deleteRecording(id: string): Observable<void> {
    const recording = this.recordingsSubject.value.find(r => r.id === id);
    if (!recording) {
      return from(Promise.resolve());
    }

    return this.filesystem.deleteFile(recording.filepath).pipe(
      tap(() => {
        const recordings = this.recordingsSubject.value.filter(r => r.id !== id);
        this.recordingsSubject.next(recordings);
        this.saveRecordings();
      })
    );
  }

  private addToList(recording: AudioRecording): void {
    const recordings = [recording, ...this.recordingsSubject.value];
    this.recordingsSubject.next(recordings);
    this.saveRecordings();
  }

  private updateRecording(id: string, updates: Partial<AudioRecording>): void {
    const recordings = this.recordingsSubject.value.map(r =>
      r.id === id ? { ...r, ...updates } : r
    );
    this.recordingsSubject.next(recordings);
    this.saveRecordings();
  }

  private async saveRecordings(): Promise<void> {
    // Save to preferences or local storage
    const json = JSON.stringify(this.recordingsSubject.value);
    await this.filesystem.writeFile('recordings.json', json, 'DATA').toPromise();
  }

  private async loadRecordings(): Promise<void> {
    try {
      const json = await this.filesystem.readFile('recordings.json', 'DATA').toPromise();
      const recordings = JSON.parse(json) as AudioRecording[];
      this.recordingsSubject.next(recordings);
    } catch {
      // No saved recordings
    }
  }

  private generateId(): string {
    return \`rec_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }

  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
}`,
        },
        {
          id: 1551,
          language: 'typescript',
          title: 'Voice Recorder Component',
          copyable: true,
          code: `// src/app/features/voice-notes/components/audio-recorder/audio-recorder.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VoiceNotesService } from '../../services/voice-notes.service';
import { AudioRecorderService } from '@app/core/services/audio/audio-recorder.service';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: \`
    <ion-card>
      <ion-card-content>
        <div class="recorder-controls">
          <ion-button
            *ngIf="!(status$ | async)?.isRecording"
            expand="block"
            color="danger"
            (click)="startRecording()">
            <ion-icon slot="start" name="mic-outline"></ion-icon>
            Start Recording
          </ion-button>

          <ion-button
            *ngIf="(status$ | async)?.isRecording"
            expand="block"
            color="medium"
            (click)="stopRecording()">
            <ion-icon slot="start" name="stop-outline"></ion-icon>
            Stop Recording
          </ion-button>

          <div class="timer" *ngIf="(status$ | async)?.isRecording">
            {{ formatTime((status$ | async)?.currentTime || 0) }}
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  \`,
  styles: [\`
    .recorder-controls {
      text-align: center;
    }
    .timer {
      font-size: 2rem;
      font-weight: bold;
      margin-top: 1rem;
      color: var(--ion-color-danger);
    }
  \`]
})
export class AudioRecorderComponent {
  status$ = this.audioRecorder.status$;

  constructor(
    private voiceNotes: VoiceNotesService,
    private audioRecorder: AudioRecorderService
  ) {}

  startRecording(): void {
    this.voiceNotes.startRecording().subscribe({
      next: () => console.log('Recording started'),
      error: (error) => console.error('Error:', error)
    });
  }

  stopRecording(): void {
    this.voiceNotes.stopRecording().subscribe({
      next: (recording) => console.log('Saved:', recording),
      error: (error) => console.error('Error:', error)
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  }
}`,
        },
      ],
    },
    {
      id: 156,
      title: 'Testing & Troubleshooting',
      content: `
        <h2>Testing Audio Recording Features</h2>
        <p>Comprehensive testing checklist for audio recording and file management.</p>

        <h3>Testing Checklist</h3>
        <ul>
          <li><strong>iOS Device:</strong> Test microphone permission, background recording, interruptions</li>
          <li><strong>Android Device:</strong> Test runtime permissions, different Android versions</li>
          <li><strong>Web Browser:</strong> Test file input fallback (Chrome, Safari, Firefox)</li>
          <li><strong>Permissions:</strong> Test denied, granted, and prompt states</li>
          <li><strong>Recording Quality:</strong> Test different sample rates and formats</li>
          <li><strong>File Operations:</strong> Test create, read, delete, list operations</li>
          <li><strong>Upload:</strong> Test with various file sizes and network conditions</li>
          <li><strong>Offline:</strong> Test recording when offline</li>
          <li><strong>Error Handling:</strong> Test all error scenarios</li>
        </ul>

        <h3>Common Issues & Solutions</h3>
        <table>
          <tr>
            <th>Issue</th>
            <th>Cause</th>
            <th>Solution</th>
          </tr>
          <tr>
            <td>Recording not working on iOS</td>
            <td>Missing Info.plist permissions</td>
            <td>Add NSMicrophoneUsageDescription, rebuild app</td>
          </tr>
          <tr>
            <td>Audio files not saved</td>
            <td>Insufficient storage or permissions</td>
            <td>Check storage space, verify write permissions</td>
          </tr>
          <tr>
            <td>Upload fails with large files</td>
            <td>File too large for server</td>
            <td>Compress audio before upload, increase server limits</td>
          </tr>
          <tr>
            <td>Recording stops on phone call</td>
            <td>Audio session interrupted</td>
            <td>Save partial recording, resume after interruption</td>
          </tr>
          <tr>
            <td>Web recording not working</td>
            <td>Not HTTPS or browser unsupported</td>
            <td>Use HTTPS, provide file input fallback</td>
          </tr>
        </table>

        <h3>Platform-Specific Issues</h3>
        <h4>iOS</h4>
        <ul>
          <li>Background recording requires UIBackgroundModes in Info.plist</li>
          <li>Audio interruptions from phone calls need handling</li>
          <li>File paths change between app launches (use relative paths)</li>
        </ul>

        <h4>Android</h4>
        <ul>
          <li>Android 13+ requires READ_MEDIA_AUDIO permission</li>
          <li>Foreground service notification needed for background recording</li>
          <li>Scoped storage (API 29+) restricts external storage access</li>
        </ul>

        <h4>Web</h4>
        <ul>
          <li>HTTPS required for getUserMedia()</li>
          <li>Browser compatibility varies for MediaRecorder API</li>
          <li>Storage quota limits (~50MB-1GB depending on browser)</li>
        </ul>

        <h3>Debugging Tips</h3>
        <ul>
          <li>Use Chrome DevTools Remote Debugging for mobile</li>
          <li>Check Xcode console for iOS native errors</li>
          <li>Use Android Logcat for Android debugging</li>
          <li>Test with airplane mode for offline scenarios</li>
          <li>Monitor storage usage with file browser</li>
          <li>Verify file MIME types match expected format</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1560,
          language: 'typescript',
          title: 'Error Handling Best Practices',
          copyable: true,
          code: `// Comprehensive error handling for audio recording

export class VoiceRecorderComponent {
  async startRecording(): Promise<void> {
    try {
      // 1. Check if plugin is available
      if (!Capacitor.isPluginAvailable('AudioRecorder')) {
        throw new Error('Audio recording not supported on this platform');
      }

      // 2. Check permissions
      const hasPermission = await this.audioRecorder.checkPermissions();
      if (!hasPermission) {
        const granted = await this.audioRecorder.requestPermissions();
        if (!granted) {
          this.showPermissionDeniedAlert();
          return;
        }
      }

      // 3. Check storage space
      const hasSpace = await this.checkStorageSpace();
      if (!hasSpace) {
        this.showStorageFullAlert();
        return;
      }

      // 4. Start recording
      this.voiceNotes.startRecording().subscribe({
        next: () => console.log('Recording started'),
        error: (error) => this.handleRecordingError(error)
      });

    } catch (error: any) {
      console.error('Failed to start recording:', error);
      this.showErrorAlert(error.message);
    }
  }

  private async checkStorageSpace(): Promise<boolean> {
    // Check if at least 10MB free
    const minFreeSpace = 10 * 1024 * 1024; // 10 MB
    // Implementation would use Filesystem.stat or similar
    return true; // Simplified
  }

  private handleRecordingError(error: Error): void {
    if (error.message.includes('permission')) {
      this.showPermissionDeniedAlert();
    } else if (error.message.includes('busy')) {
      this.showMicrophoneBusyAlert();
    } else if (error.message.includes('space')) {
      this.showStorageFullAlert();
    } else {
      this.showErrorAlert(error.message);
    }
  }

  private async showPermissionDeniedAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Permission Required',
      message: 'Microphone access is required to record audio. Please enable it in Settings.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Open Settings', handler: () => this.openAppSettings() }
      ]
    });
    await alert.present();
  }

  private async openAppSettings(): Promise<void> {
    // Use Capacitor App plugin to open settings
    // await App.openUrl({ url: 'app-settings:' });
  }
}`,
        },
      ],
    },
  ],
};
