// src/app/services/chapters/data/chapter-25.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_25_DATA: Chapter = {
  id: 25,
  title: 'Biometric Authentication & App Security',
  description: 'Implement Face ID, Touch ID, and Fingerprint authentication with PIN fallback, app locking, session management, and advanced security features',
  icon: 'finger-print-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 250,
      title: 'Biometric Authentication Overview',
      content: `
        <h2>Understanding Biometric Authentication</h2>
        <p>Biometric authentication uses unique biological characteristics to verify user identity. Unlike passwords that can be forgotten or stolen, biometric data is inherently tied to the user and stored securely in device hardware.</p>

        <h3>Common Biometric Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Platform</th>
            <th>Security Level</th>
            <th>False Accept Rate</th>
          </tr>
          <tr>
            <td><strong>Face ID</strong></td>
            <td>iOS (iPhone X+)</td>
            <td>Strong</td>
            <td>1 in 1,000,000</td>
          </tr>
          <tr>
            <td><strong>Touch ID</strong></td>
            <td>iOS (iPhone 5s-8)</td>
            <td>Strong</td>
            <td>1 in 50,000</td>
          </tr>
          <tr>
            <td><strong>Fingerprint</strong></td>
            <td>Android</td>
            <td>Strong (Class 3)</td>
            <td>1 in 50,000</td>
          </tr>
          <tr>
            <td><strong>Face Recognition</strong></td>
            <td>Android</td>
            <td>Weak (Class 2)</td>
            <td>Varies widely</td>
          </tr>
          <tr>
            <td><strong>Iris Scanner</strong></td>
            <td>Samsung</td>
            <td>Very Strong</td>
            <td>1 in millions</td>
          </tr>
        </table>

        <h3>Security Hardware</h3>
        <ul>
          <li><strong>Secure Enclave (iOS):</strong> Hardware-isolated coprocessor that stores biometric data separately from main processor. Even if iOS is compromised, biometric data remains secure.</li>
          <li><strong>TEE - Trusted Execution Environment (Android):</strong> Hardware-isolated secure area for biometric processing. Used by Class 3 (BIOMETRIC_STRONG) authentication.</li>
          <li><strong>Keychain/Keystore:</strong> Encrypted storage for credentials tied to biometric authentication. Data can only be accessed after successful biometric verification.</li>
        </ul>

        <h3>When to Use Biometric Authentication</h3>
        <ul>
          <li><strong>Banking Apps:</strong> Required for transactions, lock after 30s-5min inactivity</li>
          <li><strong>Password Managers:</strong> Required for every unlock, no session persistence</li>
          <li><strong>Healthcare Apps:</strong> HIPAA compliance for PHI (Protected Health Information) access</li>
          <li><strong>Payment Apps:</strong> Required for sending money, authorize transactions</li>
          <li><strong>Enterprise Apps:</strong> Company policy enforcement, MDM integration</li>
        </ul>

        <h3>Privacy & Security Considerations</h3>
        <ul>
          <li>✅ <strong>On-Device Only:</strong> Biometric data never leaves Secure Enclave / TEE</li>
          <li>✅ <strong>No Network Transmission:</strong> Never send biometric data to servers</li>
          <li>✅ <strong>User Consent:</strong> Explicit opt-in required (GDPR Article 9)</li>
          <li>✅ <strong>Fallback Required:</strong> Always provide PIN/password alternative</li>
          <li>✅ <strong>Clear Communication:</strong> Explain WHY biometric is used</li>
          <li>✅ <strong>Easy Opt-Out:</strong> Allow users to disable biometric anytime</li>
        </ul>

        <h3>Biometric vs PIN vs Password Security</h3>
        <ul>
          <li><strong>Biometric (Face ID/Touch ID):</strong> Can't be forgotten, hard to steal, requires physical presence. But can't be changed if compromised.</li>
          <li><strong>Password (12+ chars):</strong> Can be changed if compromised, works everywhere. But can be forgotten, phished, or keylogged.</li>
          <li><strong>PIN (4-6 digits):</strong> Quick to enter, good fallback. But low entropy (10k-1M combinations), vulnerable to shoulder surfing.</li>
        </ul>

        <p><strong>Best Practice:</strong> Use biometric for primary authentication with PIN as fallback, rate limiting to prevent brute-force attacks.</p>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'biometric.models.ts - Type Definitions',
          code: `// src/app/core/services/biometric/biometric.models.ts

/**
 * Biometric Type Enum
 *
 * 💡 INTERVIEW: Different platforms support different biometric methods
 */
export enum BiometricType {
  NONE = 0,
  TOUCH_ID = 1,                // Apple Touch ID (fingerprint)
  FACE_ID = 2,                 // Apple Face ID (facial recognition)
  FINGERPRINT = 3,             // Android fingerprint sensor
  FACE_AUTHENTICATION = 4,     // Android face recognition
  IRIS_AUTHENTICATION = 5,     // Samsung iris scanner
}

/**
 * Biometric Availability
 */
export interface BiometricAvailability {
  isAvailable: boolean;                    // Is biometric available
  biometricType: BiometricType;            // Type of biometric
  strongBiometricAvailable: boolean;       // Class 3 (Android) / Secure Enclave (iOS)
  deviceCredentialAvailable: boolean;      // PIN/password fallback
  errorMessage?: string;                   // Error if unavailable
}

/**
 * Biometric Authentication Options
 */
export interface BiometricAuthOptions {
  reason?: string;                         // Why authentication is needed
  title?: string;                          // Dialog title
  subtitle?: string;                       // Dialog subtitle
  description?: string;                    // Additional description
  cancelButtonText?: string;               // Cancel button text
  fallbackButtonText?: string;             // Fallback button text (e.g., "Use PIN")
  useFallback?: boolean;                   // Show fallback button
  maxAttempts?: number;                    // Max authentication attempts
}

/**
 * Biometric Authentication Result
 */
export interface BiometricAuthResult {
  success: boolean;
  biometricType?: BiometricType;
  error?: BiometricError;
  errorMessage?: string;
}

/**
 * Biometric Error Types
 */
export enum BiometricError {
  NOT_AVAILABLE = 'NOT_AVAILABLE',                     // Biometric not available
  NOT_ENROLLED = 'NOT_ENROLLED',                       // No biometric data enrolled
  USER_CANCEL = 'USER_CANCEL',                         // User cancelled authentication
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',     // Authentication failed
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',             // Too many failed attempts
  LOCKOUT = 'LOCKOUT',                                 // Biometric authentication locked
  SYSTEM_ERROR = 'SYSTEM_ERROR',                       // System error
}

/**
 * App Lock Configuration
 */
export interface AppLockConfig {
  enabled: boolean;                        // App lock enabled
  useBiometric: boolean;                   // Use biometric authentication
  usePIN: boolean;                         // Use PIN authentication
  autoLockTimeout: number;                 // Auto-lock timeout (seconds)
  lockOnBackground: boolean;               // Lock when app goes to background
  maxFailedAttempts: number;               // Max failed unlock attempts
}

/**
 * Authentication Session
 *
 * 💡 INTERVIEW: Session tracks authentication state separately from app lock
 * Lock = UI-level security, Session = API-level security
 */
export interface AuthSession {
  isAuthenticated: boolean;                // Is user authenticated
  authenticatedAt: Date;                   // When authenticated
  expiresAt: Date;                         // When session expires
  biometricUsed: boolean;                  // Was biometric used to authenticate
  userId?: string;                         // User ID (optional)
}`,
          description: 'Complete type definitions for biometric authentication system',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Biometric Security Comparison',
          code: `/**
 * Biometric Security Characteristics
 *
 * 💡 INTERVIEW: Understand security levels of different biometric types
 */

interface BiometricSecurity {
  type: BiometricType;
  platform: 'iOS' | 'Android';
  securityLevel: 'Strong' | 'Weak' | 'Convenience';
  hardware: string;
  falseAcceptRate: string;
  spoofingResistance: 'High' | 'Medium' | 'Low';
  useCases: string[];
}

const BIOMETRIC_SECURITY: BiometricSecurity[] = [
  {
    type: BiometricType.FACE_ID,
    platform: 'iOS',
    securityLevel: 'Strong',
    hardware: 'TrueDepth camera system + Secure Enclave',
    falseAcceptRate: '1 in 1,000,000',
    spoofingResistance: 'High',
    useCases: [
      'Banking transactions',
      'Password manager unlock',
      'Payment authorization',
      'Healthcare PHI access',
    ],
  },
  {
    type: BiometricType.TOUCH_ID,
    platform: 'iOS',
    securityLevel: 'Strong',
    hardware: 'Capacitive fingerprint sensor + Secure Enclave',
    falseAcceptRate: '1 in 50,000',
    spoofingResistance: 'High',
    useCases: [
      'App unlock',
      'Payment authorization',
      'Account access',
      'Quick authentication',
    ],
  },
  {
    type: BiometricType.FINGERPRINT,
    platform: 'Android',
    securityLevel: 'Strong',
    hardware: 'Fingerprint sensor + TEE',
    falseAcceptRate: '1 in 50,000 (Class 3)',
    spoofingResistance: 'High',
    useCases: [
      'App unlock',
      'Payment authorization',
      'Account access',
      'Wide device support',
    ],
  },
  {
    type: BiometricType.FACE_AUTHENTICATION,
    platform: 'Android',
    securityLevel: 'Weak',
    hardware: 'Front camera (2D recognition)',
    falseAcceptRate: 'Varies widely (Class 2)',
    spoofingResistance: 'Low',
    useCases: [
      'Convenience unlock only',
      'Social apps',
      'Non-sensitive data',
      'NOT for banking/payments',
    ],
  },
];

/**
 * 💡 INTERVIEW: Why Face ID is more secure than Touch ID?
 *
 * Answer:
 * 1. False Accept Rate: 1 in 1,000,000 (Face ID) vs 1 in 50,000 (Touch ID) = 20x more secure
 * 2. 3D Depth Mapping: TrueDepth camera can't be fooled by photos or masks
 * 3. Attention Detection: Requires user to look at device with eyes open
 * 4. Adaptive Learning: Adapts to appearance changes (facial hair, glasses, aging)
 * 5. No Physical Contact: Works with gloves, wet hands
 *
 * However, Touch ID is faster and works when wearing masks or in bright sunlight.
 */`,
          description: 'Comparison of biometric security levels across platforms',
          copyable: true,
        },
      ],
      interviewTips: [
        'Biometric data is stored in Secure Enclave (iOS) or TEE (Android), never in app storage',
        'Face ID has 20x lower false accept rate than Touch ID (1 in 1M vs 1 in 50k)',
        'Always provide PIN/password fallback for accessibility and reliability',
        'GDPR classifies biometric data as "special category" requiring explicit consent',
        'Biometric authentication is on-device only - never transmit biometric data to servers',
      ],
    },
    {
      id: 251,
      title: 'Setup & Installation',
      content: `
        <h2>Installing Biometric Authentication Plugin</h2>
        <p>We'll use <code>@capacitor-community/native-biometric</code> for cross-platform biometric authentication with native iOS and Android APIs.</p>

        <h3>Installation Steps</h3>
        <ol>
          <li>Install the native biometric plugin</li>
          <li>Install secure storage for credentials</li>
          <li>Sync with native platforms</li>
          <li>Configure iOS Info.plist</li>
          <li>Configure Android manifest</li>
        </ol>

        <h3>iOS Configuration (Info.plist)</h3>
        <p><strong>Required:</strong> Face ID usage description. Without this key, app will crash when attempting to use Face ID.</p>
        <pre><code>&lt;key&gt;NSFaceIDUsageDescription&lt;/key&gt;
