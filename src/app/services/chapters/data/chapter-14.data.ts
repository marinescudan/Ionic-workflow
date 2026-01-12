// src/app/services/chapters/data/chapter-14.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_14_DATA: Chapter = {
  id: 14,
  title: 'Native Device APIs - Camera',
  description: 'Master native camera integration with Capacitor, photo management, and cross-platform image handling',
  icon: 'camera-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 140,
      title: 'Capacitor Fundamentals',
      content: `
        <h2>Understanding Capacitor</h2>
        <p>Capacitor is Ionic's official native runtime that provides a modern approach to building native iOS, Android, and Progressive Web Apps from a single codebase.</p>

        <h3>Capacitor vs Cordova</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>Cordova</th>
            <th>Capacitor</th>
          </tr>
          <tr>
            <td>Native Project</td>
            <td>Generated on build, not committed</td>
            <td>Source-controlled, customizable</td>
          </tr>
          <tr>
            <td>Plugin Management</td>
            <td>XML config, CLI-based</td>
            <td>npm packages, native managers</td>
          </tr>
          <tr>
            <td>API Style</td>
            <td>Callbacks</td>
            <td>Promises/Async-await</td>
          </tr>
          <tr>
            <td>Web Platform</td>
            <td>Not prioritized</td>
            <td>First-class citizen</td>
          </tr>
          <tr>
            <td>Native Code Access</td>
            <td>Difficult</td>
            <td>Easy to customize</td>
          </tr>
        </table>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Native APIs:</strong> Access device features (camera, geolocation, storage)</li>
          <li><strong>Plugin System:</strong> Official and community plugins</li>
          <li><strong>Web-first:</strong> Progressive Web App by default</li>
          <li><strong>Modern Tooling:</strong> TypeScript, npm, native IDEs</li>
          <li><strong>Cross-platform:</strong> Write once, run on iOS, Android, Web</li>
        </ul>

        <h3>Capacitor Architecture</h3>
        <pre><code>Your Ionic/Angular App (TypeScript)
                ↓
        Capacitor Runtime (Bridge)
                ↓
        ┌───────────┴───────────┐
        ↓                       ↓
    iOS App              Android App
  (Swift/ObjC)           (Kotlin/Java)</code></pre>

        <h3>Why Choose Capacitor?</h3>
        <ul>
          <li>Modern development experience with TypeScript</li>
          <li>Better integration with web frameworks</li>
          <li>Easier native customization</li>
          <li>Active development and community</li>
          <li>Backward compatible with most Cordova plugins</li>
          <li>PWA is a first-class target</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1400,
          language: 'typescript',
          title: 'Capacitor Plugin Communication',
          copyable: true,
          code: `/**
 * How Capacitor Plugins Work
 *
 * 💡 INTERVIEW: Capacitor uses a JavaScript bridge to communicate
 * between web code and native platform code
 */

import { Camera, CameraResultType } from '@capacitor/camera';

// 1. Your TypeScript code calls the plugin
const photo = await Camera.getPhoto({
  quality: 90,
  allowEditing: false,
  resultType: CameraResultType.Uri,
});

// 2. Capacitor JavaScript bridge sends message to native layer

// 3. Native platform code (Swift/Kotlin) executes camera operation

// 4. Native code returns result through bridge

// 5. Promise resolves with photo data

/**
 * Key Concepts:
 * - Plugins are npm packages
 * - Work across web, iOS, and Android
 * - TypeScript definitions included
 * - Can create custom plugins
 * - Platform-specific implementations
 */`,
        },
      ],
    },
    {
      id: 141,
      title: 'Camera Plugin Installation',
      content: `
        <h2>Installing the Camera Plugin</h2>
        <p>The @capacitor/camera plugin provides a unified API for accessing the device camera across all platforms.</p>

        <h3>Installation Steps</h3>
        <pre><code># Install @capacitor/camera plugin
npm install @capacitor/camera

# Sync native projects (iOS and Android)
npx cap sync

