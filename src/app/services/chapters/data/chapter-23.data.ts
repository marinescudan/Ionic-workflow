// src/app/services/chapters/data/chapter-23.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_23_DATA: Chapter = {
  id: 23,
  title: 'QR Code & Barcode Scanner',
  description: 'Scan barcodes and QR codes with ML Kit, generate QR codes, validate checksums, and build real-world scanning applications',
  icon: 'qr-code-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 230,
      title: 'Barcode Formats & ML Kit',
      content: `
        <h2>Introduction to Barcode Scanning</h2>
        <p>Barcodes are machine-readable representations of data that enable quick and accurate data capture. From retail product scanning to event ticketing, barcodes power millions of transactions daily.</p>

        <h3>1D vs 2D Barcodes</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Dimension</th>
            <th>Capacity</th>
            <th>Examples</th>
          </tr>
          <tr>
            <td>1D (Linear)</td>
            <td>Horizontal only</td>
            <td>~20 characters</td>
            <td>EAN-13, UPC-A, Code 128</td>
          </tr>
          <tr>
            <td>2D (Matrix)</td>
            <td>Horizontal + Vertical</td>
            <td>~4,000 characters</td>
            <td>QR Code, PDF417, Data Matrix</td>
          </tr>
        </table>

        <h3>Common Barcode Formats</h3>
        <ul>
          <li><strong>QR Code:</strong> Versatile 2D code for URLs, WiFi, contacts (up to 4,296 alphanumeric characters)</li>
          <li><strong>EAN-13:</strong> Global retail standard, 13 digits with country code and checksum</li>
          <li><strong>UPC-A:</strong> North American retail standard, 12 digits</li>
          <li><strong>Code 128:</strong> High-density alphanumeric for shipping and inventory</li>
          <li><strong>PDF417:</strong> 2D stacked barcode for driver licenses and boarding passes</li>
          <li><strong>Data Matrix:</strong> Small 2D code for electronics and medical devices</li>
          <li><strong>Aztec:</strong> 2D code for transportation tickets (no quiet zone needed)</li>
        </ul>

        <h3>Google ML Kit Features</h3>
        <ul>
          <li>✅ <strong>On-Device Processing:</strong> No internet required, works offline</li>
          <li>✅ <strong>Multi-Format Support:</strong> Detects 13+ barcode formats simultaneously</li>
          <li>✅ <strong>Real-Time Detection:</strong> Processes camera frames in real-time</li>
          <li>✅ <strong>Multiple Barcodes:</strong> Detect multiple codes in single frame</li>
          <li>✅ <strong>Corner Coordinates:</strong> Get barcode position for overlay drawing</li>
          <li>✅ <strong>Cross-Platform:</strong> iOS, Android, and limited Web support</li>
          <li>✅ <strong>Accurate & Fast:</strong> Handles rotation, perspective, and varying lighting</li>
        </ul>

        <h3>Real-World Use Cases</h3>
        <ul>
          <li><strong>Retail:</strong> Product scanning, price checks, self-checkout (EAN-13, UPC-A)</li>
          <li><strong>Logistics:</strong> Package tracking, shipping labels (Code 128)</li>
          <li><strong>Events:</strong> Ticket scanning, attendee check-in (QR Code, Aztec)</li>
          <li><strong>Payments:</strong> Mobile payments, cryptocurrency wallets (QR Code)</li>
          <li><strong>Networking:</strong> WiFi connection sharing (QR Code)</li>
          <li><strong>Contacts:</strong> vCard business cards (QR Code)</li>
          <li><strong>Inventory:</strong> Asset tracking, stock management (Code 128, Data Matrix)</li>
          <li><strong>Identity:</strong> ID verification, driver licenses (PDF417)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'barcode.models.ts - Type Definitions',
          code: `// src/app/core/services/barcode/barcode.models.ts

/**
 * Barcode Format Enum
 *
 * 💡 INTERVIEW: Each format serves specific use cases
 */
export enum BarcodeFormat {
  QR_CODE = 'QR_CODE',           // Versatile 2D code
  AZTEC = 'AZTEC',               // Transportation tickets
  CODABAR = 'CODABAR',           // Libraries, blood banks
  CODE_39 = 'CODE_39',           // Automotive, defense
  CODE_93 = 'CODE_93',           // Canadian Post
  CODE_128 = 'CODE_128',         // Shipping, inventory
  DATA_MATRIX = 'DATA_MATRIX',   // Small items, electronics
  EAN_8 = 'EAN_8',               // Small retail items
  EAN_13 = 'EAN_13',             // Global retail standard
  ITF = 'ITF',                   // Cartons, pallets
  PDF_417 = 'PDF_417',           // ID cards, boarding passes
  UPC_A = 'UPC_A',               // North American retail
  UPC_E = 'UPC_E',               // Compact UPC
  UNKNOWN = 'UNKNOWN',           // Unknown format
}

/**
 * Scan Result
 */
export interface ScanResult {
  format: BarcodeFormat;         // Detected format
  rawValue: string;              // Raw barcode data
  displayValue: string;          // Formatted display value
  cornerPoints?: Point[];        // Barcode corners
  timestamp: Date;               // Scan timestamp
  valueType?: BarcodeValueType;  // Content type (for QR)
  metadata?: {
    width?: number;
    height?: number;
    orientation?: number;
  };
}

/**
 * Point Coordinate
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Barcode Value Types
 */
export enum BarcodeValueType {
  UNKNOWN = 'UNKNOWN',
  TEXT = 'TEXT',                 // Plain text
  URL = 'URL',                   // Web URL
  EMAIL = 'EMAIL',               // Email address
  PHONE = 'PHONE',               // Phone number
  SMS = 'SMS',                   // SMS message
  WIFI = 'WIFI',                 // WiFi credentials
  VCARD = 'VCARD',               // Contact info
  GEO = 'GEO',                   // Geographic coordinates
  CALENDAR_EVENT = 'CALENDAR_EVENT',
  CONTACT_INFO = 'CONTACT_INFO',
  ISBN = 'ISBN',                 // Book ISBN
  PRODUCT = 'PRODUCT',           // Product code
}

/**
 * Scanner Options
 */
export interface ScanOptions {
  formats?: BarcodeFormat[];     // Formats to detect
  lensFacing?: 'front' | 'back'; // Camera selection
  timeout?: number;              // Timeout in ms
  showTorch?: boolean;           // Show flashlight button
  continuous?: boolean;          // Continuous scan mode
  vibrate?: boolean;             // Vibrate on scan
  beep?: boolean;                // Beep on scan
}

/**
 * QR Code Generation Options
 */
export interface QRCodeOptions {
  width?: number;                // QR code width
  height?: number;               // QR code height
  margin?: number;               // Quiet zone margin
  foreground?: string;           // Dark modules color
  background?: string;           // Light modules color
  errorCorrection?: 'L' | 'M' | 'Q' | 'H';
  // L: 7% recovery
  // M: 15% recovery (default)
  // Q: 25% recovery
  // H: 30% recovery (best for outdoor/damaged)
}

/**
 * WiFi Configuration
 */