&lt;string&gt;We use Face ID to securely unlock the app and protect your sensitive information.&lt;/string&gt;</code></pre>

        <h3>Android Configuration (AndroidManifest.xml)</h3>
        <p><strong>Required Permissions:</strong></p>
        <ul>
          <li><code>USE_BIOMETRIC</code> - Android 9+ biometric API (normal permission, auto-granted)</li>
          <li><code>USE_FINGERPRINT</code> - Android 6-8 compatibility (deprecated but still supported)</li>
        </ul>

        <h3>Testing on Simulators/Emulators</h3>
        <ul>
          <li><strong>iOS Simulator:</strong> Features → Face ID → Enrolled, then "Matching Face" to simulate success</li>
          <li><strong>Android Emulator:</strong> Extended Controls → Fingerprint, enroll in Settings → Security</li>
        </ul>

        <h3>Platform-Specific APIs</h3>
        <ul>
          <li><strong>iOS:</strong> LAContext (Local Authentication framework) handles Touch ID and Face ID</li>
          <li><strong>Android:</strong> BiometricPrompt API (Android 9+) provides unified biometric interface</li>
          <li><strong>Web:</strong> WebAuthn API for browser-based biometric (FIDO2)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'bash',
          title: 'Installation Commands',
          code: `# Install native biometric plugin
npm install @capacitor-community/native-biometric

# Install secure storage for credentials
npm install @capacitor-community/secure-storage

# Sync with native platforms
npx cap sync

# Optional: Install bcrypt for PIN hashing
npm install bcryptjs
npm install --save-dev @types/bcryptjs`,
          description: 'Install biometric authentication and secure storage plugins',
          copyable: true,
        },
        {
          id: 2,
          language: 'html',
          title: 'iOS Info.plist Configuration',
          code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- ... existing entries ... -->

  <!-- Face ID Usage Description (REQUIRED) -->
  <key>NSFaceIDUsageDescription</key>
  <string>We use Face ID to securely unlock the app and protect your sensitive information.</string>

  <!-- Optional: Keychain Access Group (for credential sharing between apps) -->
  <key>keychain-access-groups</key>
  <array>
    <string>$(AppIdentifierPrefix)com.yourcompany.yourapp</string>
  </array>
</dict>
</plist>`,
          description: 'iOS configuration for Face ID (ios/App/App/Info.plist)',
          copyable: true,
        },
        {
          id: 3,
          language: 'html',
          title: 'Android Manifest Configuration',
          code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <!-- Biometric Authentication Permissions -->
  <uses-permission android:name="android.permission.USE_BIOMETRIC" />
  <uses-permission android:name="android.permission.USE_FINGERPRINT" />

  <!-- Optional: For strong biometric only (Class 3) -->
  <uses-feature
    android:name="android.hardware.fingerprint"
    android:required="false" />

  <application>
    <!-- ... existing configuration ... -->
  </application>
</manifest>`,
          description: 'Android configuration for biometric (android/app/src/main/AndroidManifest.xml)',
          copyable: true,
        },
        {
          id: 4,
          language: 'typescript',
          title: 'Check Biometric Availability',
          code: `// src/app/core/services/biometric/biometric-auth.service.ts

import { Injectable } from '@angular/core';
import { NativeBiometric, BiometryType } from '@capacitor-community/native-biometric';
import { BiometricType, BiometricAvailability } from './biometric.models';

/**
 * Check if biometric authentication is available
 *
 * 💡 INTERVIEW: Always check availability before attempting authentication
 * This checks both hardware availability and user enrollment
 */
@Injectable({
  providedIn: 'root'
})
export class BiometricAuthService {

  async isAvailable(): Promise<BiometricAvailability> {
    try {
      const result = await NativeBiometric.isAvailable();

      return {
        isAvailable: result.isAvailable,
        biometricType: this.parseBiometricType(result.biometryType),
        strongBiometricAvailable: result.isAvailable,
        deviceCredentialAvailable: result.isAvailable,
      };
    } catch (error: any) {
      console.error('Biometric availability check failed:', error);

      return {
        isAvailable: false,
        biometricType: BiometricType.NONE,
        strongBiometricAvailable: false,
        deviceCredentialAvailable: false,
        errorMessage: error.message || 'Biometric authentication not available',
      };
    }
  }

  /**
   * Get user-friendly name for biometric type
   */
  getBiometricTypeName(type: BiometricType): string {
    switch (type) {
      case BiometricType.FACE_ID:
        return 'Face ID';
      case BiometricType.TOUCH_ID:
        return 'Touch ID';
      case BiometricType.FINGERPRINT:
        return 'Fingerprint';
      case BiometricType.FACE_AUTHENTICATION:
        return 'Face Recognition';
      case BiometricType.IRIS_AUTHENTICATION:
        return 'Iris Scanner';
      default:
        return 'Biometric';
    }
  }

  /**
   * Parse native biometric type to our enum
   */
  private parseBiometricType(type: BiometryType | undefined): BiometricType {
    switch (type) {
      case BiometryType.FACE_ID:
        return BiometricType.FACE_ID;
      case BiometryType.TOUCH_ID:
        return BiometricType.TOUCH_ID;
      case BiometryType.FINGERPRINT:
        return BiometricType.FINGERPRINT;
      case BiometryType.FACE_AUTHENTICATION:
        return BiometricType.FACE_AUTHENTICATION;
      case BiometryType.IRIS_AUTHENTICATION:
        return BiometricType.IRIS_AUTHENTICATION;
      default:
        return BiometricType.NONE;
    }
  }
}`,
          description: 'Service to check biometric availability and type',
          copyable: true,
        },
      ],
      interviewTips: [
        'NSFaceIDUsageDescription is REQUIRED in Info.plist or app will crash when using Face ID',
        'Android BiometricPrompt API (Android 9+) replaces deprecated FingerprintManager',
        'USE_BIOMETRIC permission is "normal" permission - auto-granted at install',
        'Always check biometric availability before showing biometric UI options',
        'Test on real devices - simulators have limitations for biometric testing',
      ],
    },
    {
      id: 252,
      title: 'Biometric Auth Implementation',
      content: `
        <h2>Implementing Biometric Authentication</h2>
        <p>The BiometricAuthService provides a unified interface for Face ID, Touch ID, and Fingerprint authentication across iOS and Android platforms.</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Availability Check:</strong> Detect biometric hardware and enrollment status</li>
          <li><strong>Authentication:</strong> Show native biometric prompt and verify user</li>
          <li><strong>Credential Storage:</strong> Securely store and retrieve encrypted credentials</li>
          <li><strong>Error Handling:</strong> Parse and handle biometric-specific errors</li>
          <li><strong>Type Detection:</strong> Identify specific biometric type (Face ID vs Touch ID vs Fingerprint)</li>
        </ul>

        <h3>Authentication Flow</h3>
        <ol>
          <li>Check if biometric is available and enrolled</li>
          <li>Show native biometric prompt with custom message</li>
          <li>Handle success (unlock app) or failure (show error/fallback)</li>
          <li>Optionally store credentials in Keychain/Keystore</li>
        </ol>

        <h3>Secure Credential Storage</h3>
        <p>Credentials stored with <code>setCredentials()</code> are:</p>
        <ul>
          <li>Encrypted by platform (Keychain/Keystore)</li>
          <li>Tied to biometric authentication (require unlock to retrieve)</li>
          <li>Isolated in Secure Enclave / TEE</li>
          <li>Never accessible without biometric verification</li>
        </ul>

        <h3>Error Types</h3>
        <ul>
          <li><strong>NOT_AVAILABLE:</strong> No biometric hardware → Show PIN</li>
          <li><strong>NOT_ENROLLED:</strong> User hasn't set up biometric → Prompt to enable in Settings</li>
          <li><strong>USER_CANCEL:</strong> User cancelled prompt → Do nothing</li>
          <li><strong>AUTHENTICATION_FAILED:</strong> Biometric didn't match → Allow retry</li>
          <li><strong>TOO_MANY_ATTEMPTS:</strong> Failed multiple times → Force PIN</li>
          <li><strong>LOCKOUT:</strong> Biometric temporarily locked → Use PIN only</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'biometric-auth.service.ts - Complete Implementation',
          code: `// src/app/core/services/biometric/biometric-auth.service.ts

import { Injectable } from '@angular/core';
import { NativeBiometric, BiometryType } from '@capacitor-community/native-biometric';
import {
  BiometricType,
  BiometricAvailability,
  BiometricAuthOptions,
  BiometricAuthResult,
  BiometricError,
  StoredCredentials,
} from './biometric.models';

/**
 * Biometric Authentication Service
 *
 * Handles Face ID, Touch ID, Fingerprint authentication
 * with secure credential storage in device Keychain/Keystore
 *
 * 💡 INTERVIEW: This service abstracts platform-specific biometric APIs
 * and provides a unified interface for the app.
 */
@Injectable({
  providedIn: 'root'
})
export class BiometricAuthService {

  /**
   * Check if biometric authentication is available
   *
   * 💡 INTERVIEW: Always check availability before attempting authentication
   */
  async isAvailable(): Promise<BiometricAvailability> {
    try {
      const result = await NativeBiometric.isAvailable();

      return {
        isAvailable: result.isAvailable,
        biometricType: this.parseBiometricType(result.biometryType),
        strongBiometricAvailable: result.isAvailable,
        deviceCredentialAvailable: result.isAvailable,
      };
    } catch (error: any) {
      return {
        isAvailable: false,
        biometricType: BiometricType.NONE,
        strongBiometricAvailable: false,
        deviceCredentialAvailable: false,
        errorMessage: error.message || 'Biometric authentication not available',
      };
    }
  }

  /**
   * Authenticate user with biometric
   *
   * 💡 INTERVIEW: Biometric data never leaves secure hardware
   * Only success/failure is returned to the app
   */
  async authenticate(
    options: BiometricAuthOptions = {}
  ): Promise<BiometricAuthResult> {
    try {
      // Check availability first
      const availability = await this.isAvailable();

      if (!availability.isAvailable) {
        return {
          success: false,
          error: BiometricError.NOT_AVAILABLE,
          errorMessage: 'Biometric authentication not available',
        };
      }

      // Get user-friendly biometric name
      const biometricName = this.getBiometricTypeName(availability.biometricType);

      // Perform biometric authentication
      await NativeBiometric.verifyIdentity({
        reason: options.reason || \`Unlock with \${biometricName}\`,
        title: options.title || 'Biometric Authentication',
        subtitle: options.subtitle,
        description: options.description,
        negativeButtonText: options.cancelButtonText || 'Cancel',
        useFallback: options.useFallback || false,
        fallbackButtonText: options.fallbackButtonText || 'Use PIN',
        maxAttempts: options.maxAttempts || 5,
      });

      // Success
      return {
        success: true,
        biometricType: availability.biometricType,
      };

    } catch (error: any) {
      console.error('Biometric authentication failed:', error);

      // Parse error
      const biometricError = this.parseError(error);

      return {
        success: false,
        error: biometricError,
        errorMessage: error.message || 'Authentication failed',
      };
    }
  }

  /**
   * Set credentials in secure storage (Keychain/Keystore)
   *
   * 💡 INTERVIEW: Credentials are encrypted and tied to biometric authentication
   */
  async setCredentials(
    username: string,
    password: string,
    server: string = 'app.default.server'
  ): Promise<void> {
    try {
      await NativeBiometric.setCredentials({
        username,
        password,
        server,
      });

      console.log('Credentials saved to secure storage');
    } catch (error) {
      console.error('Failed to set credentials:', error);
      throw new Error('Failed to save credentials securely');
    }
  }

  /**
   * Get credentials from secure storage
   *
   * 💡 INTERVIEW: This triggers biometric authentication before returning credentials
   */
  async getCredentials(
    server: string = 'app.default.server'
  ): Promise<StoredCredentials> {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server,
      });

      return {
        username: credentials.username,
        password: credentials.password,
        server,
      };
    } catch (error) {
      console.error('Failed to get credentials:', error);
      throw new Error('Failed to retrieve credentials');
    }
  }

  /**
   * Delete stored credentials
   */
  async deleteCredentials(
    server: string = 'app.default.server'
  ): Promise<void> {
    try {
      await NativeBiometric.deleteCredentials({
        server,
      });

      console.log('Credentials deleted from secure storage');
    } catch (error) {
      console.error('Failed to delete credentials:', error);
    }
  }

  /**
   * Check if credentials exist
   */
  async hasCredentials(server: string = 'app.default.server'): Promise<boolean> {
    try {
      const credentials = await this.getCredentials(server);
      return !!credentials.username && !!credentials.password;
    } catch {
      return false;
    }
  }

  /**
   * Get user-friendly name for biometric type
   */
  getBiometricTypeName(type: BiometricType): string {
    switch (type) {
      case BiometricType.FACE_ID:
        return 'Face ID';
      case BiometricType.TOUCH_ID:
        return 'Touch ID';
      case BiometricType.FINGERPRINT:
        return 'Fingerprint';
      case BiometricType.FACE_AUTHENTICATION:
        return 'Face Recognition';
      case BiometricType.IRIS_AUTHENTICATION:
        return 'Iris Scanner';
      default:
        return 'Biometric';
    }
  }

  /**
   * Parse native biometric type to our enum
   */
  private parseBiometricType(type: BiometryType | undefined): BiometricType {
    switch (type) {
      case BiometryType.FACE_ID:
        return BiometricType.FACE_ID;
      case BiometryType.TOUCH_ID:
        return BiometricType.TOUCH_ID;
      case BiometryType.FINGERPRINT:
        return BiometricType.FINGERPRINT;
      case BiometryType.FACE_AUTHENTICATION:
        return BiometricType.FACE_AUTHENTICATION;
      case BiometryType.IRIS_AUTHENTICATION:
        return BiometricType.IRIS_AUTHENTICATION;
      default:
        return BiometricType.NONE;
    }
  }

  /**
   * Parse error to BiometricError enum
   */
  private parseError(error: any): BiometricError {
    const message = error.message?.toLowerCase() || '';

    if (message.includes('not available')) {
      return BiometricError.NOT_AVAILABLE;
    } else if (message.includes('not enrolled') || message.includes('no biometry')) {
      return BiometricError.NOT_ENROLLED;
    } else if (message.includes('cancel')) {
      return BiometricError.USER_CANCEL;
    } else if (message.includes('too many attempts')) {
      return BiometricError.TOO_MANY_ATTEMPTS;
    } else if (message.includes('lockout') || message.includes('locked')) {
      return BiometricError.LOCKOUT;
    } else if (message.includes('failed')) {
      return BiometricError.AUTHENTICATION_FAILED;
    } else {
      return BiometricError.SYSTEM_ERROR;
    }
  }
}`,
          description: 'Complete biometric authentication service with error handling',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Biometric Error Handling Example',
          code: `/**
 * Biometric Error Handling
 *
 * 💡 INTERVIEW: Provide user-friendly error messages and appropriate fallbacks
 */

async handleBiometricAuth(): Promise<void> {
  const result = await this.biometricAuth.authenticate({
    reason: 'Unlock app to continue',
  });

  if (result.success) {
    // Authentication successful
    console.log('User authenticated with', result.biometricType);
    this.navigateToApp();
  } else {
    // Handle specific errors
    switch (result.error) {
      case BiometricError.NOT_AVAILABLE:
        // Biometric not available - show PIN fallback
        this.showMessage('Biometric authentication not available. Please use PIN.');
        this.showPINAuth();
        break;

      case BiometricError.NOT_ENROLLED:
        // User hasn't enrolled biometric - show settings prompt
        this.showMessage('No biometric data enrolled. Please set up Face ID/Touch ID in Settings.');
        this.showPINAuth();
        break;

      case BiometricError.USER_CANCEL:
        // User cancelled - do nothing or show message
        console.log('User cancelled authentication');
        break;

      case BiometricError.TOO_MANY_ATTEMPTS:
        // Too many failed attempts - enforce cooldown
        this.showMessage('Too many failed attempts. Please try again later.');
        this.enforceCooldown();
        break;

      case BiometricError.LOCKOUT:
        // Biometric locked out - fallback to PIN
        this.showMessage('Biometric authentication locked. Please use PIN.');
        this.showPINAuth();
        break;

      case BiometricError.AUTHENTICATION_FAILED:
        // Authentication failed - allow retry
        this.showMessage('Authentication failed. Please try again.');
        this.incrementFailedAttempts();
        break;

      default:
        // Unknown error - show PIN fallback
        this.showMessage('An error occurred. Please use PIN.');
        this.showPINAuth();
        break;
    }
  }
}`,
          description: 'Comprehensive error handling for biometric authentication',
          copyable: true,
        },
      ],
      interviewTips: [
        'Biometric data never leaves Secure Enclave/TEE - only success/failure is returned',
        'Always check isAvailable() before attempting authentication to handle missing hardware',
        'Provide clear, user-friendly error messages for each failure type (NOT_ENROLLED, LOCKOUT, etc.)',
        'Store credentials in Keychain/Keystore tied to biometric - requires unlock to retrieve',
        'Parse errors into specific types to provide appropriate fallbacks (PIN, Settings, retry)',
      ],
    },
    {
      id: 253,
      title: 'PIN Authentication',
      content: `
        <h2>PIN Authentication with Secure Hashing</h2>
        <p>PIN codes provide a fallback authentication method when biometric is unavailable, disabled, or locked out. PINs must be stored securely using cryptographic hashing with salt.</p>

        <h3>Why Hash PINs?</h3>
        <ul>
          <li><strong>Prevent Plaintext Storage:</strong> If database is compromised, attacker gets hash, not PIN</li>
          <li><strong>One-Way Function:</strong> Hash can't be reversed to original PIN</li>
          <li><strong>Salt Prevents Rainbow Tables:</strong> Pre-computed hash tables are useless</li>
          <li><strong>Slow Hashing:</strong> bcrypt is intentionally slow to prevent brute-force (100ms per hash)</li>
        </ul>

        <h3>bcrypt vs SHA-256</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>bcrypt</th>
            <th>SHA-256</th>
          </tr>
          <tr>
            <td>Speed</td>
            <td>~100ms (slow by design)</td>
            <td>Microseconds (too fast)</td>
          </tr>
          <tr>
            <td>Salting</td>
            <td>Built-in automatic salting</td>
            <td>Must implement manually</td>
          </tr>
          <tr>
            <td>Work Factor</td>
            <td>Configurable (10 rounds = 2^10 iterations)</td>
            <td>Fixed (1 iteration)</td>
          </tr>
          <tr>
            <td>GPU Resistance</td>
            <td>High (memory-hard)</td>
            <td>Low (GPU can compute billions/sec)</td>
          </tr>
          <tr>
            <td>Best For</td>
            <td>Passwords, PINs</td>
            <td>File hashing, checksums</td>
          </tr>
        </table>

        <h3>PIN Security Features</h3>
        <ul>
          <li><strong>Hash with bcrypt:</strong> Use 10 salt rounds (2^10 = 1024 iterations)</li>
          <li><strong>Unique Salt:</strong> Automatically generated per PIN</li>
          <li><strong>Constant-Time Comparison:</strong> bcrypt.compare() prevents timing attacks</li>
          <li><strong>Failed Attempt Tracking:</strong> Limit to 5 attempts before lockout</li>
          <li><strong>Lockout:</strong> 5-minute temporary lockout after max attempts</li>
          <li><strong>Weak PIN Rejection:</strong> Block 1234, 0000, sequential patterns</li>
        </ul>

        <h3>PIN Validation Rules</h3>
        <ul>
          <li>4-6 digits only (numeric)</li>
          <li>No repeating digits (0000, 1111, etc.)</li>
          <li>No sequential patterns (1234, 4321, 0123)</li>
          <li>Not common PINs (top 10 most common)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'pin-auth.service.ts - Secure PIN Hashing',
          code: `// src/app/core/services/biometric/pin-auth.service.ts

import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from '@capacitor-community/secure-storage';
import * as bcrypt from 'bcryptjs';

/**
 * PIN Authentication Service
 *
 * Handles PIN setup, verification, and secure storage
 * with bcrypt hashing and salting
 *
 * 💡 INTERVIEW: Never store PINs in plaintext - always hash with salt
 */
@Injectable({
  providedIn: 'root'
})
export class PinAuthService {
  private readonly PIN_KEY = 'app_pin_hash';
  private readonly SALT_ROUNDS = 10;        // bcrypt salt rounds (2^10 iterations)
  private failedAttempts = 0;
  private readonly MAX_ATTEMPTS = 5;
  private lockoutUntil?: Date;

  constructor(private secureStorage: SecureStoragePlugin) {}

  /**
   * Set PIN with secure hashing
   *
   * 💡 INTERVIEW: Use bcrypt with salt to hash PIN before storage
   */
  async setPIN(pin: string): Promise<void> {
    // Validate PIN format
    if (!this.validatePIN(pin)) {
      throw new Error('Invalid PIN format. Must be 4-6 digits.');
    }

    try {
      // Generate salt and hash PIN
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      const hash = await bcrypt.hash(pin, salt);

      // Store hash in secure storage
      await this.secureStorage.set({
        key: this.PIN_KEY,
        value: hash,
      });

      console.log('PIN set successfully');
      this.resetFailedAttempts();
    } catch (error) {
      console.error('Failed to set PIN:', error);
      throw new Error('Failed to save PIN securely');
    }
  }

  /**
   * Verify PIN against stored hash
   *
   * 💡 INTERVIEW: Use constant-time comparison to prevent timing attacks
   */
  async verifyPIN(pin: string): Promise<boolean> {
    // Check if locked out
    if (this.isLockedOut()) {
      const remainingTime = Math.ceil(
        ((this.lockoutUntil?.getTime() || 0) - Date.now()) / 1000
      );
      throw new Error(\`Too many failed attempts. Please wait \${remainingTime} seconds.\`);
    }

    // Check max attempts
    if (this.failedAttempts >= this.MAX_ATTEMPTS) {
      this.lockout();
      throw new Error('Maximum PIN attempts exceeded. Account locked for 5 minutes.');
    }

    try {
      // Get stored hash
      const result = await this.secureStorage.get({ key: this.PIN_KEY });
      const storedHash = result.value;

      if (!storedHash) {
        throw new Error('PIN not set');
      }

      // Compare PIN with hash (constant-time comparison)
      const isValid = await bcrypt.compare(pin, storedHash);

      if (isValid) {
        this.resetFailedAttempts();
        return true;
      } else {
        this.failedAttempts++;
        console.warn(\`Failed PIN attempt \${this.failedAttempts}/\${this.MAX_ATTEMPTS}\`);
        return false;
      }
    } catch (error) {
      console.error('PIN verification failed:', error);
      throw error;
    }
  }

  /**
   * Check if PIN is set
   */
  async hasPIN(): Promise<boolean> {
    try {
      const result = await this.secureStorage.get({ key: this.PIN_KEY });
      return !!result.value;
    } catch {
      return false;
    }
  }

  /**
   * Change PIN (requires old PIN verification)
   */
  async changePIN(oldPIN: string, newPIN: string): Promise<void> {
    const isValid = await this.verifyPIN(oldPIN);
    if (!isValid) {
      throw new Error('Current PIN is incorrect');
    }

    await this.setPIN(newPIN);
  }

  /**
   * Remove PIN
   */
  async removePIN(): Promise<void> {
    try {
      await this.secureStorage.remove({ key: this.PIN_KEY });
      this.resetFailedAttempts();
      console.log('PIN removed successfully');
    } catch (error) {
      console.error('Failed to remove PIN:', error);
      throw new Error('Failed to remove PIN');
    }
  }

  /**
   * Validate PIN format (4-6 digits)
   *
   * 💡 INTERVIEW: Reject weak PINs to improve security
   */
  private validatePIN(pin: string): boolean {
    // Must be 4-6 digits
    if (!/^\\d{4,6}$/.test(pin)) {
      return false;
    }

    // Reject weak PINs (sequential, repeating)
    const weakPINs = [
      '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',
      '1234', '4321', '0123', '3210',
      '123456', '654321', '000000', '111111',
    ];

    if (weakPINs.includes(pin)) {
      return false;
    }

    return true;
  }

  /**
   * Get remaining attempts before lockout
   */
  getRemainingAttempts(): number {
    return Math.max(0, this.MAX_ATTEMPTS - this.failedAttempts);
  }

  /**
   * Reset failed attempts counter
   */
  resetFailedAttempts(): void {
    this.failedAttempts = 0;
    this.lockoutUntil = undefined;
  }

  /**
   * Check if account is locked out
   */
  isLockedOut(): boolean {
    if (!this.lockoutUntil) {
      return false;
    }
    return Date.now() < this.lockoutUntil.getTime();
  }

  /**
   * Lockout account for 5 minutes
   */
  private lockout(): void {
    this.lockoutUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    console.warn('Account locked out until', this.lockoutUntil);
  }
}`,
          description: 'PIN authentication service with bcrypt hashing and lockout',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Why bcrypt for PIN Hashing?',
          code: `/**
 * bcrypt vs SHA-256 for PIN Hashing
 *
 * 💡 INTERVIEW: bcrypt is designed for password/PIN hashing, SHA-256 is not
 */

// ❌ BAD: SHA-256 (fast = easily brute-forced)
import { SHA256 } from 'crypto-js';

const badPINHash = SHA256(pin).toString();
// Problem: SHA-256 can compute BILLIONS of hashes per second on GPU
// A 4-digit PIN (10,000 combinations) can be cracked in milliseconds

// ✅ GOOD: bcrypt (slow = brute-force resistant)
import * as bcrypt from 'bcryptjs';

const salt = await bcrypt.genSalt(10); // 2^10 = 1024 iterations
const goodPINHash = await bcrypt.hash(pin, salt);
// Each hash takes ~100ms
// A 4-digit PIN would take ~16 minutes to brute-force
// (10,000 combinations × 100ms = 1,000 seconds = 16.7 minutes)

/**
 * bcrypt Advantages:
 *
 * 1. Slow by Design:
 *    - Intentionally CPU-intensive (prevents brute-force)
 *    - Configurable work factor (can increase over time)
 *
 * 2. Built-in Salting:
 *    - Salt automatically generated and stored with hash
 *    - Each PIN has unique hash (even if PINs are identical)
 *
 * 3. Constant-Time Comparison:
 *    - bcrypt.compare() prevents timing attacks
 *    - Compares in constant time regardless of match location
 *
 * 4. GPU Resistance:
 *    - Memory-hard algorithm (difficult to parallelize on GPU)
 *    - SHA-256 can be accelerated 1000x on GPU
 *
 * 5. Future-Proof:
 *    - Work factor can be increased as hardware improves
 *    - SHA-256 speed increases with hardware (less secure over time)
 */

// Verification with constant-time comparison
const isValid = await bcrypt.compare(inputPIN, storedHash);

// ❌ NEVER use === for hash comparison (timing attack vulnerable)
if (SHA256(inputPIN).toString() === storedHash) {
  // Timing attack: Comparison time reveals match position
}

/**
 * Alternative: Argon2 (even better than bcrypt)
 *
 * Argon2 won the Password Hashing Competition (2015)
 * - More secure than bcrypt
 * - Better GPU/ASIC resistance
 * - Configurable memory usage
 *
 * For mobile apps, bcrypt is ideal balance of security and performance.
 */`,
          description: 'Why bcrypt is superior to SHA-256 for PIN hashing',
          copyable: true,
        },
      ],
      interviewTips: [
        'bcrypt is intentionally slow (~100ms/hash) to prevent brute-force attacks on PINs',
        'Salt prevents rainbow table attacks - each PIN hash is unique even for identical PINs',
        'Use bcrypt.compare() for constant-time comparison to prevent timing attacks',
        'Limit failed attempts (5 max) with temporary lockout (5 minutes) to prevent brute-force',
        'Reject weak PINs (1234, 0000, sequential) to improve security despite low entropy',
      ],
    },
    {
      id: 254,
      title: 'App Lock Implementation',
      content: `
        <h2>App Lock Service</h2>
        <p>The AppLockService manages the complete app locking/unlocking lifecycle, including launch locks, background locks, and auto-lock timeouts.</p>

        <h3>App Lock Features</h3>
        <ul>
          <li><strong>Lock on Launch:</strong> App starts locked, requires authentication</li>
          <li><strong>Lock on Background:</strong> Lock when app goes to background (configurable)</li>
          <li><strong>Auto-Lock Timeout:</strong> Lock after inactivity (15s - 15min configurable)</li>
          <li><strong>Activity Reset:</strong> User touches reset auto-lock timer</li>
          <li><strong>Configuration Persistence:</strong> Settings saved in secure storage</li>
          <li><strong>Session Integration:</strong> Lock ends session, unlock starts session</li>
        </ul>

        <h3>Lifecycle Events</h3>
        <ul>
          <li><strong>App Launch:</strong> Initialize locked state from config</li>
          <li><strong>App Pause (iOS):</strong> platform.pause event fires when backgrounded</li>
          <li><strong>App Resume (iOS):</strong> platform.resume event fires when foregrounded</li>
          <li><strong>App State Change (Capacitor):</strong> App.appStateChange with isActive flag</li>
          <li><strong>User Activity:</strong> Touch/click events reset auto-lock timer</li>
        </ul>

        <h3>Lock/Unlock Flow</h3>
        <pre><code>App Launch (locked = true)
  ↓
User unlocks with biometric/PIN
  ↓
isLocked = false, start session, start timer
  ↓
User inactive for 30s (configurable)
  ↓
Auto-lock triggered → isLocked = true
  ↓
User touches screen
  ↓
Lock screen shown, biometric prompt
  ↓
Success → isLocked = false, reset timer</code></pre>

        <h3>Configuration Options</h3>
        <ul>
          <li><strong>enabled:</strong> App lock on/off</li>
          <li><strong>useBiometric:</strong> Enable biometric authentication</li>
          <li><strong>usePIN:</strong> Enable PIN authentication</li>
          <li><strong>autoLockTimeout:</strong> Seconds of inactivity (15s - 15min)</li>
          <li><strong>lockOnBackground:</strong> Lock immediately when backgrounded</li>
          <li><strong>maxFailedAttempts:</strong> Max unlock attempts before lockout</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li><strong>Banking Apps:</strong> Lock immediately on background, 30s-5min timeout</li>
          <li><strong>Password Managers:</strong> Lock on every app switch, no session persistence</li>
          <li><strong>Social Apps:</strong> Longer timeout (15min), optional background lock</li>
          <li><strong>Enterprise Apps:</strong> Policy-enforced timeout, mandatory lock on background</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'app-lock.service.ts - Complete Implementation',
          code: `// src/app/core/services/biometric/app-lock.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { BiometricAuthService } from './biometric-auth.service';
import { PinAuthService } from './pin-auth.service';
import { SessionManagerService } from './session-manager.service';
import { SecureStoragePlugin } from '@capacitor-community/secure-storage';
import { AppLockConfig } from './biometric.models';

/**
 * App Lock Service
 *
 * Manages app locking/unlocking with biometric and PIN authentication
 * Handles app lifecycle (launch, background, foreground)
 *
 * 💡 INTERVIEW: This service coordinates all app security features
 */
@Injectable({
  providedIn: 'root'
})
export class AppLockService {
  private config$ = new BehaviorSubject<AppLockConfig>({
    enabled: false,
    useBiometric: true,
    usePIN: true,
    autoLockTimeout: 30,        // 30 seconds default
    lockOnBackground: true,
    maxFailedAttempts: 5,
  });

  private isLocked$ = new BehaviorSubject<boolean>(true);
  private lockTimer?: any;
  private backgroundTime?: Date;

  private readonly CONFIG_KEY = 'app_lock_config';

  constructor(
    private biometric: BiometricAuthService,
    private pinAuth: PinAuthService,
    private sessionManager: SessionManagerService,
    private secureStorage: SecureStoragePlugin,
    private platform: Platform
  ) {
    this.initialize();
  }

  /**
   * Initialize app lock
   *
   * 💡 INTERVIEW: Load config and setup lifecycle listeners on startup
   */
  private async initialize(): Promise<void> {
    await this.platform.ready();

    // Load config from storage
    const config = await this.loadConfig();
    if (config) {
      this.config$.next(config);
    }

    // Setup app lifecycle listeners
    this.setupLifecycleListeners();

    // Lock app on initialization if enabled
    if (config?.enabled) {
      this.lock();
    } else {
      this.isLocked$.next(false);
    }
  }

  /**
   * Setup app lifecycle listeners
   *
   * 💡 INTERVIEW: Monitor app state to lock/unlock appropriately
   */
  private setupLifecycleListeners(): void {
    // Capacitor app state listener
    App.addListener('appStateChange', (state) => {
      if (!state.isActive && this.config$.value.lockOnBackground) {
        this.backgroundTime = new Date();
        console.log('App backgrounded at', this.backgroundTime);
      }

      if (state.isActive && this.backgroundTime) {
        this.handleAppResume();
      }
    });

    // Ionic platform listeners
    this.platform.pause.subscribe(() => {
      if (this.config$.value.lockOnBackground) {
        this.backgroundTime = new Date();
      }
    });

    this.platform.resume.subscribe(() => {
      this.handleAppResume();
    });
  }

  /**
   * Handle app resume from background
   *
   * 💡 INTERVIEW: Lock app if backgrounded longer than timeout
   */
  private handleAppResume(): void {
    if (!this.backgroundTime || !this.config$.value.enabled) {
      return;
    }

    const backgroundDuration =
      (new Date().getTime() - this.backgroundTime.getTime()) / 1000;

    console.log('App resumed. Backgrounded for', backgroundDuration, 'seconds');

    if (backgroundDuration >= this.config$.value.autoLockTimeout) {
      console.log('Auto-lock timeout exceeded. Locking app.');
      this.lock();
    }

    this.backgroundTime = undefined;
  }

  /**
   * Lock the app
   */
  lock(): void {
    console.log('App locked');
    this.isLocked$.next(true);
    this.sessionManager.endSession();
    this.resetLockTimer();
  }

  /**
   * Unlock the app with biometric
   */
  async unlock(): Promise<boolean> {
    const config = this.config$.value;

    if (!config.enabled) {
      this.isLocked$.next(false);
      return true;
    }

    let authenticated = false;

    // Try biometric first
    if (config.useBiometric) {
      const biometricAvailable = await this.biometric.isAvailable();
      if (biometricAvailable.isAvailable) {
        const result = await this.biometric.authenticate({
          reason: 'Unlock app to continue',
        });
        authenticated = result.success;
      }
    }

    if (authenticated) {
      this.isLocked$.next(false);
      await this.sessionManager.startSession(undefined, true);
      this.startLockTimer();
      return true;
    }

    return false;
  }

  /**
   * Unlock with PIN
   */
  async unlockWithPIN(pin: string): Promise<boolean> {
    try {
      const isValid = await this.pinAuth.verifyPIN(pin);

      if (isValid) {
        this.isLocked$.next(false);
        await this.sessionManager.startSession(undefined, false);
        this.startLockTimer();
        return true;
      }

      return false;
    } catch (error) {
      console.error('PIN unlock failed:', error);
      throw error;
    }
  }

  /**
   * Start auto-lock timer
   *
   * 💡 INTERVIEW: Timer resets on user activity to prevent premature lock
   */
  private startLockTimer(): void {
    this.resetLockTimer();

    const timeout = this.config$.value.autoLockTimeout * 1000;
    this.lockTimer = setTimeout(() => {
      console.log('Auto-lock timeout reached. Locking app.');
      this.lock();
    }, timeout);
  }

  /**
   * Reset lock timer
   */
  private resetLockTimer(): void {
    if (this.lockTimer) {
      clearTimeout(this.lockTimer);
      this.lockTimer = undefined;
    }
  }

  /**
   * Reset auto-lock timer on user activity
   */
  resetAutoLockTimer(): void {
    if (!this.isLocked$.value && this.config$.value.enabled) {
      this.startLockTimer();
    }
  }

  /**
   * Update configuration
   */
  async updateConfig(config: Partial<AppLockConfig>): Promise<void> {
    const current = this.config$.value;
    const updated = { ...current, ...config };
    this.config$.next(updated);
    await this.saveConfig(updated);

    if (!updated.enabled) {
      this.isLocked$.next(false);
      this.resetLockTimer();
    }

    if (updated.enabled && !current.enabled) {
      this.lock();
    }
  }

  /**
   * Get configuration
   */
  getConfig(): Observable<AppLockConfig> {
    return this.config$.asObservable();
  }

  /**
   * Check if app is locked
   */
  isLocked(): Observable<boolean> {
    return this.isLocked$.asObservable();
  }

  /**
   * Get locked state (synchronous)
   */
  get locked(): boolean {
    return this.isLocked$.value;
  }

  /**
   * Save configuration to secure storage
   */
  private async saveConfig(config: AppLockConfig): Promise<void> {
    try {
      await this.secureStorage.set({
        key: this.CONFIG_KEY,
        value: JSON.stringify(config),
      });
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }

  /**
   * Load configuration from secure storage
   */
  private async loadConfig(): Promise<AppLockConfig | null> {
    try {
      const result = await this.secureStorage.get({ key: this.CONFIG_KEY });
      return result.value ? JSON.parse(result.value) : null;
    } catch {
      return null;
    }
  }
}`,
          description: 'Complete app lock service with lifecycle management',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'app.component.ts - Lock Screen Integration',
          code: `// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLockService } from '@app/core/services/biometric/app-lock.service';

/**
 * App Component with Lock Screen Integration
 *
 * 💡 INTERVIEW: Monitor lock state and show/hide lock screen
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  isLocked$ = this.appLock.isLocked();

  constructor(
    private appLock: AppLockService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Subscribe to lock state changes
    this.isLocked$.subscribe(isLocked => {
      if (isLocked) {
        // Navigate to lock screen
        this.router.navigate(['/lock-screen']);
      } else {
        // Navigate to home or last route
        this.router.navigate(['/home']);
      }
    });

    // Reset auto-lock timer on user activity
    document.addEventListener('touchstart', () => {
      this.appLock.resetAutoLockTimer();
    });

    document.addEventListener('click', () => {
      this.appLock.resetAutoLockTimer();
    });

    document.addEventListener('scroll', () => {
      this.appLock.resetAutoLockTimer();
    });
  }
}`,
          description: 'App component integration with auto-lock timer reset',
          copyable: true,
        },
      ],
      interviewTips: [
        'App lock is UI-level security (hides content), session timeout is API-level security (invalidates tokens)',
        'Monitor both Capacitor (App.appStateChange) and Ionic (platform.pause/resume) lifecycle events',
        'Reset auto-lock timer on user activity (touch, click, scroll) to prevent premature lock',
        'Lock immediately on background for high-security apps (banking), timeout for others (social)',
        'Persist configuration in secure storage to survive app restarts',
      ],
    },
    {
      id: 255,
      title: 'Lock Screen UI',
      content: `
        <h2>Lock Screen Component</h2>
        <p>The lock screen provides a user-friendly interface for unlocking the app with biometric or PIN authentication, with clear error messaging and accessibility.</p>

        <h3>UI Features</h3>
        <ul>
          <li><strong>App Logo/Icon:</strong> Visual branding and app identification</li>
          <li><strong>Biometric Button:</strong> Show Face ID/Touch ID/Fingerprint unlock option</li>
          <li><strong>PIN Input:</strong> Fallback numeric keypad for PIN entry</li>
          <li><strong>Error Messages:</strong> Clear feedback for failed attempts</li>
          <li><strong>Remaining Attempts:</strong> Show attempts left before lockout</li>
          <li><strong>Lockout Timer:</strong> Display countdown during lockout period</li>
          <li><strong>Toggle Biometric/PIN:</strong> Easy switch between auth methods</li>
        </ul>

        <h3>User Experience Best Practices</h3>
        <ul>
          <li>Show biometric prompt automatically if available</li>
          <li>Provide "Use PIN" button for manual fallback</li>
          <li>Display clear error messages (not error codes)</li>
          <li>Vibrate or animate on failure for haptic feedback</li>
          <li>Show remaining attempts to prevent lockout surprise</li>
          <li>Auto-switch to PIN after 3 biometric failures</li>
        </ul>

        <h3>Accessibility Considerations</h3>
        <ul>
          <li>Some users can't use biometric (disabilities, injuries)</li>
          <li>Screen readers should announce unlock methods</li>
          <li>Large touch targets for PIN keypad</li>
          <li>High contrast for error messages</li>
          <li>Keyboard navigation support (for web)</li>
        </ul>

        <h3>Error Messaging Examples</h3>
        <table>
          <tr>
            <th>Error</th>
            <th>User Message</th>
          </tr>
          <tr>
            <td>NOT_AVAILABLE</td>
            <td>"Biometric not available. Please use PIN."</td>
          </tr>
          <tr>
            <td>NOT_ENROLLED</td>
            <td>"No biometric data enrolled. Set up Face ID in Settings."</td>
          </tr>
          <tr>
            <td>AUTHENTICATION_FAILED</td>
            <td>"Authentication failed. Try again or use PIN."</td>
          </tr>
          <tr>
            <td>TOO_MANY_ATTEMPTS</td>
            <td>"Too many failed attempts. Please use PIN."</td>
          </tr>
          <tr>
            <td>LOCKOUT</td>
            <td>"Account locked for 5 minutes. Please wait."</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'lock-screen.component.ts - Complete Lock Screen',
          code: `// src/app/features/security/components/lock-screen/lock-screen.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppLockService } from '@app/core/services/biometric/app-lock.service';
import { BiometricAuthService } from '@app/core/services/biometric/biometric-auth.service';
import { PinAuthService } from '@app/core/services/biometric/pin-auth.service';
import { BiometricType, BiometricError } from '@app/core/services/biometric/biometric.models';

/**
 * Lock Screen Component
 *
 * User-friendly unlock UI with biometric and PIN options
 *
 * 💡 INTERVIEW: Lock screen should be first thing users see when app is locked
 */
@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
})
export class LockScreenComponent implements OnInit {
  biometricAvailable = false;
  pinAvailable = false;
  biometricName = 'Biometric';
  biometricIcon = 'finger-print';
  unlockMessage = '';
  isUnlocking = false;
  failedAttempts = 0;
  showPINInput = false;
  errorMessage?: string;
  remainingAttempts = 5;
  isLockedOut = false;
  lockoutRemaining = 0;

  constructor(
    private appLock: AppLockService,
    private biometric: BiometricAuthService,
    private pinAuth: PinAuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.checkAvailability();
  }

  /**
   * Check biometric and PIN availability
   */
  async checkAvailability() {
    // Check biometric
    const biometricInfo = await this.biometric.isAvailable();
    this.biometricAvailable = biometricInfo.isAvailable;

    if (this.biometricAvailable) {
      this.biometricName = this.biometric.getBiometricTypeName(
        biometricInfo.biometricType
      );

      this.biometricIcon = this.getBiometricIcon(biometricInfo.biometricType);

      this.unlockMessage = \`Use \${this.biometricName} to unlock\`;
    }

    // Check PIN
    this.pinAvailable = await this.pinAuth.hasPIN();

    // Auto-show PIN if no biometric
    if (!this.biometricAvailable && this.pinAvailable) {
      this.showPINInput = true;
    }
  }

  /**
   * Unlock with biometric
   */
  async unlockWithBiometric() {
    this.isUnlocking = true;
    this.errorMessage = undefined;

    try {
      const result = await this.biometric.authenticate({
        reason: 'Unlock app to continue',
        title: 'Authentication Required',
      });

      if (result.success) {
        await this.handleUnlockSuccess();
      } else {
        this.handleBiometricError(result.error);
      }
    } catch (error) {
      console.error('Biometric unlock failed:', error);
      this.showPINInput = true;
    } finally {
      this.isUnlocking = false;
    }
  }

  /**
   * Unlock with PIN
   */
  async unlockWithPIN(pin: string) {
    this.isUnlocking = true;
    this.errorMessage = undefined;

    try {
      const success = await this.appLock.unlockWithPIN(pin);

      if (success) {
        await this.handleUnlockSuccess();
      } else {
        this.handleUnlockFailure();
        this.remainingAttempts = this.pinAuth.getRemainingAttempts();
      }
    } catch (error: any) {
      console.error('PIN unlock failed:', error);
      this.errorMessage = error.message;

      if (this.pinAuth.isLockedOut()) {
        this.isLockedOut = true;
        this.startLockoutTimer();
      }
    } finally {
      this.isUnlocking = false;
    }
  }

  /**
   * Handle unlock success
   */
  private async handleUnlockSuccess() {
    await this.showToast('Unlocked successfully', 'success');
    this.router.navigate(['/home']);
  }

  /**
   * Handle unlock failure
   */
  private handleUnlockFailure() {
    this.failedAttempts++;
    this.errorMessage = 'Incorrect PIN. Please try again.';
    this.showToast('Authentication failed', 'danger');
  }

  /**
   * Handle biometric error
   */
  private handleBiometricError(error?: BiometricError) {
    switch (error) {
      case BiometricError.NOT_ENROLLED:
        this.showToast('No biometric data enrolled. Please use PIN.', 'warning');
        this.showPINInput = true;
        break;

      case BiometricError.USER_CANCEL:
        // User cancelled - do nothing
        break;

      case BiometricError.TOO_MANY_ATTEMPTS:
      case BiometricError.LOCKOUT:
        this.showToast('Biometric locked. Please use PIN.', 'danger');
        this.showPINInput = true;
        break;

      case BiometricError.AUTHENTICATION_FAILED:
        this.failedAttempts++;
        this.showToast('Authentication failed. Try again.', 'danger');
        break;

      default:
        this.showToast('Biometric unavailable. Please use PIN.', 'warning');
        this.showPINInput = true;
        break;
    }
  }

  /**
   * Start lockout countdown timer
   */
  private startLockoutTimer() {
    const interval = setInterval(() => {
      if (!this.pinAuth.isLockedOut()) {
        this.isLockedOut = false;
        clearInterval(interval);
        this.errorMessage = undefined;
      } else {
        this.lockoutRemaining = Math.ceil(
          ((this.pinAuth as any).lockoutUntil?.getTime() - Date.now()) / 1000
        );
      }
    }, 1000);
  }

  /**
   * Get biometric icon
   */
  private getBiometricIcon(type: BiometricType): string {
    switch (type) {
      case BiometricType.FACE_ID:
      case BiometricType.FACE_AUTHENTICATION:
        return 'scan';
      case BiometricType.TOUCH_ID:
      case BiometricType.FINGERPRINT:
        return 'finger-print';
      case BiometricType.IRIS_AUTHENTICATION:
        return 'eye';
      default:
        return 'shield-checkmark';
    }
  }

  /**
   * Show toast message
   */
  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}`,
          description: 'Complete lock screen component with error handling',
          copyable: true,
        },
        {
          id: 2,
          language: 'html',
          title: 'lock-screen.component.html - Lock Screen Template',
          code: `<!-- Lock Screen Template -->
<ion-content class="lock-screen">
  <div class="lock-container">
    <!-- App Logo -->
    <div class="app-logo">
      <ion-icon name="lock-closed" size="large"></ion-icon>
    </div>

    <!-- App Name -->
    <h2>App Locked</h2>
    <p *ngIf="biometricAvailable">{{ unlockMessage }}</p>

    <!-- Biometric Unlock Button -->
    <ion-button
      *ngIf="biometricAvailable && !showPINInput"
      expand="block"
      size="large"
      (click)="unlockWithBiometric()"
      [disabled]="isUnlocking"
    >
      <ion-icon [name]="biometricIcon" slot="start"></ion-icon>
      Unlock with {{ biometricName }}
    </ion-button>

    <!-- PIN Input -->
    <app-pin-input
      *ngIf="showPINInput"
      [pinLength]="4"
      [errorMessage]="errorMessage"
      [remainingAttempts]="remainingAttempts"
      [showBiometricFallback]="biometricAvailable"
      [biometricName]="biometricName"
      (pinEntered)="unlockWithPIN($event)"
      (biometricFallback)="unlockWithBiometric()"
    ></app-pin-input>

    <!-- Use PIN Button -->
    <ion-button
      *ngIf="pinAvailable && !showPINInput"
      expand="block"
      fill="outline"
      size="large"
      (click)="showPINInput = true"
      [disabled]="isUnlocking"
    >
      <ion-icon name="keypad" slot="start"></ion-icon>
      Use PIN
    </ion-button>

    <!-- Failed Attempts Warning -->
    <ion-note color="danger" *ngIf="failedAttempts > 0 && !showPINInput">
      {{ failedAttempts }} failed attempt(s)
    </ion-note>

    <!-- Lockout Message -->
    <ion-note color="danger" *ngIf="isLockedOut">
      Too many failed attempts. Please wait {{ lockoutRemaining }} seconds.
    </ion-note>
  </div>
</ion-content>`,
          description: 'Lock screen HTML template with biometric and PIN options',
          copyable: true,
        },
      ],
      interviewTips: [
        'Auto-show biometric prompt if available, but provide easy PIN fallback button',
        'Display remaining attempts to warn users before lockout (transparency builds trust)',
        'Switch to PIN automatically after 3 biometric failures to improve UX',
        'Show clear, user-friendly error messages (not technical error codes)',
        'Handle all error types with appropriate fallbacks (NOT_ENROLLED → prompt Settings)',
      ],
    },
    {
      id: 256,
      title: 'Security Settings',
      content: `
        <h2>Security Settings Component</h2>
        <p>The security settings panel allows users to configure app lock, biometric authentication, PIN, and auto-lock timeout preferences.</p>

        <h3>Configuration Options</h3>
        <ul>
          <li><strong>Enable App Lock:</strong> Master toggle for all locking features</li>
          <li><strong>Biometric Toggle:</strong> Enable/disable Face ID/Touch ID/Fingerprint</li>
          <li><strong>Set/Change PIN:</strong> Configure or update PIN code</li>
          <li><strong>Auto-Lock Timeout:</strong> Choose inactivity duration (15s - 15min)</li>
          <li><strong>Lock on Background:</strong> Toggle immediate lock when app backgrounds</li>
        </ul>

        <h3>User Experience</h3>
        <ul>
          <li>Show biometric name (Face ID, Touch ID, etc.) instead of generic "Biometric"</li>
          <li>Display availability status (green badge if enabled)</li>
          <li>Explain each setting with subtitle text</li>
          <li>Provide security info section with privacy details</li>
          <li>Save settings automatically on change</li>
        </ul>

        <h3>Privacy Information</h3>
        <p>Settings should include clear privacy statements:</p>
        <ul>
          <li>"Your biometric data is stored securely on your device and never transmitted to our servers."</li>
          <li>"We use device-native secure hardware (Secure Enclave / TEE) for authentication."</li>
          <li>"PINs are hashed with bcrypt and salt before storage. Your PIN is never stored in plaintext."</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Make settings easy to find (in main menu or profile)</li>
          <li>Use toggle switches for binary options</li>
          <li>Use select/picker for multiple options (timeout)</li>
          <li>Show current values clearly</li>
          <li>Provide instant feedback on save</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'security-settings.component.ts - Settings Panel',
          code: `// src/app/features/security/components/security-settings/security-settings.component.ts

import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AppLockService } from '@app/core/services/biometric/app-lock.service';
import { BiometricAuthService } from '@app/core/services/biometric/biometric-auth.service';
import { PinAuthService } from '@app/core/services/biometric/pin-auth.service';
import { AppLockConfig } from '@app/core/services/biometric/biometric.models';

/**
 * Security Settings Component
 *
 * Configure app lock, biometric auth, and PIN
 *
 * 💡 INTERVIEW: Settings should be easy to find and configure
 */
@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss'],
})
export class SecuritySettingsComponent implements OnInit {
  config: AppLockConfig = {
    enabled: false,
    useBiometric: true,
    usePIN: true,
    autoLockTimeout: 30,
    lockOnBackground: true,
    maxFailedAttempts: 5,
  };

  biometricAvailable = false;
  biometricName = 'Biometric';
  biometricIcon = 'finger-print';
  hasPIN = false;

  constructor(
    private appLock: AppLockService,
    private biometric: BiometricAuthService,
    private pinAuth: PinAuthService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Load current config
    this.appLock.getConfig().subscribe(config => {
      this.config = { ...config };
    });

    // Check biometric availability
    const biometricInfo = await this.biometric.isAvailable();
    this.biometricAvailable = biometricInfo.isAvailable;

    if (this.biometricAvailable) {
      this.biometricName = this.biometric.getBiometricTypeName(
        biometricInfo.biometricType
      );
      this.biometricIcon = this.getBiometricIcon(biometricInfo.biometricType);
    }

    // Check PIN
    this.hasPIN = await this.pinAuth.hasPIN();
  }

  /**
   * Update configuration
   */
  async updateConfig() {
    await this.appLock.updateConfig(this.config);
    await this.showToast('Settings updated', 'success');
  }

  /**
   * Setup or change PIN
   */
  async setupPIN() {
    const modal = await this.modalController.create({
      component: PinSetupComponent,
      componentProps: {
        isChangingPIN: this.hasPIN,
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data?.success) {
      this.hasPIN = true;
      await this.showToast(
        this.hasPIN ? 'PIN changed successfully' : 'PIN set successfully',
        'success'
      );
    }
  }

  /**
   * Get biometric icon
   */
  private getBiometricIcon(type: any): string {
    switch (type) {
      case 2: // FACE_ID
      case 4: // FACE_AUTHENTICATION
        return 'scan';
      case 1: // TOUCH_ID
      case 3: // FINGERPRINT
        return 'finger-print';
      case 5: // IRIS_AUTHENTICATION
        return 'eye';
      default:
        return 'shield-checkmark';
    }
  }

  /**
   * Close modal
   */
  close() {
    this.modalController.dismiss();
  }

  /**
   * Show toast message
   */
  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}`,
          description: 'Security settings component with configuration management',
          copyable: true,
        },
        {
          id: 2,
          language: 'html',
          title: 'Auto-Lock Timeout Selector',
          code: `<!-- Auto-Lock Timeout Setting -->
<ion-item>
  <ion-icon name="timer-outline" slot="start" color="primary"></ion-icon>
  <ion-label>
    <h2>Auto-Lock Timeout</h2>
    <p>Lock after inactivity</p>
  </ion-label>
  <ion-select
    [(ngModel)]="config.autoLockTimeout"
    (ionChange)="updateConfig()"
    interface="popover"
  >
    <ion-select-option [value]="15">15 seconds</ion-select-option>
    <ion-select-option [value]="30">30 seconds</ion-select-option>
    <ion-select-option [value]="60">1 minute</ion-select-option>
    <ion-select-option [value]="120">2 minutes</ion-select-option>
    <ion-select-option [value]="300">5 minutes</ion-select-option>
    <ion-select-option [value]="900">15 minutes</ion-select-option>
  </ion-select>
</ion-item>

<!-- Lock on Background Setting -->
<ion-item>
  <ion-icon name="layers-outline" slot="start" color="primary"></ion-icon>
  <ion-label>
    <h2>Lock When Backgrounded</h2>
    <p>Lock when app goes to background</p>
  </ion-label>
  <ion-toggle
    [(ngModel)]="config.lockOnBackground"
    (ionChange)="updateConfig()"
  ></ion-toggle>
</ion-item>

<!-- Privacy Information -->
<ion-list-header>
  <ion-label>Security Information</ion-label>
</ion-list-header>

<ion-item lines="none">
  <ion-icon name="information-circle-outline" slot="start" color="primary"></ion-icon>
  <ion-label class="ion-text-wrap">
    <h2>Biometric Data Privacy</h2>
    <p>Your biometric data (Face ID, Touch ID, Fingerprint) is stored securely on your device and never transmitted to our servers. We use device-native secure hardware (Secure Enclave / TEE) for authentication.</p>
  </ion-label>
</ion-item>

<ion-item lines="none">
  <ion-icon name="shield-checkmark-outline" slot="start" color="success"></ion-icon>
  <ion-label class="ion-text-wrap">
    <h2>PIN Security</h2>
    <p>PINs are hashed with bcrypt and salt before storage. Your PIN is never stored in plaintext.</p>
  </ion-label>
</ion-item>`,
          description: 'Security settings template with privacy information',
          copyable: true,
        },
      ],
      interviewTips: [
        'Make settings easy to access (main menu or profile) - security should be prominent',
        'Show biometric type name (Face ID, Touch ID) instead of generic "Biometric" for clarity',
        'Provide clear privacy statements explaining on-device processing and no server transmission',
        'Auto-save on change with toast feedback to confirm settings updated',
        'Display current PIN status (Set/Not Set) with color-coded badge for quick visual feedback',
      ],
    },
    {
      id: 257,
      title: 'Session Management',
      content: `
        <h2>Session Manager Service</h2>
        <p>Session management tracks authenticated sessions with expiration, separate from app lock. While app lock is UI-level security (hides content), sessions are API-level security (validates auth tokens).</p>

        <h3>App Lock vs Session Management</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>App Lock</th>
            <th>Session</th>
          </tr>
          <tr>
            <td><strong>Purpose</strong></td>
            <td>Hide UI content</td>
            <td>Validate API access</td>
          </tr>
          <tr>
            <td><strong>Scope</strong></td>
            <td>Local device</td>
            <td>Client + Server</td>
          </tr>
          <tr>
            <td><strong>Timeout</strong></td>
            <td>Short (30s-5min)</td>
            <td>Long (5min-24hr)</td>
          </tr>
          <tr>
            <td><strong>Auth Method</strong></td>
            <td>Biometric/PIN</td>
            <td>Auth token/JWT</td>
          </tr>
          <tr>
            <td><strong>Unlock</strong></td>
            <td>Biometric/PIN</td>
            <td>Re-authenticate</td>
          </tr>
        </table>

        <h3>Session Features</h3>
        <ul>
          <li><strong>Start Session:</strong> Create session with expiration on unlock</li>
          <li><strong>End Session:</strong> Clear session on lock or timeout</li>
          <li><strong>Validate Session:</strong> Check if session is still valid (not expired)</li>
          <li><strong>Extend Session:</strong> Add time on user activity</li>
          <li><strong>Refresh Session:</strong> Reset expiration to full duration</li>
          <li><strong>Persist Session:</strong> Save to secure storage (survive app restart)</li>
        </ul>

        <h3>Session Workflow</h3>
        <pre><code>User unlocks app with biometric
  ↓
Start session (1 hour expiration)
  ↓
User makes API call
  ↓
Validate session → Valid, extend session
  ↓
User inactive for 30s
  ↓
App locks (but session still valid)
  ↓
User unlocks with biometric
  ↓
Check session → Still valid, no re-login
  ↓
1 hour passes with no activity
  ↓
Session expires
  ↓
User unlocks app
  ↓
Session invalid → Redirect to login</code></pre>

        <h3>Best Practices</h3>
        <ul>
          <li><strong>Extend on Activity:</strong> Extend session on API calls to prevent timeout during active use</li>
          <li><strong>Clear on Security Changes:</strong> End session on logout, password change, biometric change</li>
          <li><strong>Server Validation:</strong> Client session is convenience - server must validate auth token</li>
          <li><strong>Secure Storage:</strong> Persist session in secure storage, not localStorage</li>
          <li><strong>Separate Timeouts:</strong> App lock (short) and session (long) serve different purposes</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'session-manager.service.ts - Complete Implementation',
          code: `// src/app/core/services/biometric/session-manager.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecureStoragePlugin } from '@capacitor-community/secure-storage';
import { AuthSession } from './biometric.models';

/**
 * Session Manager Service
 *
 * Manages authenticated sessions with expiration and persistence
 *
 * 💡 INTERVIEW: Sessions track authentication state separately from app lock
 * Lock = UI-level security, Session = API-level security
 */
@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  private session$ = new BehaviorSubject<AuthSession | null>(null);
  private sessionTimer?: any;

  private readonly SESSION_KEY = 'auth_session';
  private readonly DEFAULT_DURATION = 3600; // 1 hour

  constructor(private secureStorage: SecureStoragePlugin) {
    this.loadSession();
  }

  /**
   * Start authenticated session
   *
   * 💡 INTERVIEW: Session has expiration separate from app lock timeout
   */
  async startSession(
    userId?: string,
    biometricUsed: boolean = false,
    duration: number = this.DEFAULT_DURATION
  ): Promise<void> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + duration * 1000);

    const session: AuthSession = {
      isAuthenticated: true,
      authenticatedAt: now,
      expiresAt,
      biometricUsed,
      userId,
    };

    this.session$.next(session);
    await this.saveSession(session);
    this.startSessionTimer(duration);

    console.log('Session started. Expires at', expiresAt);
  }

  /**
   * End session
   */
  async endSession(): Promise<void> {
    this.session$.next(null);
    await this.removeSession();
    this.stopSessionTimer();
    console.log('Session ended');
  }

  /**
   * Check if session is valid
   *
   * 💡 INTERVIEW: Always check expiration before API calls
   */
  isSessionValid(): boolean {
    const session = this.session$.value;

    if (!session || !session.isAuthenticated) {
      return false;
    }

    // Check if expired
    if (new Date() > session.expiresAt) {
      console.warn('Session expired');
      this.endSession();
      return false;
    }

    return true;
  }

  /**
   * Get session observable
   */
  getSession(): Observable<AuthSession | null> {
    return this.session$.asObservable();
  }

  /**
   * Get current session (synchronous)
   */
  getCurrentSession(): AuthSession | null {
    return this.session$.value;
  }

  /**
   * Extend session duration
   *
   * 💡 INTERVIEW: Call this on user activity to prevent timeout
   */
  async extendSession(additionalSeconds: number = this.DEFAULT_DURATION): Promise<void> {
    const session = this.session$.value;

    if (!session) {
      console.warn('No active session to extend');
      return;
    }

    const newExpiresAt = new Date(
      session.expiresAt.getTime() + additionalSeconds * 1000
    );

    const updated = { ...session, expiresAt: newExpiresAt };
    this.session$.next(updated);
    await this.saveSession(updated);

    console.log('Session extended. New expiration:', newExpiresAt);

    // Restart timer
    this.stopSessionTimer();
    const remainingSeconds = Math.floor(
      (newExpiresAt.getTime() - Date.now()) / 1000
    );
    this.startSessionTimer(remainingSeconds);
  }

  /**
   * Refresh session (reset expiration to full duration)
   */
  async refreshSession(duration: number = this.DEFAULT_DURATION): Promise<void> {
    const session = this.session$.value;

    if (!session) {
      console.warn('No active session to refresh');
      return;
    }

    const newExpiresAt = new Date(Date.now() + duration * 1000);
    const updated = { ...session, expiresAt: newExpiresAt };
    this.session$.next(updated);
    await this.saveSession(updated);

    console.log('Session refreshed. New expiration:', newExpiresAt);

    this.stopSessionTimer();
    this.startSessionTimer(duration);
  }

  /**
   * Start session expiration timer
   */
  private startSessionTimer(duration: number): void {
    this.stopSessionTimer();

    this.sessionTimer = setTimeout(() => {
      console.log('Session timeout reached');
      this.endSession();
    }, duration * 1000);
  }

  /**
   * Stop session timer
   */
  private stopSessionTimer(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = undefined;
    }
  }

  /**
   * Save session to secure storage
   */
  private async saveSession(session: AuthSession): Promise<void> {
    try {
      await this.secureStorage.set({
        key: this.SESSION_KEY,
        value: JSON.stringify(session),
      });
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  /**
   * Load session from secure storage
   */
  private async loadSession(): Promise<void> {
    try {
      const result = await this.secureStorage.get({ key: this.SESSION_KEY });

      if (result.value) {
        const session = JSON.parse(result.value);

        // Restore dates
        session.authenticatedAt = new Date(session.authenticatedAt);
        session.expiresAt = new Date(session.expiresAt);

        // Check if expired
        if (new Date() <= session.expiresAt) {
          this.session$.next(session);

          // Restart timer
          const remainingSeconds = Math.floor(
            (session.expiresAt.getTime() - Date.now()) / 1000
          );
          this.startSessionTimer(remainingSeconds);

          console.log('Session restored. Expires in', remainingSeconds, 'seconds');
        } else {
          console.log('Stored session expired');
          await this.removeSession();
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  }

  /**
   * Remove session from storage
   */
  private async removeSession(): Promise<void> {
    try {
      await this.secureStorage.remove({ key: this.SESSION_KEY });
    } catch (error) {
      console.error('Failed to remove session:', error);
    }
  }
}`,
          description: 'Complete session manager with persistence and expiration',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Session Best Practices',
          code: `/**
 * Session Management Best Practices
 *
 * 💡 INTERVIEW: How to properly manage authentication sessions
 */

// 1. Separate Concerns
class AppSecurityExample {
  // App Lock: UI-level (hide content from shoulder surfing)
  private appLockTimeout = 30; // 30 seconds

  // Session: API-level (validate auth token)
  private sessionTimeout = 3600; // 1 hour

  /**
   * Example: User workflow
   *
   * Time 0:00 - User unlocks with biometric
   *   → App unlocked (lock timer starts: 30s)
   *   → Session started (session timer starts: 1hr)
   *
   * Time 0:30 - 30 seconds of inactivity
   *   → App locks (show lock screen)
   *   → Session still valid (55min remaining)
   *
   * Time 0:31 - User unlocks with biometric
   *   → App unlocked (no re-login needed!)
   *   → Session still valid (check expires_at)
   *
   * Time 1:00 - 1 hour since initial login
   *   → Session expires
   *   → User unlocks app with biometric
   *   → Session invalid → Redirect to login screen
   */
}

// 2. Extend on Activity
class APIService {
  constructor(private session: SessionManagerService) {}

  async makeAPICall(endpoint: string) {
    // Check session before API call
    if (!this.session.isSessionValid()) {
      throw new Error('Session expired. Please login.');
    }

    // Make API call
    const response = await fetch(endpoint);

    // Extend session on successful API call
    await this.session.extendSession(3600); // Add 1 hour

    return response;
  }
}

// 3. Clear on Security Changes
async handleSecurityChange() {
  // End session on:
  // - User logout
  // - Password change
  // - Biometric enrollment change
  // - Device root/jailbreak detected
  await this.session.endSession();
  await this.appLock.lock();

  // Clear any cached tokens
  await this.clearAuthTokens();

  // Redirect to login
  this.router.navigate(['/login']);
}

// 4. Server-Side Validation
/**
 * Client session is convenience only!
 *
 * Server MUST validate auth token independently:
 * - Check token signature (JWT)
 * - Verify token expiration
 * - Check token revocation list
 * - Validate user permissions
 *
 * Never trust client session state for security decisions.
 */

// 5. Persist Sessions Securely
async saveSession(session: AuthSession) {
  // ✅ GOOD: Secure storage
  await this.secureStorage.set({
    key: 'auth_session',
    value: JSON.stringify(session)
  });

  // ❌ BAD: localStorage (insecure)
  localStorage.setItem('session', JSON.stringify(session));
}`,
          description: 'Best practices for session management',
          copyable: true,
        },
      ],
      interviewTips: [
        'App lock (UI security) and session (API security) serve different purposes with different timeouts',
        'Extend session on API calls to prevent timeout during active use',
        'Client session is convenience - server must independently validate auth tokens (never trust client)',
        'End session on logout, password change, or biometric enrollment change for security',
        'Persist session in secure storage to survive app restart (check expiration on load)',
      ],
    },
    {
      id: 258,
      title: 'Advanced Security',
      content: `
        <h2>Advanced Security Features</h2>
        <p>Beyond basic biometric authentication, advanced security features protect against sophisticated attacks and ensure regulatory compliance.</p>

        <h3>Screenshot Prevention</h3>
        <ul>
          <li><strong>Android:</strong> FLAG_SECURE window flag prevents screenshots and screen recording</li>
          <li><strong>iOS:</strong> No official API - blur screen when app enters background</li>
          <li><strong>Use Cases:</strong> Banking apps, password managers, healthcare (HIPAA), payment apps</li>
          <li><strong>Limitation:</strong> Users can still use external camera or jailbroken devices</li>
        </ul>

        <h3>Jailbreak / Root Detection</h3>
        <ul>
          <li><strong>Why Detect:</strong> Jailbroken/rooted devices bypass security (biometric, PIN, encryption)</li>
          <li><strong>iOS Jailbreak:</strong> Check for Cydia, suspicious files, write access to system dirs</li>
          <li><strong>Android Root:</strong> Check for su binary, root management apps, build tags</li>
          <li><strong>Response Options:</strong> Warn user, disable features, block app entirely</li>
        </ul>

        <h3>FIDO2 / WebAuthn</h3>
        <ul>
          <li><strong>What:</strong> W3C standard for passwordless authentication with hardware security</li>
          <li><strong>Advantages:</strong> Phishing-resistant, hardware-backed keys, no password transmission</li>
          <li><strong>Use Cases:</strong> Passwordless login, two-factor auth (2FA), transaction signing</li>
          <li><strong>vs Native Biometric:</strong> WebAuthn requires server, but provides cryptographic proof</li>
        </ul>

        <h3>Additional Security Measures</h3>
        <ul>
          <li><strong>Clipboard Security:</strong> Clear clipboard on app background (prevent password leaks)</li>
          <li><strong>SSL Pinning:</strong> Pin server certificates to prevent man-in-the-middle attacks</li>
          <li><strong>Code Obfuscation:</strong> Make reverse engineering harder</li>
          <li><strong>Anti-Tampering:</strong> Detect app modifications and refuse to run</li>
          <li><strong>Secure Network:</strong> Use HTTPS, validate certificates, implement timeout</li>
        </ul>

        <h3>Compliance Requirements</h3>
        <ul>
          <li><strong>GDPR (EU):</strong> Biometric data is "special category" - requires explicit consent</li>
          <li><strong>CCPA (California):</strong> Biometric data is "sensitive" - disclosure required</li>
          <li><strong>HIPAA (Healthcare):</strong> PHI requires strong authentication and audit trails</li>
          <li><strong>PCI-DSS (Payments):</strong> Strong authentication for cardholder data access</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Screenshot Prevention',
          code: `/**
 * Screenshot Prevention Service
 *
 * 💡 INTERVIEW: Prevent screenshots of sensitive data (banking, healthcare)
 */

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotPreventionService {
  constructor(private platform: Platform) {}

  /**
   * Enable screenshot prevention
   *
   * Android: FLAG_SECURE prevents screenshots and screen recording
   * iOS: Blur screen when app enters background (no official API)
   */
  async enablePreventScreenshot(): Promise<void> {
    if (this.platform.is('android')) {
      // Android: Set FLAG_SECURE
      // Requires native plugin or custom native code
      console.log('Screenshot prevention enabled (Android)');
    }

    if (this.platform.is('ios')) {
      // iOS: Blur screen on background (alternative)
      this.blurScreenOnBackground();
    }
  }

  /**
   * Blur screen when app enters background (iOS alternative)
   */
  private blurScreenOnBackground(): void {
    this.platform.pause.subscribe(() => {
      // Add blur overlay
      const overlay = document.createElement('div');
      overlay.id = 'screenshot-overlay';
      overlay.style.cssText = \`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        z-index: 999999;
      \`;
      document.body.appendChild(overlay);
    });

    this.platform.resume.subscribe(() => {
      // Remove blur overlay
      const overlay = document.getElementById('screenshot-overlay');
      if (overlay) {
        overlay.remove();
      }
    });
  }
}

/**
 * 💡 INTERVIEW: Why prevent screenshots?
 *
 * Use Cases:
 * - Banking: Prevent screenshot of account numbers, balances
 * - Healthcare: HIPAA compliance for PHI (Protected Health Information)
 * - Password Managers: Prevent screenshot of passwords
 * - Payment Apps: Prevent screenshot of credit card info
 *
 * Platform Support:
 * - Android: FLAG_SECURE (full support for screenshots + screen recording)
 * - iOS: No official API (alternatives: blur, hide content, white screen)
 *
 * Limitations:
 * - Screenshot prevention is a deterrent, not foolproof
 * - Users can still use external cameras
 * - Jailbroken/rooted devices can bypass
 * - Screen recording may still work on some devices
 */`,
          description: 'Screenshot prevention for sensitive data protection',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Jailbreak / Root Detection',
          code: `/**
 * Device Integrity Service
 *
 * 💡 INTERVIEW: Detect compromised devices and respond appropriately
 */

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DeviceIntegrityService {
  constructor(private platform: Platform) {}

  /**
   * Check if device is jailbroken (iOS) or rooted (Android)
   *
   * 💡 INTERVIEW: Compromised devices bypass security features
   */
  async isDeviceCompromised(): Promise<boolean> {
    if (this.platform.is('ios')) {
      return this.isJailbroken();
    } else if (this.platform.is('android')) {
      return this.isRooted();
    }
    return false;
  }

  /**
   * Check if iOS device is jailbroken
   */
  private async isJailbroken(): Promise<boolean> {
    // Common jailbreak indicators
    const jailbreakPaths = [
      '/Applications/Cydia.app',              // Cydia app
      '/Library/MobileSubstrate/MobileSubstrate.dylib',
      '/bin/bash',
      '/usr/sbin/sshd',
      '/etc/apt',
      '/private/var/lib/apt/',
    ];

    // Check suspicious files
    // In real implementation, use File API or native plugin
    // This is a placeholder - actual implementation requires native code

    return false; // Placeholder
  }

  /**
   * Check if Android device is rooted
   */
  private async isRooted(): Promise<boolean> {
    // Common root indicators
    const rootPaths = [
      '/system/app/Superuser.apk',
      '/sbin/su',
      '/system/bin/su',
      '/system/xbin/su',
      '/data/local/xbin/su',
      '/data/local/bin/su',
    ];

    // Root management apps
    const rootApps = [
      'com.noshufou.android.su',
      'com.thirdparty.superuser',
      'eu.chainfire.supersu',
      'com.koushikdutta.superuser',
    ];

    return false; // Placeholder
  }

  /**
   * Handle compromised device
   *
   * 💡 INTERVIEW: Response depends on app type and security requirements
   */
  async handleCompromisedDevice(): Promise<void> {
    // Option 1: Warn user (recommended for most apps)
    this.showWarning(
      'Security Warning',
      'This device appears to be jailbroken/rooted. Some security features may not work properly.'
    );

    // Option 2: Disable sensitive features (banking)
    this.disablePayments();

    // Option 3: Block app entirely (high-security apps)
    // this.blockApp();

    // Option 4: Report to server (optional)
    // this.reportCompromisedDevice();
  }

  private showWarning(title: string, message: string) {
    console.warn(\`\${title}: \${message}\`);
  }

  private disablePayments() {
    console.log('Payments disabled on compromised device');
  }
}

/**
 * 💡 INTERVIEW: Should you block jailbroken/rooted devices?
 *
 * Pros of Blocking:
 * - Prevent security bypass (biometric, PIN, encryption)
 * - Protect sensitive data (banking, healthcare)
 * - Compliance requirements (PCI-DSS, HIPAA)
 *
 * Cons of Blocking:
 * - False positives (development devices, legitimate use)
 * - User frustration (power users)
 * - Detection can be bypassed (root cloaking tools)
 *
 * Best Practice by App Type:
 * - Banking/Healthcare: Block or severely limit
 * - General Apps: Warn, but allow usage
 * - Gaming: Block (prevent cheating)
 * - Social: Warn only
 *
 * Always clearly communicate WHY the app is blocked.
 */`,
          description: 'Jailbreak and root detection for device integrity',
          copyable: true,
        },
      ],
      interviewTips: [
        'Screenshot prevention: Android has FLAG_SECURE, iOS requires workarounds (blur on background)',
        'Jailbreak/root detection: Check for suspicious files (Cydia, su binary) but can be bypassed',
        'Response to compromised device depends on app type (warn vs disable vs block)',
        'FIDO2/WebAuthn provides passwordless auth with cryptographic proof (phishing-resistant)',
        'Always communicate security measures clearly to users (transparency builds trust)',
      ],
    },
  ],
};