# 💡 Always run 'cap sync' after installing plugins</code></pre>

        <h3>Platform Requirements</h3>
        <table>
          <tr>
            <th>Platform</th>
            <th>Requirements</th>
          </tr>
          <tr>
            <td>iOS</td>
            <td>Info.plist usage descriptions, automatic permission prompts</td>
          </tr>
          <tr>
            <td>Android</td>
            <td>AndroidManifest.xml permissions, runtime permission handling</td>
          </tr>
          <tr>
            <td>Web</td>
            <td>HTTPS required for getUserMedia(), file input fallback</td>
          </tr>
        </table>

        <h3>iOS Configuration (Info.plist)</h3>
        <pre><code>&lt;!-- Camera access permission --&gt;
&lt;key&gt;NSCameraUsageDescription&lt;/key&gt;
&lt;string&gt;This app uses the camera to capture photos.&lt;/string&gt;

&lt;!-- Photo library access --&gt;
&lt;key&gt;NSPhotoLibraryUsageDescription&lt;/key&gt;
&lt;string&gt;This app needs access to your photo library.&lt;/string&gt;

&lt;!-- Save to photo library --&gt;
&lt;key&gt;NSPhotoLibraryAddUsageDescription&lt;/key&gt;
&lt;string&gt;This app needs to save photos to your library.&lt;/string&gt;</code></pre>

        <h3>Android Configuration</h3>
        <pre><code>&lt;!-- Camera permission --&gt;
&lt;uses-permission android:name="android.permission.CAMERA" /&gt;

&lt;!-- Storage permissions --&gt;
&lt;uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/&gt;
&lt;uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
                 android:maxSdkVersion="32" /&gt;

&lt;!-- For Android 13+ --&gt;
&lt;uses-permission android:name="android.permission.READ_MEDIA_IMAGES" /&gt;</code></pre>

        <h3>Best Practices</h3>
        <ul>
          <li>Always add clear, honest usage descriptions for iOS</li>
          <li>Check permissions before accessing camera</li>
          <li>Provide fallback for web platform</li>
          <li>Test on all target platforms (iOS, Android, Web)</li>
          <li>Handle permission denial gracefully</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1410,
          language: 'typescript',
          title: 'Capacitor Configuration',
          copyable: true,
          code: `// capacitor.config.ts

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ionicworkflow',
  appName: 'Ionic Workflow',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    Camera: {
      // iOS-specific settings
      ios: {
        presentationStyle: 'fullscreen',
      },
      // Android-specific settings
      android: {
        // Use legacy file provider if needed
        // legacyFileProvider: true,
      },
    },
  },
};

export default config;

/**
 * 💡 INTERVIEW: Capacitor config allows plugin-specific settings
 * - Centralized configuration
 * - Platform-specific overrides
 * - Type-safe with TypeScript
 */`,
        },
      ],
    },
    {
      id: 142,
      title: 'Camera Service Implementation',
      content: `
        <h2>Building the Camera Service</h2>
        <p>The CameraService wraps the Capacitor Camera plugin with RxJS observables and error handling for better Angular integration.</p>

        <h3>Core Features</h3>
        <ul>
          <li><strong>Take Photo:</strong> Capture photo with device camera</li>
          <li><strong>Select from Gallery:</strong> Choose existing photo</li>
          <li><strong>Prompt User:</strong> Show action sheet to choose source</li>
          <li><strong>Permission Management:</strong> Check and request permissions</li>
          <li><strong>Format Conversion:</strong> Convert to Base64, File, Blob</li>
          <li><strong>Error Handling:</strong> User-friendly error messages</li>
        </ul>

        <h3>Camera Result Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Returns</th>
            <th>Best For</th>
          </tr>
          <tr>
            <td>Uri</td>
            <td>file:// or content:// path</td>
            <td>Display, smallest memory</td>
          </tr>
          <tr>
            <td>Base64</td>
            <td>Base64 string</td>
            <td>Direct upload to API</td>
          </tr>
          <tr>
            <td>DataUrl</td>
            <td>data:image/jpeg;base64,...</td>
            <td>Display and store</td>
          </tr>
        </table>

        <h3>Permission States</h3>
        <ul>
          <li><strong>granted:</strong> Permission allowed, can use camera</li>
          <li><strong>denied:</strong> Permission denied, guide user to settings</li>
          <li><strong>prompt:</strong> Not yet requested, can request permission</li>
        </ul>

        <h3>Platform Detection</h3>
        <p>Use Capacitor utilities to detect platform and plugin availability:</p>
        <ul>
          <li><code>Capacitor.getPlatform()</code> - Returns 'ios', 'android', or 'web'</li>
          <li><code>Capacitor.isNativePlatform()</code> - Check if native</li>
          <li><code>Capacitor.isPluginAvailable()</code> - Check plugin availability</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1420,
          language: 'typescript',
          title: 'Camera Service',
          copyable: true,
          code: `// src/app/core/services/camera/camera.service.ts

import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  /**
   * Take a photo with the camera
   */
  takePhoto(options?: {
    quality?: number;
    allowEditing?: boolean;
  }): Observable<Photo> {
    return from(
      Camera.getPhoto({
        quality: options?.quality ?? 90,
        allowEditing: options?.allowEditing ?? false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        correctOrientation: true,
      })
    ).pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Select photo from gallery
   */
  selectFromGallery(): Observable<Photo> {
    return from(
      Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      })
    ).pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Check camera permissions
   */
  async checkPermissions() {
    const permissions = await Camera.checkPermissions();
    return {
      camera: permissions.camera,
      photos: permissions.photos,
    };
  }

  /**
   * Request camera permissions
   */
  async requestPermissions() {
    return await Camera.requestPermissions();
  }

  /**
   * Convert photo to Base64
   */
  async convertToBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private handleError(error: any): Observable<never> {
    let message = 'An error occurred';

    if (error.message?.includes('cancelled')) {
      message = 'Photo selection cancelled';
    } else if (error.message?.includes('permission')) {
      message = 'Camera permission denied';
    }

    return throwError(() => new Error(message));
  }
}`,
        },
        {
          id: 1421,
          language: 'typescript',
          title: 'Using Camera Service',
          copyable: true,
          code: `// Example: Using Camera Service in a Component