export interface WiFiConfig {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

/**
 * Contact Information (vCard)
 */
export interface Contact {
  firstName: string;
  lastName: string;
  organization?: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  note?: string;
}

/**
 * Scan History Record
 */
export interface ScanRecord {
  id: string;
  result: ScanResult;
  timestamp: Date;
  processed: boolean;
  note?: string;
  validation?: ValidationResult;
}

/**
 * Validation Result
 */
export interface ValidationResult {
  valid: boolean;
  type: BarcodeValueType;
  data: any;
  error?: string;
}`,
          description: 'Complete type definitions for barcode scanning system',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Barcode Format Comparison',
          code: `/**
 * Barcode Format Characteristics
 *
 * 💡 INTERVIEW: Choose format based on use case and data requirements
 */

interface BarcodeFormatInfo {
  format: BarcodeFormat;
  type: '1D' | '2D';
  capacity: string;
  commonUse: string;
  checksum: boolean;
  example: string;
}

const BARCODE_FORMATS: BarcodeFormatInfo[] = [
  {
    format: BarcodeFormat.QR_CODE,
    type: '2D',
    capacity: '4,296 alphanumeric',
    commonUse: 'URLs, WiFi, vCards, payments',
    checksum: true,
    example: 'https://example.com',
  },
  {
    format: BarcodeFormat.EAN_13,
    type: '1D',
    capacity: '13 digits',
    commonUse: 'Global retail products',
    checksum: true,
    example: '5901234123457',
  },
  {
    format: BarcodeFormat.UPC_A,
    type: '1D',
    capacity: '12 digits',
    commonUse: 'North American retail',
    checksum: true,
    example: '012345678905',
  },
  {
    format: BarcodeFormat.CODE_128,
    type: '1D',
    capacity: 'Variable alphanumeric',
    commonUse: 'Shipping, inventory',
    checksum: true,
    example: 'SHIP123456789',
  },
  {
    format: BarcodeFormat.PDF_417,
    type: '2D',
    capacity: '1,850 alphanumeric',
    commonUse: 'Driver licenses, boarding passes',
    checksum: true,
    example: 'DL|ANSI 636000...',
  },
  {
    format: BarcodeFormat.DATA_MATRIX,
    type: '2D',
    capacity: '2,335 alphanumeric',
    commonUse: 'Small items, electronics',
    checksum: true,
    example: 'SN:ABC123456',
  },
  {
    format: BarcodeFormat.AZTEC,
    type: '2D',
    capacity: '3,832 numeric',
    commonUse: 'Transportation tickets',
    checksum: true,
    example: 'TICKET:XYZ789',
  },
];

/**
 * QR Code Error Correction Levels
 *
 * 💡 INTERVIEW: Higher error correction = more damage tolerance
 */
interface ErrorCorrectionLevel {
  level: 'L' | 'M' | 'Q' | 'H';
  recovery: string;
  usage: string;
  overhead: string;
}

const ERROR_CORRECTION_LEVELS: ErrorCorrectionLevel[] = [
  {
    level: 'L',
    recovery: '7%',
    usage: 'Clean indoor environments',
    overhead: 'Lowest (most data capacity)',
  },
  {
    level: 'M',
    recovery: '15%',
    usage: 'General purpose (default)',
    overhead: 'Low-medium',
  },
  {
    level: 'Q',
    recovery: '25%',
    usage: 'Industrial, outdoor',
    overhead: 'Medium-high',
  },
  {
    level: 'H',
    recovery: '30%',
    usage: 'Harsh environments, printed materials',
    overhead: 'Highest (least data capacity)',
  },
];

/**
 * Barcode Selection Guide
 */
function selectBarcodeFormat(useCase: string): BarcodeFormat {
  switch (useCase) {
    case 'retail-product':
      return BarcodeFormat.EAN_13; // or UPC_A for North America

    case 'shipping-label':
      return BarcodeFormat.CODE_128;

    case 'event-ticket':
    case 'mobile-payment':
    case 'wifi-sharing':
    case 'contact-card':
      return BarcodeFormat.QR_CODE;

    case 'driver-license':
    case 'boarding-pass':
      return BarcodeFormat.PDF_417;

    case 'small-component':
    case 'electronics':
      return BarcodeFormat.DATA_MATRIX;

    case 'transport-ticket':
      return BarcodeFormat.AZTEC;

    default:
      return BarcodeFormat.QR_CODE; // Most versatile
  }
}`,
          description: 'Barcode format characteristics and selection guide',
          copyable: true,
        },
      ],
      interviewTips: [
        '1D barcodes are faster to scan but store less data; 2D codes can store thousands of characters with error correction',
        'ML Kit runs on-device, no internet required - processes frames locally using trained ML models',
        'QR codes have 4 error correction levels: L(7%), M(15%), Q(25%), H(30%) - higher levels allow more damage tolerance',
        'EAN-13 is the global retail standard; UPC-A is the North American subset (both use checksum validation)',
        'Choose barcode format based on use case: EAN-13 for products, QR for URLs/WiFi, Code 128 for shipping',
        'PDF417 is used for driver licenses and boarding passes due to high data capacity in compact space',
        'Always validate scanned data - barcodes can contain malicious URLs or injection attacks',
      ],
    },
    {
      id: 231,
      title: 'Installation & Setup',
      content: `
        <h2>Setting Up Barcode Scanner</h2>
        <p>The @capacitor-mlkit/barcode-scanning plugin provides native barcode scanning capabilities powered by Google's ML Kit. It works on iOS, Android, and has limited web support.</p>

        <h3>Installation Steps</h3>
        <ol>
          <li>Install the ML Kit barcode scanning plugin via npm</li>
          <li>Sync native projects with Capacitor</li>
          <li>Configure iOS permissions in Info.plist</li>
          <li>Configure Android permissions in AndroidManifest.xml</li>
          <li>Optional: Install QR code generator library</li>
        </ol>

        <h3>Platform-Specific Requirements</h3>
        <table>
          <tr>
            <th>Platform</th>
            <th>Requirements</th>
            <th>Configuration</th>
          </tr>
          <tr>
            <td>iOS</td>
            <td>iOS 13.0+</td>
            <td>NSCameraUsageDescription in Info.plist</td>
          </tr>
          <tr>
            <td>Android</td>
            <td>Android 5.0+ (API 21+)</td>
            <td>CAMERA permission, optional Google Play Services</td>
          </tr>
          <tr>
            <td>Web</td>
            <td>Modern browsers with WebRTC</td>
            <td>HTTPS required, limited format support</td>
          </tr>
        </table>

        <h3>Permission Best Practices</h3>
        <ul>
          <li><strong>iOS:</strong> Be specific and honest in usage descriptions - Apple reviews these carefully</li>
          <li><strong>Android:</strong> Request runtime permissions for API 23+, handle denial gracefully</li>
          <li><strong>Both:</strong> Explain why you need camera access before requesting permission</li>
          <li><strong>Fallback:</strong> Provide manual input option if camera is denied or unavailable</li>
        </ul>

        <h3>ML Kit Module (Android)</h3>
        <p>Android requires the Google Barcode Scanner module to be installed. The plugin can automatically download and install this on first use (requires Google Play Services).</p>
      `,
      codeSnippets: [
        {
          id: 3,
          language: 'bash',
          title: 'Installation Commands',
          code: `# Install @capacitor-mlkit/barcode-scanning plugin
npm install @capacitor-mlkit/barcode-scanning

# Sync with native platforms
npx cap sync

# 💡 INTERVIEW: Always run 'cap sync' after installing plugins
# This copies web assets and updates native dependencies

# Optional: Install QR code generator library
npm install qrcode
npm install --save-dev @types/qrcode

# Alternative community scanner (if needed)
# npm install @capacitor-community/barcode-scanner

# Open native projects for additional configuration
npx cap open ios
npx cap open android`,
          description: 'Complete installation commands for barcode scanning',
          copyable: true,
        },
        {
          id: 4,
          language: 'html',
          title: 'iOS Configuration - Info.plist',
          code: `<!-- ios/App/App/Info.plist -->

<!-- 💡 INTERVIEW: iOS requires usage descriptions for privacy -->
<!-- Be specific about why you need camera access -->

<key>NSCameraUsageDescription</key>
<string>We need camera access to scan barcodes and QR codes for product lookup, event ticketing, and quick data entry.</string>

<!-- Optional: If using microphone with QR codes -->
<key>NSMicrophoneUsageDescription</key>
<string>We need microphone access to scan audio-based QR codes.</string>

<!-- For iOS 14+ photo picker (if saving scanned images) -->
<key>PHPhotoLibraryPreventAutomaticLimitedAccessAlert</key>
<true/>

<!--
💡 INTERVIEW TIP: Usage Descriptions
✅ Be specific about the use case
✅ Explain the benefit to the user
✅ Be honest and transparent
✅ Avoid vague descriptions like "for app functionality"
❌ Apple rejects apps with unclear or misleading descriptions
-->`,
          description: 'iOS camera permission configuration',
          copyable: true,
        },
        {
          id: 5,
          language: 'html',
          title: 'Android Configuration - AndroidManifest.xml',
          code: `<!-- android/app/src/main/AndroidManifest.xml -->

<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <!-- Camera permission (required) -->
  <uses-permission android:name="android.permission.CAMERA" />

  <!-- Optional: Vibration permission for scan feedback -->
  <uses-permission android:name="android.permission.VIBRATE" />

  <!-- Declare camera feature (optional but recommended) -->
  <uses-feature
    android:name="android.hardware.camera"
    android:required="false" />

  <!-- Declare autofocus feature -->
  <uses-feature
    android:name="android.hardware.camera.autofocus"
    android:required="false" />

  <application
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:allowBackup="true"
    android:theme="@style/AppTheme">

    <!-- Your activities -->