export class PhotoComponent {
  constructor(private cameraService: CameraService) {}

  async takePicture() {
    // 1. Check permissions
    const permissions = await this.cameraService.checkPermissions();

    if (permissions.camera !== 'granted') {
      await this.cameraService.requestPermissions();
    }

    // 2. Take photo
    this.cameraService.takePhoto({ quality: 90 }).subscribe({
      next: async (photo) => {
        console.log('Photo captured:', photo.webPath);

        // 3. Convert to Base64 for upload
        const base64 = await this.cameraService.convertToBase64(photo);
        console.log('Base64:', base64.substring(0, 50) + '...');
      },
      error: (error) => {
        console.error('Camera error:', error.message);
      },
    });
  }
}`,
        },
      ],
    },
    {
      id: 143,
      title: 'Image Compression & Optimization',
      content: `
        <h2>Image Processing</h2>
        <p>Compressing and optimizing images before upload is critical for mobile apps to reduce bandwidth, improve upload speed, and lower server costs.</p>

        <h3>Why Compress Images?</h3>
        <ul>
          <li><strong>Reduce Upload Time:</strong> Smaller files upload faster</li>
          <li><strong>Save Bandwidth:</strong> Lower data usage for users</li>
          <li><strong>Reduce Server Costs:</strong> Less storage and bandwidth</li>
          <li><strong>Improve UX:</strong> Faster processing and better experience</li>
        </ul>

        <h3>Compression Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Description</th>
            <th>Impact</th>
          </tr>
          <tr>
            <td>Resize Dimensions</td>
            <td>Reduce width/height to max needed</td>
            <td>70-90% size reduction</td>
          </tr>
          <tr>
            <td>Adjust Quality</td>
            <td>Lower JPEG quality (80-90%)</td>
            <td>30-50% size reduction</td>
          </tr>
          <tr>
            <td>Format Conversion</td>
            <td>Convert to efficient format (WebP)</td>
            <td>20-30% size reduction</td>
          </tr>
          <tr>
            <td>Strip Metadata</td>
            <td>Remove EXIF data</td>
            <td>5-10% size reduction + privacy</td>
          </tr>
        </table>

        <h3>Recommended Settings</h3>
        <ul>
          <li><strong>Max Dimensions:</strong> 1920x1920 (suitable for most screens)</li>
          <li><strong>Quality:</strong> 85% (imperceptible quality loss)</li>
          <li><strong>Format:</strong> JPEG for photos, PNG for graphics</li>
          <li><strong>Aspect Ratio:</strong> Always preserve original ratio</li>
        </ul>

        <h3>Image Format Comparison</h3>
        <table>
          <tr>
            <th>Format</th>
            <th>Compression</th>
            <th>Transparency</th>
            <th>Best For</th>
          </tr>
          <tr>
            <td>JPEG</td>
            <td>Good</td>
            <td>No</td>
            <td>Photos, complex images</td>
          </tr>
          <tr>
            <td>PNG</td>
            <td>Fair</td>
            <td>Yes</td>
            <td>Graphics, logos</td>
          </tr>
          <tr>
            <td>WebP</td>
            <td>Excellent</td>
            <td>Yes</td>
            <td>All (when supported)</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1430,
          language: 'typescript',
          title: 'Image Compression Service',
          copyable: true,
          code: `// src/app/core/services/camera/image-compression.service.ts

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageCompressionService {
  /**
   * Compress image to specified quality and dimensions
   */
  async compressImage(
    file: File | Blob,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      mimeType?: string;
    } = {}
  ): Promise<Blob> {
    const {
      maxWidth = 1920,
      maxHeight = 1920,
      quality = 0.85,
      mimeType = 'image/jpeg',
    } = options;

    // 1. Load image
    const img = await this.loadImage(file);

    // 2. Calculate new dimensions (preserve aspect ratio)
    const { width, height } = this.calculateDimensions(
      img.width,
      img.height,
      maxWidth,
      maxHeight
    );

    // 3. Create canvas and draw resized image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);

    // 4. Convert to compressed blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
        },
        mimeType,
        quality
      );
    });
  }

  private loadImage(file: File | Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private calculateDimensions(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    if (width <= maxWidth && height <= maxHeight) {
      return { width, height };
    }

    const aspectRatio = width / height;

    if (width > height) {
      width = maxWidth;
      height = Math.round(width / aspectRatio);
    } else {
      height = maxHeight;
      width = Math.round(height * aspectRatio);
    }

    return { width, height };
  }
}`,
        },
      ],
    },
    {
      id: 144,
      title: 'Photo Management',
      content: `
        <h2>Managing Photos</h2>
        <p>The PhotoService manages the photo collection, handles uploads, and persists data using Capacitor Preferences.</p>

        <h3>Photo Service Features</h3>
        <ul>
          <li><strong>Collection Management:</strong> Add, delete, and organize photos</li>
          <li><strong>Local Persistence:</strong> Save photo metadata to storage</li>
          <li><strong>Upload Management:</strong> Compress and upload to server</li>
          <li><strong>State Management:</strong> Track upload status and errors</li>
          <li><strong>Observable Pattern:</strong> Reactive updates with RxJS</li>
        </ul>

        <h3>Photo Model</h3>
        <p>Separate from Capacitor's Photo type for additional metadata:</p>
        <ul>
          <li><strong>id:</strong> Unique identifier</li>
          <li><strong>filepath:</strong> Local file path</li>
          <li><strong>webviewPath:</strong> Web-accessible path for display</li>
          <li><strong>timestamp:</strong> When photo was captured</li>
          <li><strong>uploaded:</strong> Upload status</li>
          <li><strong>uploadUrl:</strong> Server URL after successful upload</li>
        </ul>

        <h3>Storage Strategy</h3>
        <table>
          <tr>
            <th>Data</th>
            <th>Storage Location</th>
            <th>Reason</th>
          </tr>
          <tr>
            <td>Photo Metadata</td>
            <td>Capacitor Preferences</td>
            <td>Cross-platform, simple key-value</td>
          </tr>
          <tr>
            <td>Photo Files (native)</td>
            <td>Device filesystem</td>
            <td>Handled by OS</td>
          </tr>
          <tr>
            <td>Uploaded Photos</td>
            <td>Server (URL in metadata)</td>
            <td>Cloud storage</td>
          </tr>
        </table>

        <h3>Upload Flow</h3>
        <pre><code>1. User selects/captures photo
2. Convert to Photo model
3. Add to collection
4. Compress image
5. Upload to server (FormData)
6. Update metadata with server URL
7. Mark as uploaded
8. Save to persistent storage</code></pre>
      `,
      codeSnippets: [
        {
          id: 1440,
          language: 'typescript',
          title: 'Photo Service',
          copyable: true,
          code: `// src/app/features/photo-gallery/services/photo.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { Photo } from '../models/photo.model';
import { CameraService } from '@app/core/services/camera/camera.service';
import { HttpClient } from '@angular/common/http';

const PHOTO_STORAGE_KEY = 'photos';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private photosSubject = new BehaviorSubject<Photo[]>([]);
  public photos$ = this.photosSubject.asObservable();

  constructor(
    private cameraService: CameraService,
    private http: HttpClient
  ) {
    this.loadSavedPhotos();
  }

  /**
   * Add photo from camera
   */
  addPhotoFromCamera(): Observable<Photo> {
    return this.cameraService.takePhoto().pipe(
      switchMap((capPhoto) => this.processPhoto(capPhoto)),
      tap((photo) => this.addToCollection(photo))
    );
  }

  /**
   * Upload photo to server
   */
  uploadPhoto(photo: Photo): Observable<{ url: string }> {
    return from(this.prepareForUpload(photo)).pipe(
      switchMap((file) => {
        const formData = new FormData();
        formData.append('photo', file);

        return this.http.post<{ url: string }>(
          '/api/photos/upload',
          formData
        );
      }),
      tap((response) => {
        // Update photo with upload URL
        this.updatePhoto(photo.id, {
          uploaded: true,
          uploadUrl: response.url,
        });
      })
    );
  }

  /**
   * Delete photo
   */
  deletePhoto(photoId: string): void {
    const photos = this.photosSubject.value.filter(
      (p) => p.id !== photoId
    );
    this.photosSubject.next(photos);
    this.savePhotos();
  }

  private async processPhoto(capPhoto: any): Promise<Photo> {
    return {
      id: this.generateId(),
      filepath: capPhoto.path || '',
      webviewPath: capPhoto.webPath,
      timestamp: Date.now(),
      uploaded: false,
    };
  }

  private addToCollection(photo: Photo): void {
    const photos = [photo, ...this.photosSubject.value];
    this.photosSubject.next(photos);
    this.savePhotos();
  }

  private async savePhotos(): Promise<void> {
    await Preferences.set({
      key: PHOTO_STORAGE_KEY,
      value: JSON.stringify(this.photosSubject.value),
    });
  }

  private async loadSavedPhotos(): Promise<void> {
    const { value } = await Preferences.get({ key: PHOTO_STORAGE_KEY });
    if (value) {
      const photos = JSON.parse(value) as Photo[];
      this.photosSubject.next(photos);
    }
  }

  private generateId(): string {
    return \`photo_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }
}`,
        },
      ],
    },
    {
      id: 145,
      title: 'Photo Gallery Components',
      content: `
        <h2>Building Gallery UI</h2>
        <p>Create reusable components for photo selection, preview, and management.</p>

        <h3>Component Architecture</h3>
        <ul>
          <li><strong>Photo Picker:</strong> Button with action sheet to select source</li>
          <li><strong>Photo Preview:</strong> Display photo with upload/delete actions</li>
          <li><strong>Photo Gallery Page:</strong> Grid layout showing all photos</li>
        </ul>

        <h3>User Experience Best Practices</h3>
        <ul>
          <li>Show loading indicators during camera operations</li>
          <li>Display upload progress for each photo</li>
          <li>Confirm destructive actions (delete)</li>
          <li>Handle errors gracefully with clear messages</li>
          <li>Provide visual feedback for all actions</li>
          <li>Use action sheets for native-like selection</li>
        </ul>

        <h3>Action Sheet Pattern</h3>
        <p>Use Ionic's ActionSheet for camera/gallery selection:</p>
        <ul>
          <li>Native-like appearance on iOS and Android</li>
          <li>Clear action labels with icons</li>
          <li>Cancel option always available</li>
          <li>Destructive actions marked appropriately</li>
        </ul>

        <h3>Photo Display</h3>
        <p>Display photos using the webviewPath from Capacitor:</p>
        <pre><code>&lt;img [src]="photo.webviewPath" /&gt;</code></pre>

        <h3>Grid Layout</h3>
        <p>Use CSS Grid for responsive photo gallery:</p>
        <ul>
          <li>Auto-fill columns based on screen width</li>
          <li>Fixed aspect ratio for photos</li>
          <li>Gap between items for spacing</li>
          <li>Responsive breakpoints for mobile/tablet/desktop</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1450,
          language: 'typescript',
          title: 'Photo Picker Component',
          copyable: true,
          code: `// src/app/features/photo-gallery/components/photo-picker/photo-picker.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-picker',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: \`
    <ion-button expand="block" (click)="selectPhoto()">
      <ion-icon slot="start" name="camera-outline"></ion-icon>
      Select Photo
    </ion-button>
  \`,
})
export class PhotoPickerComponent {
  @Output() photoSelected = new EventEmitter();

  constructor(
    private photoService: PhotoService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async selectPhoto(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Photo Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera-outline',
          handler: () => this.takePhoto(),
        },
        {
          text: 'Choose from Gallery',
          icon: 'images-outline',
          handler: () => this.chooseFromGallery(),
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close-outline',
        },
      ],
    });

    await actionSheet.present();
  }

  private takePhoto(): void {
    this.photoService.addPhotoFromCamera().subscribe({
      next: (photo) => this.photoSelected.emit(photo),
      error: (error) => console.error('Camera error:', error),
    });
  }

  private chooseFromGallery(): void {
    // Implementation similar to takePhoto
  }
}`,
        },
        {
          id: 1451,
          language: 'typescript',
          title: 'Photo Gallery Page',
          copyable: true,
          code: `// src/app/features/photo-gallery/pages/photo-gallery/photo-gallery.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { PhotoPickerComponent } from '../../components/photo-picker/photo-picker.component';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, IonicModule, PhotoPickerComponent],
  template: \`
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <app-photo-picker></app-photo-picker>

        <div class="photos-grid" *ngIf="photos$ | async as photos">
          <ion-card *ngFor="let photo of photos">
            <img [src]="photo.webviewPath" />
            <ion-card-content>
              <ion-button size="small" (click)="upload(photo)">
                Upload
              </ion-button>
              <ion-button size="small" color="danger" (click)="delete(photo)">
                Delete
              </ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  \`,
  styles: [\`
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px;
    }
  \`],
})
export class PhotoGalleryPage {
  photos$: Observable<Photo[]>;

  constructor(private photoService: PhotoService) {
    this.photos$ = this.photoService.photos$;
  }

  upload(photo: Photo): void {
    this.photoService.uploadPhoto(photo).subscribe({
      next: (response) => console.log('Uploaded:', response.url),
      error: (error) => console.error('Upload failed:', error),
    });
  }

  delete(photo: Photo): void {
    this.photoService.deletePhoto(photo.id);
  }
}`,
        },
      ],
    },
    {
      id: 146,
      title: 'Web Fallback & Testing',
      content: `
        <h2>Web Platform Support</h2>
        <p>Provide fallback functionality for web platform where native camera API is not available.</p>

        <h3>Web Limitations</h3>
        <ul>
          <li>No direct native camera access</li>
          <li>HTTPS required for getUserMedia()</li>
          <li>Browser permission prompts differ from native</li>
          <li>File input is primary method for photo selection</li>
        </ul>

        <h3>Web Fallback Strategy</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>Native</th>
            <th>Web Fallback</th>
          </tr>
          <tr>
            <td>Take Photo</td>
            <td>Native camera app</td>
            <td>getUserMedia() or file input</td>
          </tr>
          <tr>
            <td>Select from Gallery</td>
            <td>Native photo picker</td>
            <td>&lt;input type="file"&gt;</td>
          </tr>
          <tr>
            <td>Multiple Selection</td>
            <td>Native multi-select</td>
            <td>&lt;input multiple&gt;</td>
          </tr>
        </table>

        <h3>Testing Checklist</h3>
        <ul>
          <li><strong>iOS Device:</strong> Test camera and photo library permissions</li>
          <li><strong>Android Device:</strong> Test runtime permission flow</li>
          <li><strong>Web Browser:</strong> Test file input fallback (Chrome, Safari, Firefox)</li>
          <li><strong>Permissions:</strong> Test denied, granted, and prompt states</li>
          <li><strong>Upload:</strong> Test with various image sizes and formats</li>
          <li><strong>Compression:</strong> Verify image quality and file size</li>
          <li><strong>Offline:</strong> Test photo capture when offline</li>
          <li><strong>Error Handling:</strong> Test all error scenarios</li>
        </ul>

        <h3>Common Issues</h3>
        <table>
          <tr>
            <th>Issue</th>
            <th>Solution</th>
          </tr>
          <tr>
            <td>Camera not working on iOS</td>
            <td>Check Info.plist permissions, rebuild app</td>
          </tr>
          <tr>
            <td>Photos not displaying on Android</td>
            <td>Check READ_EXTERNAL_STORAGE permission</td>
          </tr>
          <tr>
            <td>Upload fails with large images</td>
            <td>Compress images before upload</td>
          </tr>
          <tr>
            <td>Web fallback not working</td>
            <td>Ensure HTTPS, check browser compatibility</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1460,
          language: 'typescript',
          title: 'Web Camera Fallback',
          copyable: true,
          code: `// src/app/core/services/camera/web-camera-fallback.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebCameraFallbackService {
  /**
   * Select file using HTML input
   *
   * 💡 INTERVIEW: File input is the most reliable method on web
   */
  selectFile(options?: {
    accept?: string;
    multiple?: boolean;
  }): Observable<File[]> {
    return new Observable((observer) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = options?.accept || 'image/*';
      input.multiple = options?.multiple || false;

      input.onchange = () => {
        if (input.files && input.files.length > 0) {
          const files = Array.from(input.files);
          observer.next(files);
          observer.complete();
        } else {
          observer.error(new Error('No file selected'));
        }
      };

      input.oncancel = () => {
        observer.error(new Error('File selection cancelled'));
      };

      input.click();
    });
  }

  /**
   * Capture from webcam using getUserMedia
   *
   * 💡 INTERVIEW: Requires HTTPS in production
   */
  async captureFromWebcam(): Promise<Blob> {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      // Create video element
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;

      // Wait for video to load
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      // Capture frame to canvas
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(video, 0, 0);

      // Stop camera
      stream.getTracks().forEach((track) => track.stop());

      // Convert to blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to capture photo'));
          },
          'image/jpeg',
          0.9
        );
      });
    } catch (error) {
      console.error('Webcam error:', error);
      throw error;
    }
  }
}`,
        },
        {
          id: 1461,
          language: 'typescript',
          title: 'Platform-Aware Camera Service',
          copyable: true,
          code: `// Enhanced Camera Service with web fallback

import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class CameraService {
  constructor(
    private webFallback: WebCameraFallbackService
  ) {}

  takePhoto(): Observable<Photo> {
    // Check if native platform
    if (Capacitor.isNativePlatform()) {
      // Use native camera
      return from(
        Camera.getPhoto({
          quality: 90,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
        })
      );
    } else {
      // Use web fallback
      return this.webFallback.selectFile({
        accept: 'image/*',
        multiple: false,
      }).pipe(
        map((files) => ({
          webPath: URL.createObjectURL(files[0]),
          format: files[0].type.split('/')[1],
        }))
      );
    }
  }

  /**
   * Check if camera is available
   */
  isCameraAvailable(): boolean {
    return Capacitor.isPluginAvailable('Camera');
  }
}`,
        },
      ],
    },
  ],
};