  </application>
</manifest>

<!--
💡 INTERVIEW TIP: Android Permissions
- android:required="false" allows installation on devices without camera
- App should handle missing camera gracefully (show manual input)
- Runtime permissions required for Android 6.0+ (API 23+)
- Check and request permissions before scanning
-->`,
          description: 'Android camera permission configuration',
          copyable: true,
        },
        {
          id: 6,
          language: 'typescript',
          title: 'capacitor.config.ts - Plugin Configuration',
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
    // Barcode Scanner configuration
    BarcodeScanner: {
      // Enable all supported formats by default
      formats: [
        'QR_CODE',
        'EAN_13',
        'EAN_8',
        'UPC_A',
        'UPC_E',
        'CODE_128',
        'CODE_39',
        'CODE_93',
        'PDF_417',
        'DATA_MATRIX',
        'AZTEC',
        'CODABAR',
        'ITF',
      ],

      // Default camera lens
      lensFacing: 'back',  // 'front' or 'back'

      // Android-specific settings
      android: {
        scannerTimeout: 30000,  // 30 seconds
        // Enable Google Play Services module
        useGooglePlayServices: true,
      },

      // iOS-specific settings
      ios: {
        scannerTimeout: 30000,
        // Camera preset quality
        cameraPreset: 'high', // 'low', 'medium', 'high'
      },
    },
  },
};

export default config;

/**
 * 💡 INTERVIEW: Capacitor config centralizes plugin settings
 * - Type-safe configuration with TypeScript
 * - Platform-specific overrides
 * - Single source of truth for all plugins
 */`,
          description: 'Capacitor configuration with barcode scanner settings',
          copyable: true,
        },
      ],
      interviewTips: [
        'Always run "npx cap sync" after installing Capacitor plugins to update native projects',
        'iOS requires NSCameraUsageDescription in Info.plist - be specific to avoid App Store rejection',
        'Android runtime permissions (API 23+) require explicit user approval - check before scanning',
        'Setting android:required="false" for camera feature allows app installation on devices without camera',
        'ML Kit on Android may require Google Play Services module download on first use',
        'Provide manual barcode input as fallback for devices without camera or when permissions denied',
      ],
    },
    {
      id: 232,
      title: 'Barcode Scanner Service',
      content: `
        <h2>Core Scanner Service</h2>
        <p>The BarcodeScannerService wraps the ML Kit plugin with RxJS observables and provides single-scan and continuous scanning modes with proper error handling and permission management.</p>

        <h3>Service Features</h3>
        <ul>
          <li><strong>Single Scan:</strong> Scan once and return result (closes after first barcode)</li>
          <li><strong>Continuous Scan:</strong> Keep camera open, emit results via Observable</li>
          <li><strong>Permission Handling:</strong> Check and request camera permissions automatically</li>
          <li><strong>Format Filtering:</strong> Scan only specific barcode formats</li>
          <li><strong>Error Handling:</strong> User-friendly error messages</li>
          <li><strong>Platform Detection:</strong> Handle iOS, Android, and Web differences</li>
        </ul>

        <h3>Scanning Modes</h3>
        <table>
          <tr>
            <th>Mode</th>
            <th>Use Case</th>
            <th>Behavior</th>
          </tr>
          <tr>
            <td>Single Scan</td>
            <td>One-time barcode entry</td>
            <td>Closes after first successful scan</td>
          </tr>
          <tr>
            <td>Continuous Scan</td>
            <td>Batch scanning, inventory</td>
            <td>Stays open, emits each detected barcode</td>
          </tr>
        </table>

        <h3>Permission Flow</h3>
        <ol>
          <li><strong>Check:</strong> Check current permission status</li>
          <li><strong>Prompt:</strong> If not granted, request permission with explanation</li>
          <li><strong>Handle:</strong> Handle granted, denied, or prompt status</li>
          <li><strong>Fallback:</strong> Offer manual input if denied</li>
        </ol>

        <h3>ML Kit Capabilities</h3>
        <ul>
          <li>✅ Detects 13+ barcode formats simultaneously</li>
          <li>✅ Works in various lighting conditions</li>
          <li>✅ Handles barcode rotation and perspective</li>
          <li>✅ Returns corner coordinates for overlay drawing</li>
          <li>✅ On-device processing (no internet required)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 7,
          language: 'typescript',
          title: 'barcode-scanner.service.ts - Part 1 (Setup)',
          code: `// src/app/core/services/barcode/barcode-scanner.service.ts

import { Injectable } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat as MLKitFormat,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { from, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BarcodeFormat, ScanOptions, ScanResult } from './barcode.models';
import { Capacitor } from '@capacitor/core';

/**
 * Barcode Scanner Service
 *
 * 💡 INTERVIEW: Wraps ML Kit with RxJS and error handling
 * Provides single-scan and continuous scanning modes
 */

@Injectable({
  providedIn: 'root',
})
export class BarcodeScannerService {
  // Observable for continuous scan results
  private scanSubject = new Subject<ScanResult>();
  public scan$ = this.scanSubject.asObservable();

  // Track if scanner is active
  private isScanning = false;

  constructor() {
    this.setupScanListener();
  }

  /**
   * Check if barcode scanning is supported
   *
   * 💡 INTERVIEW: Always check platform capabilities
   */
  async isSupported(): Promise<boolean> {
    try {
      const result = await BarcodeScanner.isSupported();
      return result.supported;
    } catch (error) {
      console.error('Error checking scanner support:', error);
      return false;
    }
  }

  /**
   * Check if Google Barcode Scanner module is available
   * (Required for Android)
   */
  async isGoogleBarcodeScannerModuleAvailable(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      return false;
    }
    try {
      const result = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      return result.available;
    } catch (error) {
      return false;
    }
  }

  /**
   * Install Google Barcode Scanner module
   * (Required first-time on Android)
   */
  async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  /**
   * Check camera permissions
   *
   * 💡 INTERVIEW: iOS and Android have different permission models
   */
  async checkPermissions(): Promise<'granted' | 'denied' | 'prompt'> {
    try {
      const result = await BarcodeScanner.checkPermissions();
      return result.camera;
    } catch (error) {
      console.error('Error checking permissions:', error);
      return 'denied';
    }
  }

  /**
   * Request camera permissions
   *
   * 💡 INTERVIEW: Always explain WHY you need permissions
   */
  async requestPermissions(): Promise<'granted' | 'denied'> {
    try {
      const result = await BarcodeScanner.requestPermissions();
      return result.camera === 'granted' ? 'granted' : 'denied';
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return 'denied';
    }
  }

  /**
   * Check and request permissions if needed
   *
   * 💡 INTERVIEW: Good UX - check first, only request if needed
   */
  async checkAndRequestPermissions(): Promise<boolean> {
    const status = await this.checkPermissions();

    if (status === 'granted') {
      return true;
    }

    if (status === 'prompt' || status === 'denied') {
      const requestResult = await this.requestPermissions();
      return requestResult === 'granted';
    }

    return false;
  }`,
          description: 'Barcode scanner service - Setup and permissions',
          copyable: true,
        },
        {
          id: 8,
          language: 'typescript',
          title: 'barcode-scanner.service.ts - Part 2 (Scanning)',
          code: `  /**
   * Single barcode scan
   *
   * 💡 INTERVIEW: Single scan closes after first successful scan
   */
  scanBarcode(options?: ScanOptions): Observable<ScanResult> {
    return from(this.performScan(options)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Perform single scan (internal)
   */
  private async performScan(options?: ScanOptions): Promise<ScanResult> {
    // Check permissions
    const hasPermission = await this.checkAndRequestPermissions();
    if (!hasPermission) {
      throw new Error('Camera permission denied');
    }

    // Check if module is available (Android)
    if (Capacitor.getPlatform() === 'android') {
      const moduleAvailable = await this.isGoogleBarcodeScannerModuleAvailable();
      if (!moduleAvailable) {
        // Attempt to install module
        await this.installGoogleBarcodeScannerModule();
      }
    }

    // Configure scan options
    const scanOptions: StartScanOptions = {
      formats: this.mapFormats(options?.formats),
    };

    // Start single scan
    const result = await BarcodeScanner.scan(scanOptions);

    if (!result.barcodes || result.barcodes.length === 0) {
      throw new Error('No barcode detected');
    }

    // Return first barcode found
    return this.mapScanResult(result.barcodes[0]);
  }

  /**
   * Start continuous scanning
   *
   * 💡 INTERVIEW: Continuous mode keeps camera open,
   * emits results via Observable
   */
  async startContinuousScan(options?: ScanOptions): Promise<void> {
    if (this.isScanning) {
      throw new Error('Scanner is already active');
    }

    // Check permissions
    const hasPermission = await this.checkAndRequestPermissions();
    if (!hasPermission) {
      throw new Error('Camera permission denied');
    }

    // Check module availability (Android)
    if (Capacitor.getPlatform() === 'android') {
      const moduleAvailable = await this.isGoogleBarcodeScannerModuleAvailable();
      if (!moduleAvailable) {
        await this.installGoogleBarcodeScannerModule();
      }
    }

    // Configure scan options
    const scanOptions: StartScanOptions = {
      formats: this.mapFormats(options?.formats),
    };

    // Start continuous scan
    await BarcodeScanner.startScan(scanOptions);
    this.isScanning = true;
  }

  /**
   * Stop continuous scanning
   */
  async stopScan(): Promise<void> {
    if (!this.isScanning) {
      return;
    }

    await BarcodeScanner.stopScan();
    this.isScanning = false;
  }

  /**
   * Check if scanner is currently active
   */
  isScannerActive(): boolean {
    return this.isScanning;
  }

  /**
   * Setup listener for continuous scan events
   */
  private setupScanListener(): void {
    BarcodeScanner.addListener('barcodeScanned', (event) => {
      const scanResult = this.mapScanResult(event.barcode);
      this.scanSubject.next(scanResult);
    });
  }

  /**
   * Map scan result to app model
   */
  private mapScanResult(barcode: any): ScanResult {
    return {
      format: this.mapFormatFromMLKit(barcode.format),
      rawValue: barcode.rawValue || '',
      displayValue: barcode.displayValue || barcode.rawValue || '',
      cornerPoints: barcode.cornerPoints,
      timestamp: new Date(),
      metadata: {
        width: barcode.width,
        height: barcode.height,
      },
    };
  }

  /**
   * Handle scanner errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while scanning';

    if (error.message?.includes('permission')) {
      errorMessage = 'Camera permission denied';
    } else if (error.message?.includes('cancel')) {
      errorMessage = 'Scan cancelled';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}`,
          description: 'Barcode scanner service - Scanning methods',
          copyable: true,
        },
        {
          id: 9,
          language: 'typescript',
          title: 'Using the Scanner Service',
          code: `/**
 * Scanner Service Usage Examples
 */

import { Component } from '@angular/core';
import { BarcodeScannerService } from '@app/core/services/barcode/barcode-scanner.service';
import { BarcodeFormat } from '@app/core/services/barcode/barcode.models';

@Component({
  selector: 'app-scanner-demo',
  template: \`
    <ion-button (click)="singleScan()">Single Scan</ion-button>
    <ion-button (click)="continuousScan()">Continuous Scan</ion-button>
    <ion-button (click)="stopScanning()">Stop</ion-button>
  \`
})
export class ScannerDemoComponent {
  constructor(private scanner: BarcodeScannerService) {}

  /**
   * Single scan example
   */
  async singleScan() {
    // Check if scanning is supported
    const supported = await this.scanner.isSupported();
    if (!supported) {
      console.error('Barcode scanning not supported');
      return;
    }

    // Scan single barcode (QR codes only)
    this.scanner.scanBarcode({
      formats: [BarcodeFormat.QR_CODE],
      timeout: 30000,
    }).subscribe({
      next: (result) => {
        console.log('Scanned:', result.rawValue);
        console.log('Format:', result.format);
      },
      error: (error) => {
        console.error('Scan error:', error);
      }
    });
  }

  /**
   * Continuous scan example
   */
  async continuousScan() {
    // Subscribe to scan results
    this.scanner.scan$.subscribe(result => {
      console.log('Scanned:', result.rawValue);
      // Process each scan as they arrive
    });

    // Start continuous scanning (retail formats)
    try {
      await this.scanner.startContinuousScan({
        formats: [
          BarcodeFormat.EAN_13,
          BarcodeFormat.UPC_A,
          BarcodeFormat.QR_CODE,
        ],
      });
    } catch (error) {
      console.error('Failed to start scanning:', error);
    }
  }

  /**
   * Stop scanning
   */
  async stopScanning() {
    await this.scanner.stopScan();
  }

  /**
   * Check permissions before scanning
   */
  async checkPermissions() {
    const status = await this.scanner.checkPermissions();
    console.log('Permission status:', status);

    if (status !== 'granted') {
      const granted = await this.scanner.checkAndRequestPermissions();
      console.log('Permission granted:', granted);
    }
  }
}`,
          description: 'Example usage of barcode scanner service',
          copyable: true,
        },
      ],
      interviewTips: [
        'Single scan mode closes after first barcode; continuous mode stays open and emits multiple results',
        'Always check permissions before scanning - use checkAndRequestPermissions() helper method',
        'ML Kit Android requires Google Play Services module - check availability and install if needed',
        'Use RxJS Observables for continuous scanning to handle results as they arrive asynchronously',
        'Map plugin-specific types to app models for abstraction and easier testing/mocking',
        'Provide clear error messages for common failure scenarios (permissions, cancellation, timeout)',
        'Cleanup listeners in ngOnDestroy to prevent memory leaks in continuous scanning mode',
      ],
    },
    {
      id: 233,
      title: 'QR Code Generation',
      content: `
        <h2>Generating QR Codes</h2>
        <p>The BarcodeGeneratorService uses the qrcode library to generate QR codes for various data types including URLs, WiFi credentials, contact information (vCard), emails, phone numbers, and plain text.</p>

        <h3>QR Code Types</h3>
        <ul>
          <li><strong>Text:</strong> Plain text content</li>
          <li><strong>URL:</strong> Web links (https://example.com)</li>
          <li><strong>WiFi:</strong> Network credentials (WIFI:T:WPA;S:SSID;P:pass;;)</li>
          <li><strong>vCard:</strong> Contact information (BEGIN:VCARD...END:VCARD)</li>
          <li><strong>Email:</strong> Email address with subject/body (mailto:email@example.com)</li>
          <li><strong>Phone:</strong> Phone number (tel:+1234567890)</li>
          <li><strong>SMS:</strong> SMS message (smsto:+1234567890:message)</li>
          <li><strong>Geo:</strong> Geographic coordinates (geo:lat,long)</li>
        </ul>

        <h3>Error Correction Levels</h3>
        <table>
          <tr>
            <th>Level</th>
            <th>Recovery</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>L</td>
            <td>7%</td>
            <td>Clean indoor environments</td>
          </tr>
          <tr>
            <td>M</td>
            <td>15%</td>
            <td>General purpose (default)</td>
          </tr>
          <tr>
            <td>Q</td>
            <td>25%</td>
            <td>Industrial, outdoor use</td>
          </tr>
          <tr>
            <td>H</td>
            <td>30%</td>
            <td>Harsh environments, printed materials</td>
          </tr>
        </table>

        <h3>QR Code Best Practices</h3>
        <ul>
          <li><strong>Size:</strong> Minimum 2cm x 2cm for reliable scanning</li>
          <li><strong>Contrast:</strong> High contrast between foreground and background</li>
          <li><strong>Quiet Zone:</strong> Maintain border margin (usually 4 modules)</li>
          <li><strong>Testing:</strong> Test on multiple devices and scanning apps</li>
          <li><strong>Error Correction:</strong> Use H for printed/outdoor QR codes</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 10,
          language: 'typescript',
          title: 'barcode-generator.service.ts - Basic QR Generation',
          code: `// src/app/core/services/barcode/barcode-generator.service.ts

import { Injectable } from '@angular/core';
import QRCode from 'qrcode';
import { QRCodeOptions } from './barcode.models';
import { from, Observable } from 'rxjs';

/**
 * Barcode Generator Service
 *
 * 💡 INTERVIEW: QR codes can encode various data types
 * with special formatting for WiFi, vCard, etc.
 */

@Injectable({
  providedIn: 'root',
})
export class BarcodeGeneratorService {
  constructor() {}

  /**
   * Generate QR code as Data URL (base64 image)
   *
   * 💡 INTERVIEW: Data URLs can be directly used in <img> src
   */
  generateQRCode(
    data: string,
    options?: QRCodeOptions
  ): Observable<string> {
    const qrOptions = {
      width: options?.width || 300,
      height: options?.height || 300,
      margin: options?.margin || 2,
      color: {
        dark: options?.foreground || '#000000',
        light: options?.background || '#FFFFFF',
      },
      errorCorrectionLevel: options?.errorCorrection || 'M',
    };

    return from(QRCode.toDataURL(data, qrOptions));
  }

  /**
   * Generate QR code to canvas element
   *
   * 💡 INTERVIEW: Canvas-based rendering is more efficient
   */
  generateQRCodeToCanvas(
    canvas: HTMLCanvasElement,
    data: string,
    options?: QRCodeOptions
  ): Observable<void> {
    const qrOptions = {
      width: options?.width || 300,
      height: options?.height || 300,
      margin: options?.margin || 2,
      color: {
        dark: options?.foreground || '#000000',
        light: options?.background || '#FFFFFF',
      },
      errorCorrectionLevel: options?.errorCorrection || 'M',
    };

    return from(QRCode.toCanvas(canvas, data, qrOptions));
  }

  /**
   * Generate text QR code
   */
  generateTextQR(
    text: string,
    options?: QRCodeOptions
  ): Observable<string> {
    return this.generateQRCode(text, options);
  }

  /**
   * Generate URL QR code
   */
  generateURLQR(
    url: string,
    options?: QRCodeOptions
  ): Observable<string> {
    // Validate URL
    if (!this.isValidURL(url)) {
      throw new Error('Invalid URL format');
    }

    return this.generateQRCode(url, options);
  }

  /**
   * Validate URL format
   */
  private isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Calculate optimal QR code size based on data length
   *
   * 💡 INTERVIEW: More data = larger QR code needed
   */
  calculateOptimalSize(dataLength: number): number {
    if (dataLength < 100) return 200;
    if (dataLength < 500) return 300;
    if (dataLength < 1000) return 400;
    if (dataLength < 2000) return 500;
    return 600;
  }
}`,
          description: 'Basic QR code generation service',
          copyable: true,
        },
        {
          id: 11,
          language: 'typescript',
          title: 'Special QR Code Formats - WiFi & vCard',
          code: `/**
 * Generate WiFi QR code
 *
 * 💡 INTERVIEW: WiFi QR format: WIFI:T:WPA;S:SSID;P:pass;;
 * Special characters must be escaped
 */
generateWiFiQR(
  config: WiFiConfig,
  options?: QRCodeOptions
): Observable<string> {
  // Escape special characters
  const escapedSSID = this.escapeWiFiString(config.ssid);
  const escapedPassword = this.escapeWiFiString(config.password);

  // Build WiFi string
  const wifiString = \`WIFI:T:\${config.security};S:\${escapedSSID};P:\${escapedPassword};H:\${config.hidden || false};;\`;

  return this.generateQRCode(wifiString, options);
}

/**
 * Escape special characters in WiFi strings
 *
 * 💡 INTERVIEW: WiFi QR format requires escaping \\, ;, :, and "
 */
private escapeWiFiString(str: string): string {
  return str
    .replace(/\\\\/g, '\\\\\\\\')  // Backslash
    .replace(/;/g, '\\\\;')    // Semicolon
    .replace(/:/g, '\\\\:')    // Colon
    .replace(/"/g, '\\\\"');   // Quote
}

/**
 * Generate vCard QR code
 *
 * 💡 INTERVIEW: vCard is standard format for contact info
 */
generateVCardQR(
  contact: Contact,
  options?: QRCodeOptions
): Observable<string> {
  const vcard = this.createVCard(contact);
  return this.generateQRCode(vcard, options);
}

/**
 * Create vCard 3.0 string from contact
 *
 * 💡 INTERVIEW: vCard 3.0 is widely supported
 */
private createVCard(contact: Contact): string {
  const lines: string[] = [];

  lines.push('BEGIN:VCARD');
  lines.push('VERSION:3.0');

  // Full name (required)
  const fullName = \`\${contact.firstName} \${contact.lastName}\`.trim();
  lines.push(\`FN:\${fullName}\`);

  // Name structure
  lines.push(\`N:\${contact.lastName};\${contact.firstName};;;\`);

  // Organization
  if (contact.organization) {
    lines.push(\`ORG:\${contact.organization}\`);
  }

  // Phone
  if (contact.phone) {
    lines.push(\`TEL;TYPE=CELL:\${contact.phone}\`);
  }

  // Email
  if (contact.email) {
    lines.push(\`EMAIL;TYPE=INTERNET:\${contact.email}\`);
  }

  // URL
  if (contact.url) {
    lines.push(\`URL:\${contact.url}\`);
  }

  // Address
  if (contact.address) {
    const addr = contact.address;
    const addrLine = \`ADR;TYPE=WORK;;\${addr.street || ''};\${addr.city || ''};\${addr.state || ''};\${addr.zip || ''};\${addr.country || ''}\`;
    lines.push(addrLine);
  }

  // Note
  if (contact.note) {
    lines.push(\`NOTE:\${contact.note}\`);
  }

  lines.push('END:VCARD');

  return lines.join('\\n');
}`,
          description: 'Generate WiFi and vCard QR codes with proper formatting',
          copyable: true,
        },
        {
          id: 12,
          language: 'typescript',
          title: 'Additional QR Code Types',
          code: `/**
 * Generate email QR code
 *
 * Format: mailto:email@example.com?subject=Subject&body=Body
 */
generateEmailQR(
  email: string,
  subject?: string,
  body?: string,
  options?: QRCodeOptions
): Observable<string> {
  let emailString = \`mailto:\${email}\`;

  const params: string[] = [];
  if (subject) {
    params.push(\`subject=\${encodeURIComponent(subject)}\`);
  }
  if (body) {
    params.push(\`body=\${encodeURIComponent(body)}\`);
  }

  if (params.length > 0) {
    emailString += '?' + params.join('&');
  }

  return this.generateQRCode(emailString, options);
}

/**
 * Generate phone QR code
 *
 * Format: tel:+1234567890
 */
generatePhoneQR(
  phone: string,
  options?: QRCodeOptions
): Observable<string> {
  const phoneString = \`tel:\${phone}\`;
  return this.generateQRCode(phoneString, options);
}

/**
 * Generate SMS QR code
 *
 * Format: smsto:+1234567890:Message text
 */
generateSMSQR(
  phone: string,
  message?: string,
  options?: QRCodeOptions
): Observable<string> {
  let smsString = \`smsto:\${phone}\`;
  if (message) {
    smsString += \`:\${message}\`;
  }
  return this.generateQRCode(smsString, options);
}

/**
 * Generate geo location QR code
 *
 * Format: geo:latitude,longitude
 */
generateGeoQR(
  latitude: number,
  longitude: number,
  options?: QRCodeOptions
): Observable<string> {
  const geoString = \`geo:\${latitude},\${longitude}\`;
  return this.generateQRCode(geoString, options);
}

/**
 * Get recommended error correction level
 *
 * 💡 INTERVIEW: Higher error correction = more damage tolerance
 * but requires larger QR code
 */
getRecommendedErrorCorrection(
  dataLength: number,
  environment: 'indoor' | 'outdoor' | 'print'
): 'L' | 'M' | 'Q' | 'H' {
  // Outdoor or print = high error correction
  if (environment === 'outdoor' || environment === 'print') {
    return 'H'; // 30% recovery
  }

  // Small data = can afford high error correction
  if (dataLength < 100) {
    return 'Q'; // 25% recovery
  }

  // General use
  return 'M'; // 15% recovery
}`,
          description: 'Additional QR code generation methods',
          copyable: true,
        },
      ],
      interviewTips: [
        'QR codes can encode up to 4,296 alphanumeric characters (varies by error correction level)',
        'WiFi QR format requires escaping special characters (\\, ;, :, ") with backslashes',
        'vCard 3.0 is the most widely supported contact format across devices',
        'Higher error correction levels (H) allow 30% damage tolerance but require larger QR codes',
        'Data URLs (base64 images) can be directly used in <img> src attributes',
        'Canvas-based rendering is more efficient for real-time QR code updates',
        'Always validate URLs before generating QR codes to prevent malicious content',
      ],
    },
    {
      id: 234,
      title: 'Barcode Validation & Parsing',
      content: `
        <h2>Validation and Content Parsing</h2>
        <p>The BarcodeValidatorService validates scanned data, detects content types, performs checksum validation for retail barcodes, and parses structured formats like WiFi and vCard.</p>

        <h3>Validation Types</h3>
        <ul>
          <li><strong>Format Detection:</strong> Identify URL, email, phone, WiFi, vCard, etc.</li>
          <li><strong>Checksum Validation:</strong> Verify EAN-13, UPC-A, EAN-8 checksums</li>
          <li><strong>Content Parsing:</strong> Extract structured data from WiFi/vCard</li>
          <li><strong>Security Validation:</strong> Check for malicious URLs and XSS</li>
        </ul>

        <h3>Checksum Algorithms</h3>
        <table>
          <tr>
            <th>Format</th>
            <th>Algorithm</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>EAN-13</td>
            <td>Weighted sum (1,3,1,3...)</td>
            <td>5901234123457</td>
          </tr>
          <tr>
            <td>UPC-A</td>
            <td>Weighted sum (3,1,3,1...)</td>
            <td>012345678905</td>
          </tr>
          <tr>
            <td>EAN-8</td>
            <td>Similar to EAN-13, 8 digits</td>
            <td>96385074</td>
          </tr>
        </table>

        <h3>Security Considerations</h3>
        <ul>
          <li><strong>URL Validation:</strong> Only allow http/https protocols</li>
          <li><strong>XSS Prevention:</strong> Sanitize content before display</li>
          <li><strong>SQL Injection:</strong> Escape special characters before DB storage</li>
          <li><strong>Length Limits:</strong> Enforce maximum content length</li>
          <li><strong>Suspicious Patterns:</strong> Block javascript:, data:, vbscript: protocols</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 13,
          language: 'typescript',
          title: 'barcode-validator.service.ts - Validation',
          code: `// src/app/core/services/barcode/barcode-validator.service.ts

import { Injectable } from '@angular/core';
import { BarcodeValueType, ValidationResult } from './barcode.models';

/**
 * Barcode Validator Service
 *
 * 💡 INTERVIEW: Always validate scanned data before using
 */

@Injectable({
  providedIn: 'root',
})
export class BarcodeValidatorService {
  constructor() {}

  /**
   * Validate and parse scanned content
   *
   * 💡 INTERVIEW: Detect content type and validate format
   */
  validate(content: string): ValidationResult {
    if (!content || content.trim().length === 0) {
      return {
        valid: false,
        type: BarcodeValueType.UNKNOWN,
        data: null,
        error: 'Empty barcode content',
      };
    }

    content = content.trim();

    // Check URL
    if (this.isURL(content)) {
      return {
        valid: true,
        type: BarcodeValueType.URL,
        data: { url: content },
      };
    }

    // Check email
    if (this.isEmail(content)) {
      return {
        valid: true,
        type: BarcodeValueType.EMAIL,
        data: this.parseEmail(content),
      };
    }

    // Check WiFi
    if (this.isWiFi(content)) {
      const wifiConfig = this.parseWiFi(content);
      return {
        valid: wifiConfig !== null,
        type: BarcodeValueType.WIFI,
        data: wifiConfig,
        error: wifiConfig === null ? 'Invalid WiFi format' : undefined,
      };
    }

    // Check vCard
    if (this.isVCard(content)) {
      const contact = this.parseVCard(content);
      return {
        valid: contact !== null,
        type: BarcodeValueType.VCARD,
        data: contact,
        error: contact === null ? 'Invalid vCard format' : undefined,
      };
    }

    // Plain text
    return {
      valid: true,
      type: BarcodeValueType.TEXT,
      data: { text: content },
    };
  }

  /**
   * Check if content is a URL
   */
  private isURL(content: string): boolean {
    return /^https?:\\/\\//i.test(content);
  }

  /**
   * Check if content is an email
   */
  private isEmail(content: string): boolean {
    return /^mailto:/i.test(content) ||
           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(content);
  }

  /**
   * Check if content is WiFi configuration
   */
  private isWiFi(content: string): boolean {
    return /^WIFI:/i.test(content);
  }

  /**
   * Check if content is vCard
   */
  private isVCard(content: string): boolean {
    return /^BEGIN:VCARD/i.test(content);
  }`,
          description: 'Barcode validation and content type detection',
          copyable: true,
        },
        {
          id: 14,
          language: 'typescript',
          title: 'Checksum Validation - EAN-13 & UPC-A',
          code: `/**
 * Validate EAN-13 checksum
 *
 * 💡 INTERVIEW: EAN-13 uses weighted sum checksum algorithm
 * Formula: sum(odd positions) + 3 * sum(even positions)
 * Check digit = (10 - (sum mod 10)) mod 10
 */
validateEAN13(barcode: string): boolean {
  // Remove whitespace
  barcode = barcode.replace(/\\s/g, '');

  // Must be exactly 13 digits
  if (barcode.length !== 13 || !/^\\d+$/.test(barcode)) {
    return false;
  }

  const digits = barcode.split('').map(Number);
  const checkDigit = digits.pop()!;

  // Calculate checksum
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    // Multiply even-indexed digits (0, 2, 4...) by 1
    // Multiply odd-indexed digits (1, 3, 5...) by 3
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }

  // Check digit = (10 - (sum mod 10)) mod 10
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return calculatedCheckDigit === checkDigit;
}

/**
 * Validate UPC-A checksum
 *
 * 💡 INTERVIEW: UPC-A uses similar algorithm to EAN-13
 * Formula: 3 * sum(odd positions) + sum(even positions)
 */
validateUPCA(barcode: string): boolean {
  // Remove whitespace
  barcode = barcode.replace(/\\s/g, '');

  // Must be exactly 12 digits
  if (barcode.length !== 12 || !/^\\d+$/.test(barcode)) {
    return false;
  }

  const digits = barcode.split('').map(Number);
  const checkDigit = digits.pop()!;

  // Calculate checksum
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    // Multiply even-indexed digits (0, 2, 4...) by 3
    // Multiply odd-indexed digits (1, 3, 5...) by 1
    sum += digits[i] * (i % 2 === 0 ? 3 : 1);
  }

  // Check digit = (10 - (sum mod 10)) mod 10
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return calculatedCheckDigit === checkDigit;
}

/**
 * Validate EAN-8 checksum
 */
validateEAN8(barcode: string): boolean {
  barcode = barcode.replace(/\\s/g, '');

  if (barcode.length !== 8 || !/^\\d+$/.test(barcode)) {
    return false;
  }

  const digits = barcode.split('').map(Number);
  const checkDigit = digits.pop()!;

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * (i % 2 === 0 ? 3 : 1);
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return calculatedCheckDigit === checkDigit;
}`,
          description: 'Checksum validation for retail barcodes',
          copyable: true,
        },
        {
          id: 15,
          language: 'typescript',
          title: 'WiFi & vCard Parsing',
          code: `/**
 * Parse WiFi QR code
 *
 * Format: WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;
 *
 * 💡 INTERVIEW: WiFi QR codes have standardized format
 */
private parseWiFi(content: string): WiFiConfig | null {
  try {
    // Remove WIFI: prefix and trailing ;;
    const data = content
      .replace(/^WIFI:/i, '')
      .replace(/;;$/, '');

    // Parse key-value pairs
    const params: Record<string, string> = {};
    const parts = data.split(';');

    for (const part of parts) {
      const [key, value] = part.split(':');
      if (key && value) {
        // Unescape special characters
        params[key] = value
          .replace(/\\\\;/g, ';')
          .replace(/\\\\:/g, ':')
          .replace(/\\\\\\\\/g, '\\\\')
          .replace(/\\\\"/g, '"');
      }
    }

    // Extract required fields
    if (!params['S']) {
      return null; // SSID is required
    }

    return {
      ssid: params['S'],
      password: params['P'] || '',
      security: (params['T'] as any) || 'nopass',
      hidden: params['H'] === 'true',
    };
  } catch (error) {
    console.error('Error parsing WiFi QR code:', error);
    return null;
  }
}

/**
 * Parse vCard content
 *
 * 💡 INTERVIEW: vCard is complex format with many optional fields
 */
private parseVCard(content: string): Contact | null {
  try {
    const lines = content.split(/\\r?\\n/);
    const contact: Partial<Contact> = {};

    for (const line of lines) {
      if (line.startsWith('FN:')) {
        const name = line.substring(3).trim();
        const parts = name.split(' ');
        contact.firstName = parts[0] || '';
        contact.lastName = parts.slice(1).join(' ') || '';
      } else if (line.startsWith('N:')) {
        const parts = line.substring(2).split(';');
        contact.lastName = parts[0] || '';
        contact.firstName = parts[1] || '';
      } else if (line.startsWith('ORG:')) {
        contact.organization = line.substring(4).trim();
      } else if (line.startsWith('TEL')) {
        const phone = line.split(':')[1]?.trim();
        if (phone) contact.phone = phone;
      } else if (line.startsWith('EMAIL')) {
        const email = line.split(':')[1]?.trim();
        if (email) contact.email = email;
      } else if (line.startsWith('URL:')) {
        contact.url = line.substring(4).trim();
      }
    }

    // At minimum, need first or last name
    if (!contact.firstName && !contact.lastName) {
      return null;
    }

    return contact as Contact;
  } catch (error) {
    console.error('Error parsing vCard:', error);
    return null;
  }
}

/**
 * Sanitize URL to prevent malicious content
 *
 * 💡 INTERVIEW: Always validate URLs before opening
 */
isSafeURL(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Only allow http and https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    // Block dangerous patterns
    const dangerousPatterns = [
      'javascript:',
      'data:',
      'file:',
      'vbscript:',
    ];

    return !dangerousPatterns.some(pattern =>
      url.toLowerCase().includes(pattern)
    );
  } catch {
    return false;
  }
}`,
          description: 'Parse WiFi and vCard QR codes',
          copyable: true,
        },
      ],
      interviewTips: [
        'EAN-13 checksum: sum(odd positions) + 3*sum(even positions), then (10 - (sum%10))%10',
        'UPC-A uses similar algorithm to EAN-13 but with reversed weighting (3,1 instead of 1,3)',
        'WiFi QR format requires unescaping special characters (\\;, \\:, \\\\, \\")',
        'vCard 3.0 is most widely supported contact format across devices and apps',
        'Always validate URLs before opening - only allow http/https protocols',
        'Block dangerous URL patterns (javascript:, data:, vbscript:) to prevent XSS attacks',
        'Sanitize all scanned data before storing in database to prevent SQL injection',
      ],
    },
    {
      id: 235,
      title: 'Scan History & Persistence',
      content: `
        <h2>Scan History Management</h2>
        <p>The ScanHistoryService maintains a persistent record of all scans, provides search and filtering capabilities, generates statistics, and supports exporting to CSV/JSON formats.</p>

        <h3>History Features</h3>
        <ul>
          <li><strong>Persistence:</strong> Store scan history in localStorage</li>
          <li><strong>Filtering:</strong> Filter by format, type, or search query</li>
          <li><strong>Statistics:</strong> Track success rate, format breakdown</li>
          <li><strong>Export:</strong> Export history as CSV or JSON</li>
          <li><strong>Annotations:</strong> Add notes to scanned items</li>
          <li><strong>Processing Flags:</strong> Mark scans as processed/unprocessed</li>
        </ul>

        <h3>Use Cases for History</h3>
        <table>
          <tr>
            <th>Use Case</th>
            <th>Benefit</th>
          </tr>
          <tr>
            <td>Audit Trail</td>
            <td>Track what was scanned and when</td>
          </tr>
          <tr>
            <td>Batch Processing</td>
            <td>Process scans offline later</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Understand scanning patterns and success rates</td>
          </tr>
          <tr>
            <td>Duplicate Detection</td>
            <td>Prevent rescanning same items</td>
          </tr>
        </table>

        <h3>Storage Considerations</h3>
        <ul>
          <li><strong>Size Limit:</strong> Keep last 100 scans (configurable)</li>
          <li><strong>Privacy:</strong> Clear history option for sensitive data</li>
          <li><strong>Performance:</strong> Use BehaviorSubject for reactive updates</li>
          <li><strong>Backup:</strong> Export capability for data preservation</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 16,
          language: 'typescript',
          title: 'scan-history.service.ts - History Management',
          code: `// src/app/core/services/barcode/scan-history.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScanRecord, ScanResult, ScanStatistics } from './barcode.models';
import { BarcodeValidatorService } from './barcode-validator.service';
import { v4 as uuidv4 } from 'uuid';

/**
 * Scan History Service
 *
 * 💡 INTERVIEW: Persist scan history for analytics and convenience
 */

@Injectable({
  providedIn: 'root',
})
export class ScanHistoryService {
  private readonly STORAGE_KEY = 'barcode_scan_history';
  private readonly MAX_HISTORY_SIZE = 100;

  private historySubject = new BehaviorSubject<ScanRecord[]>([]);
  public history$ = this.historySubject.asObservable();

  constructor(private validator: BarcodeValidatorService) {
    this.loadHistory();
  }

  /**
   * Add scan to history
   */
  async addScan(result: ScanResult): Promise<ScanRecord> {
    // Validate the scan result
    const validation = this.validator.validate(result.rawValue);

    // Create scan record
    const record: ScanRecord = {
      id: uuidv4(),
      result,
      timestamp: new Date(),
      processed: false,
      validation,
    };

    // Get current history
    const history = this.historySubject.value;

    // Add to beginning (most recent first)
    history.unshift(record);

    // Trim to max size
    if (history.length > this.MAX_HISTORY_SIZE) {
      history.pop();
    }

    // Update subject and persist
    this.historySubject.next(history);
    await this.saveHistory();

    return record;
  }

  /**
   * Get all scan history
   */
  getHistory(): Observable<ScanRecord[]> {
    return this.history$;
  }

  /**
   * Get history filtered by format
   */
  getHistoryByFormat(format: string): Observable<ScanRecord[]> {
    return this.history$.pipe(
      map(history =>
        history.filter(record => record.result.format === format)
      )
    );
  }

  /**
   * Search history by content
   */
  searchHistory(query: string): Observable<ScanRecord[]> {
    const lowerQuery = query.toLowerCase();
    return this.history$.pipe(
      map(history =>
        history.filter(record =>
          record.result.rawValue.toLowerCase().includes(lowerQuery) ||
          record.result.displayValue.toLowerCase().includes(lowerQuery)
        )
      )
    );
  }

  /**
   * Delete scan from history
   */
  async deleteScan(id: string): Promise<void> {
    const history = this.historySubject.value.filter(r => r.id !== id);
    this.historySubject.next(history);
    await this.saveHistory();
  }

  /**
   * Clear all history
   */
  async clearHistory(): Promise<void> {
    this.historySubject.next([]);
    await this.saveHistory();
  }`,
          description: 'Scan history service with filtering and search',
          copyable: true,
        },
        {
          id: 17,
          language: 'typescript',
          title: 'Statistics & Export',
          code: `/**
 * Get scan statistics
 *
 * 💡 INTERVIEW: Analytics help understand user behavior
 */
getStatistics(): Observable<ScanStatistics> {
  return this.history$.pipe(
    map(history => {
      const stats: ScanStatistics = {
        totalScans: history.length,
        successfulScans: history.filter(r => r.validation?.valid).length,
        failedScans: history.filter(r => !r.validation?.valid).length,
        formatBreakdown: {} as any,
        lastScanDate: history[0]?.timestamp,
      };

      // Count by format
      history.forEach(record => {
        const format = record.result.format;
        stats.formatBreakdown[format] = (stats.formatBreakdown[format] || 0) + 1;
      });

      return stats;
    })
  );
}

/**
 * Export history as CSV
 */
exportToCSV(): string {
  const history = this.historySubject.value;
  const rows: string[] = [
    // Header
    'ID,Timestamp,Format,Value Type,Raw Value,Valid,Processed'
  ];

  history.forEach(record => {
    const row = [
      record.id,
      record.timestamp.toISOString(),
      record.result.format,
      record.validation?.type || '',
      this.escapeCsvValue(record.result.rawValue),
      record.validation?.valid ? 'Yes' : 'No',
      record.processed ? 'Yes' : 'No',
    ].join(',');

    rows.push(row);
  });

  return rows.join('\\n');
}

/**
 * Escape CSV values
 */
private escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\\n')) {
    return \`"\${value.replace(/"/g, '""')}"\`;
  }
  return value;
}

/**
 * Export history as JSON
 */
exportToJSON(): string {
  const history = this.historySubject.value;
  return JSON.stringify(history, null, 2);
}

/**
 * Load history from localStorage
 */
private async loadHistory(): Promise<void> {
  try {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const history = JSON.parse(stored);

      // Convert timestamp strings back to Date objects
      history.forEach((record: ScanRecord) => {
        record.timestamp = new Date(record.timestamp);
        record.result.timestamp = new Date(record.result.timestamp);
      });

      this.historySubject.next(history);
    }
  } catch (error) {
    console.error('Error loading scan history:', error);
  }
}

/**
 * Save history to localStorage
 */
private async saveHistory(): Promise<void> {
  try {
    const history = this.historySubject.value;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving scan history:', error);
  }
}`,
          description: 'Statistics generation and export functionality',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use BehaviorSubject for reactive scan history - components automatically update when history changes',
        'Limit history size (100 items) to prevent localStorage quota issues',
        'Store timestamps as ISO strings in localStorage, convert back to Date objects on load',
        'CSV export requires escaping special characters (commas, quotes, newlines)',
        'Provide clear history option for privacy compliance (GDPR)',
        'Use UUID (v4) for unique scan IDs to enable reliable tracking and deletion',
        'Statistics help identify scan success rates and most common barcode formats',
      ],
    },
    {
      id: 236,
      title: 'Scanner UI Components',
      content: `
        <h2>Building Scanner Interface</h2>
        <p>The scanner UI includes a fullscreen modal with camera overlay, scan result display, manual input fallback, and real-time feedback for continuous scanning mode.</p>

        <h3>UI Components</h3>
        <ul>
          <li><strong>Scanner Modal:</strong> Fullscreen camera view with overlay frame</li>
          <li><strong>Viewfinder:</strong> Visual guide showing scan area</li>
          <li><strong>Result Display:</strong> Show scanned value and validation status</li>
          <li><strong>Manual Input:</strong> Fallback for devices without camera</li>
          <li><strong>Format Selector:</strong> Filter by specific barcode formats</li>
          <li><strong>Continuous Mode:</strong> Scan counter and batch processing</li>
        </ul>

        <h3>UX Best Practices</h3>
        <table>
          <tr>
            <th>Element</th>
            <th>Purpose</th>
          </tr>
          <tr>
            <td>Viewfinder Frame</td>
            <td>Guide user where to position barcode</td>
          </tr>
          <tr>
            <td>Hint Text</td>
            <td>Provide scanning instructions</td>
          </tr>
          <tr>
            <td>Visual Feedback</td>
            <td>Confirm successful scan (animation/sound)</td>
          </tr>
          <tr>
            <td>Error Messages</td>
            <td>Explain failures clearly (permissions, timeout)</td>
          </tr>
          <tr>
            <td>Manual Input</td>
            <td>Fallback when camera unavailable</td>
          </tr>
        </table>

        <h3>Accessibility</h3>
        <ul>
          <li><strong>Labels:</strong> Clear button labels and ARIA attributes</li>
          <li><strong>Contrast:</strong> High contrast overlay elements</li>
          <li><strong>Keyboard:</strong> Support keyboard navigation</li>
          <li><strong>Screen Reader:</strong> Announce scan results</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 18,
          language: 'typescript',
          title: 'barcode-scanner.component.ts - Scanner Modal',
          code: `// src/app/features/barcode/components/barcode-scanner/barcode-scanner.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScannerService } from '@app/core/services/barcode/barcode-scanner.service';
import { BarcodeValidatorService } from '@app/core/services/barcode/barcode-validator.service';
import { ScanHistoryService } from '@app/core/services/barcode/scan-history.service';
import { BarcodeFormat, ScanResult } from '@app/core/services/barcode/barcode.models';
import { Subscription } from 'rxjs';

/**
 * Barcode Scanner Modal Component
 *
 * 💡 INTERVIEW: Modal pattern is perfect for fullscreen scanner
 */

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  isScanning = false;
  scanResult?: ScanResult;
  validationResult?: any;
  errorMessage = '';
  scanHint = 'Position barcode within frame';
  continuousMode = false;
  scannedCount = 0;
  selectedFormats: BarcodeFormat[] = [];
  manualInput = '';

  private scanSubscription?: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private scanner: BarcodeScannerService,
    private validator: BarcodeValidatorService,
    private historyService: ScanHistoryService
  ) {}

  ngOnInit() {
    // Subscribe to continuous scan events
    this.scanSubscription = this.scanner.scan$.subscribe({
      next: (result) => this.handleScanResult(result),
      error: (error) => this.handleError(error)
    });
  }

  ngOnDestroy() {
    this.stopScanning();
    this.scanSubscription?.unsubscribe();
  }

  /**
   * Start scanning
   */
  async startScanning() {
    try {
      this.isScanning = true;
      this.errorMessage = '';

      if (this.continuousMode) {
        // Start continuous scan
        await this.scanner.startContinuousScan({
          formats: this.selectedFormats.length > 0
            ? this.selectedFormats
            : undefined
        });
      } else {
        // Single scan
        this.scanner.scanBarcode({
          formats: this.selectedFormats.length > 0
            ? this.selectedFormats
            : undefined
        }).subscribe({
          next: (result) => {
            this.isScanning = false;
            this.handleScanResult(result);
          },
          error: (error) => {
            this.isScanning = false;
            this.handleError(error);
          }
        });
      }
    } catch (error: any) {
      this.isScanning = false;
      this.handleError(error);
    }
  }

  /**
   * Handle scan result
   */
  private async handleScanResult(result: ScanResult) {
    // Validate result
    this.validationResult = this.validator.validate(result.rawValue);

    // Save to history
    await this.historyService.addScan(result);

    if (this.continuousMode) {
      // Increment counter
      this.scannedCount++;
    } else {
      // Show result
      this.scanResult = result;
      this.isScanning = false;
    }
  }

  /**
   * Process result and close modal
   */
  processResult() {
    if (this.scanResult && this.validationResult?.valid) {
      this.modalCtrl.dismiss({
        result: this.scanResult,
        validation: this.validationResult
      });
    }
  }

  /**
   * Close modal
   */
  close() {
    this.stopScanning();
    this.modalCtrl.dismiss();
  }
}`,
          description: 'Scanner modal component with single and continuous modes',
          copyable: true,
        },
        {
          id: 19,
          language: 'html',
          title: 'Scanner Component Template',
          code: `<!-- barcode-scanner.component.html -->

<ion-header>
  <ion-toolbar>
    <ion-title>Scan Barcode</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="close()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <!-- Scanner View (native camera overlay) -->
  <div class="scanner-container" *ngIf="isScanning">
    <div class="scanner-overlay">
      <!-- Viewfinder frame -->
      <div class="scanner-frame">
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>

      <!-- Hint text -->
      <p class="scanner-hint">{{ scanHint }}</p>

      <!-- Scan count (continuous mode) -->
      <div class="scan-count" *ngIf="continuousMode">
        <ion-chip color="primary">
          <ion-icon name="checkmark-circle"></ion-icon>
          <ion-label>{{ scannedCount }} scanned</ion-label>
        </ion-chip>
      </div>
    </div>

    <!-- Bottom controls -->
    <div class="scanner-controls">
      <ion-button fill="clear" size="large" (click)="stopScanning()">
        <ion-icon name="stop-circle" slot="icon-only"></ion-icon>
      </ion-button>
    </div>
  </div>

  <!-- Scan Result View -->
  <div class="result-container" *ngIf="!isScanning && scanResult">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>
          <ion-chip [color]="getFormatColor(scanResult.format)">
            {{ scanResult.format }}
          </ion-chip>
        </ion-card-subtitle>
        <ion-card-title>Scan Successful</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <!-- Result value -->
        <div class="result-value">
          <p>{{ scanResult.displayValue }}</p>
        </div>

        <!-- Actions -->
        <ion-button expand="block" (click)="processResult()">
          <ion-icon name="checkmark" slot="start"></ion-icon>
          Process Result
        </ion-button>

        <ion-button expand="block" fill="outline" (click)="scanAgain()">
          <ion-icon name="scan" slot="start"></ion-icon>
          Scan Again
        </ion-button>
      </ion-card-content>
    </ion-card>
  </div>

  <!-- Initial State -->
  <div class="initial-container" *ngIf="!isScanning && !scanResult">
    <ion-button expand="block" size="large" (click)="startScanning()">
      <ion-icon name="scan" slot="start"></ion-icon>
      Start Scanning
    </ion-button>

    <!-- Manual input fallback -->
    <ion-item>
      <ion-input
        label="Or enter manually"
        [(ngModel)]="manualInput"
        placeholder="Enter barcode"
      ></ion-input>
    </ion-item>
  </div>
</ion-content>`,
          description: 'Scanner component template with overlay and controls',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use ion-modal with fullscreen presentation for scanner - provides native-like camera experience',
        'Viewfinder frame guides users where to position barcode for optimal scanning',
        'Provide manual input fallback for accessibility and when camera unavailable',
        'Show scan counter in continuous mode so users know how many items scanned',
        'Display validation results immediately after scan with clear success/error indicators',
        'Clean up scanner listeners in ngOnDestroy to prevent memory leaks',
        'Use color-coded chips to indicate barcode format (primary for QR, secondary for EAN, etc.)',
      ],
    },
    {
      id: 237,
      title: 'Real-World Use Cases',
      content: `
        <h2>Practical Applications</h2>
        <p>Barcode scanning enables various real-world applications from retail product lookup to event ticketing, inventory management, and contact sharing.</p>

        <h3>Common Use Cases</h3>
        <ul>
          <li><strong>Retail Product Scanning:</strong> Price checks, self-checkout, product information</li>
          <li><strong>Inventory Management:</strong> Stock counting, asset tracking, warehouse operations</li>
          <li><strong>Event Ticketing:</strong> Attendee check-in, ticket validation, access control</li>
          <li><strong>Mobile Payments:</strong> QR code payments, cryptocurrency wallets</li>
          <li><strong>Contact Sharing:</strong> vCard business cards, quick contact exchange</li>
          <li><strong>WiFi Sharing:</strong> Quick network connection without typing password</li>
          <li><strong>Document Tracking:</strong> ID verification, package tracking, shipping labels</li>
        </ul>

        <h3>Implementation Patterns</h3>
        <table>
          <tr>
            <th>Pattern</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Lookup</td>
            <td>Scan → API lookup → Display</td>
            <td>Product price check</td>
          </tr>
          <tr>
            <td>Validation</td>
            <td>Scan → Server verify → Allow/Deny</td>
            <td>Event ticket check-in</td>
          </tr>
          <tr>
            <td>Batch</td>
            <td>Continuous scan → Collect → Process</td>
            <td>Inventory counting</td>
          </tr>
          <tr>
            <td>Generate</td>
            <td>Create data → Generate QR → Share</td>
            <td>WiFi password sharing</td>
          </tr>
        </table>

        <h3>Security Best Practices</h3>
        <ul>
          <li>✅ Validate all scanned data before processing</li>
          <li>✅ Sanitize input before database storage</li>
          <li>✅ Show confirmation before opening URLs</li>
          <li>✅ Use HTTPS for API communications</li>
          <li>✅ Implement rate limiting on scanning</li>
          <li>✅ Log scan activities for audit trail</li>
          <li>❌ Never automatically execute scanned commands</li>
          <li>❌ Don't store sensitive data in QR codes</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 20,
          language: 'typescript',
          title: 'Product Inventory Scanner',
          code: `/**
 * Product Inventory Use Case
 *
 * 💡 INTERVIEW: Retail inventory management with barcode scanning
 */

// Product model
interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

// Inventory service
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(
    private barcodeScanner: BarcodeScannerService,
    private http: HttpClient
  ) {}

  /**
   * Scan product and look up in database
   */
  async scanProduct(): Promise<Product | null> {
    try {
      // Scan barcode (EAN-13 or UPC-A for retail)
      const result = await firstValueFrom(
        this.barcodeScanner.scanBarcode({
          formats: [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A],
        })
      );

      // Look up product in database
      const product = await firstValueFrom(
        this.http.get<Product>(\`/api/products/barcode/\${result.rawValue}\`)
      );

      return product;
    } catch (error) {
      console.error('Error scanning product:', error);
      return null;
    }
  }

  /**
   * Bulk inventory scan
   */
  async bulkInventoryScan(): Promise<Product[]> {
    const products: Product[] = [];
    const scannedBarcodes = new Set<string>();

    // Start continuous scan
    await this.barcodeScanner.startContinuousScan({
      formats: [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A],
    });

    // Subscribe to scan events
    this.barcodeScanner.scan$.subscribe(async (result) => {
      // Skip duplicates
      if (scannedBarcodes.has(result.rawValue)) {
        return;
      }

      scannedBarcodes.add(result.rawValue);

      // Look up product
      try {
        const product = await firstValueFrom(
          this.http.get<Product>(\`/api/products/barcode/\${result.rawValue}\`)
        );
        products.push(product);
      } catch (error) {
        console.error('Product not found:', result.rawValue);
      }
    });

    return products;
  }
}`,
          description: 'Product inventory scanning with database lookup',
          copyable: true,
        },
        {
          id: 21,
          language: 'typescript',
          title: 'Event Ticket Scanner',
          code: `/**
 * Event Ticket Scanning Use Case
 *
 * 💡 INTERVIEW: QR code ticket validation with server verification
 */

// Ticket model
interface Ticket {
  id: string;
  eventId: string;
  attendeeName: string;
  ticketType: string;
  checkedIn: boolean;
  checkInTime?: Date;
}

// Ticket scanner service
@Injectable({
  providedIn: 'root',
})
export class TicketScannerService {
  constructor(
    private barcodeScanner: BarcodeScannerService,
    private validator: BarcodeValidatorService,
    private http: HttpClient
  ) {}

  /**
   * Scan and validate ticket
   */
  async scanTicket(): Promise<{
    success: boolean;
    ticket?: Ticket;
    error?: string;
  }> {
    try {
      // Scan QR code
      const result = await firstValueFrom(
        this.barcodeScanner.scanBarcode({
          formats: [BarcodeFormat.QR_CODE],
        })
      );

      // Validate QR content (should be URL)
      const validation = this.validator.validate(result.rawValue);

      if (validation.type !== BarcodeValueType.URL) {
        return {
          success: false,
          error: 'Invalid ticket format',
        };
      }

      // Extract ticket ID from URL
      const ticketId = this.extractTicketId(result.rawValue);
      if (!ticketId) {
        return {
          success: false,
          error: 'Invalid ticket ID',
        };
      }

      // Verify ticket with server
      const ticket = await firstValueFrom(
        this.http.post<Ticket>(\`/api/tickets/\${ticketId}/check-in\`, {})
      );

      return {
        success: true,
        ticket,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to scan ticket',
      };
    }
  }

  /**
   * Extract ticket ID from URL
   */
  private extractTicketId(url: string): string | null {
    try {
      const parsed = new URL(url);
      const pathParts = parsed.pathname.split('/');
      return pathParts[pathParts.length - 1];
    } catch {
      return null;
    }
  }
}`,
          description: 'Event ticket scanning with server-side validation',
          copyable: true,
        },
        {
          id: 22,
          language: 'typescript',
          title: 'Security Best Practices',
          code: `/**
 * Security Best Practices for Barcode Scanning
 *
 * 💡 INTERVIEW: Always sanitize and validate scanned data
 */

@Injectable({
  providedIn: 'root',
})
export class BarcodeSecurityService {
  constructor(
    private validator: BarcodeValidatorService,
    private alertCtrl: AlertController
  ) {}

  /**
   * Safely process scanned URL
   *
   * 💡 INTERVIEW: Never automatically open URLs
   * Always warn user and get confirmation
   */
  async safelyOpenURL(url: string): Promise<void> {
    // Validate URL
    if (!this.validator.isSafeURL(url)) {
      await this.showSecurityWarning(
        'This URL appears to be unsafe and has been blocked.'
      );
      return;
    }

    // Show confirmation dialog
    const alert = await this.alertCtrl.create({
      header: 'Open URL?',
      message: \`Do you want to open this URL?\\n\\n\${url}\`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Open',
          handler: () => {
            window.open(url, '_blank');
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Sanitize barcode input before database storage
   */
  sanitizeBarcodeValue(value: string): string {
    return value
      .replace(/['";\\\\]/g, '')  // Remove dangerous chars
      .trim()
      .substring(0, 1000);        // Limit length
  }

  /**
   * Rate limit scanning operations
   *
   * 💡 INTERVIEW: Prevent abuse by limiting scan rate
   */
  private lastScanTime = 0;
  private readonly MIN_SCAN_INTERVAL = 1000; // 1 second

  canScan(): boolean {
    const now = Date.now();
    if (now - this.lastScanTime < this.MIN_SCAN_INTERVAL) {
      return false;
    }
    this.lastScanTime = now;
    return true;
  }

  /**
   * Validate barcode before processing
   */
  validateBeforeProcessing(result: ScanResult): {
    safe: boolean;
    reason?: string;
  } {
    // Check length
    if (result.rawValue.length > 1000) {
      return {
        safe: false,
        reason: 'Barcode value too long',
      };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,           // XSS attempt
      /javascript:/i,       // JavaScript protocol
      /data:/i,             // Data URI
      /vbscript:/i,         // VBScript
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(result.rawValue)) {
        return {
          safe: false,
          reason: 'Suspicious content detected',
        };
      }
    }

    return { safe: true };
  }
}`,
          description: 'Security validation and safe URL handling',
          copyable: true,
        },
      ],
      interviewTips: [
        'Product lookup pattern: scan barcode → API lookup → display product details',
        'Ticket validation requires server-side verification to prevent fraud and duplicate entries',
        'Batch scanning uses continuous mode with Set to track scanned items and avoid duplicates',
        'Always show confirmation dialog before opening URLs from QR codes (security best practice)',
        'Sanitize scanned data before database storage to prevent SQL injection attacks',
        'Rate limiting prevents abuse - implement minimum interval between scans (e.g., 1 second)',
        'Security patterns to block: javascript:, data:, vbscript:, file: protocols in URLs',
      ],
    },
  ],
};
