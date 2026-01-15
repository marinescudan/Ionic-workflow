// src/app/services/chapters/data/chapter-21.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_21_DATA: Chapter = {
  id: 21,
  title: 'Web & Mobile Security',
  description: 'Master authentication, secure storage, API security, XSS/CSRF prevention, biometric auth, and protect your Ionic app from common vulnerabilities',
  icon: 'shield-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 210,
      title: 'Security Fundamentals',
      content: `
        <h2>Security Principles</h2>
        <p>Security is not optional - it's a fundamental requirement for any production application. Understanding security principles and common vulnerabilities is essential for building trustworthy mobile applications.</p>

        <h3>The CIA Triad</h3>
        <ul>
          <li><strong>Confidentiality:</strong> Information is accessible only to authorized users</li>
          <li><strong>Integrity:</strong> Information cannot be modified by unauthorized users</li>
          <li><strong>Availability:</strong> Information and services are available when needed</li>
        </ul>

        <h3>OWASP Top 10 (Web)</h3>
        <table>
          <tr>
            <th>#</th>
            <th>Vulnerability</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Broken Access Control</td>
            <td>Users can act outside their permissions</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cryptographic Failures</td>
            <td>Exposing sensitive data due to weak encryption</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Injection</td>
            <td>SQL, NoSQL, command injection attacks</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Insecure Design</td>
            <td>Missing or ineffective security controls</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Security Misconfiguration</td>
            <td>Default configs, incomplete setup</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Vulnerable Components</td>
            <td>Using outdated libraries with known vulnerabilities</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Authentication Failures</td>
            <td>Weak authentication and session management</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Software/Data Integrity</td>
            <td>Code/infrastructure without integrity validation</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Logging/Monitoring Failures</td>
            <td>Inadequate logging prevents detecting breaches</td>
          </tr>
          <tr>
            <td>10</td>
            <td>SSRF</td>
            <td>Server-Side Request Forgery attacks</td>
          </tr>
        </table>

        <h3>OWASP Mobile Top 10</h3>
        <ul>
          <li><strong>M1:</strong> Improper Platform Usage</li>
          <li><strong>M2:</strong> Insecure Data Storage</li>
          <li><strong>M3:</strong> Insecure Communication</li>
          <li><strong>M4:</strong> Insecure Authentication</li>
          <li><strong>M5:</strong> Insufficient Cryptography</li>
          <li><strong>M6:</strong> Insecure Authorization</li>
          <li><strong>M7:</strong> Client Code Quality</li>
          <li><strong>M8:</strong> Code Tampering</li>
          <li><strong>M9:</strong> Reverse Engineering</li>
          <li><strong>M10:</strong> Extraneous Functionality</li>
        </ul>

        <h3>Defense in Depth</h3>
        <p>Security should be implemented in layers. If one layer fails, other layers provide protection:</p>
        <ul>
          <li><strong>Network Layer:</strong> HTTPS, certificate pinning</li>
          <li><strong>Application Layer:</strong> Input validation, authentication</li>
          <li><strong>Data Layer:</strong> Encryption at rest and in transit</li>
          <li><strong>Physical Layer:</strong> Device security, biometric auth</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Security Threat Assessment Matrix',
          code: `// src/app/models/security.model.ts

export enum ThreatLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum AttackVector {
  NETWORK = 'network',
  LOCAL = 'local',
  PHYSICAL = 'physical',
  SOCIAL = 'social'
}

export interface SecurityThreat {
  id: string;
  name: string;
  description: string;
  level: ThreatLevel;
  vector: AttackVector;
  likelihood: number; // 1-10
  impact: number;     // 1-10
  mitigation: string[];
  owaspCategory?: string;
}

// Example threat assessment
export const MOBILE_SECURITY_THREATS: SecurityThreat[] = [
  {
    id: 'M2-001',
    name: 'Insecure Token Storage',
    description: 'JWT tokens stored in localStorage can be accessed via XSS',
    level: ThreatLevel.CRITICAL,
    vector: AttackVector.NETWORK,
    likelihood: 8,
    impact: 10,
    mitigation: [
      'Use Capacitor Secure Storage for token storage',
      'Enable biometric authentication',
      'Implement token rotation',
      'Clear tokens on logout'
    ],
    owaspCategory: 'M2: Insecure Data Storage'
  },
  {
    id: 'M3-001',
    name: 'Man-in-the-Middle Attack',
    description: 'Attacker intercepts network traffic',
    level: ThreatLevel.HIGH,
    vector: AttackVector.NETWORK,
    likelihood: 6,
    impact: 9,
    mitigation: [
      'Enforce HTTPS for all requests',
      'Implement certificate pinning',
      'Validate SSL certificates',
      'Use TLS 1.3'
    ],
    owaspCategory: 'M3: Insecure Communication'
  },
  {
    id: 'M4-001',
    name: 'Weak Authentication',
    description: 'Predictable session tokens or weak password requirements',
    level: ThreatLevel.HIGH,
    vector: AttackVector.NETWORK,
    likelihood: 7,
    impact: 9,
    mitigation: [
      'Use strong JWT with short expiration',
      'Implement password strength requirements',
      'Add multi-factor authentication',
      'Implement account lockout after failed attempts'
    ],
    owaspCategory: 'M4: Insecure Authentication'
  },
  {
    id: 'XSS-001',
    name: 'Cross-Site Scripting',
    description: 'Malicious scripts injected into trusted websites',
    level: ThreatLevel.HIGH,
    vector: AttackVector.NETWORK,
    likelihood: 7,
    impact: 8,
    mitigation: [
      'Sanitize all user inputs',
      'Use Angular DomSanitizer',
      'Implement Content Security Policy',
      'Never use innerHTML with user content'
    ],
    owaspCategory: 'OWASP A03: Injection'
  }
];

// Risk calculation
export function calculateRiskScore(threat: SecurityThreat): number {
  return (threat.likelihood + threat.impact) / 2;
}

// Priority sorting
export function prioritizeThreats(threats: SecurityThreat[]): SecurityThreat[] {
  return threats.sort((a, b) => {
    const scoreA = calculateRiskScore(a);
    const scoreB = calculateRiskScore(b);
    return scoreB - scoreA;
  });
}`,
          description: 'Security threat assessment model for systematic vulnerability tracking',
          copyable: true,
        },
      ],
      interviewTips: [
        'CIA triad is the foundation: Confidentiality, Integrity, Availability',
        'Defense in depth means multiple layers of security - if one fails, others protect',
        'OWASP Top 10 changes periodically - stay updated with latest vulnerabilities',
        'Mobile security differs from web - consider offline attacks and device access',
        'Threat modeling should happen during design phase, not after development',
      ],
    },
    {
      id: 211,
      title: 'Authentication & Authorization',
      content: `
        <h2>Secure Authentication</h2>
        <p>Authentication verifies "who you are", while authorization determines "what you can do". Implementing secure authentication is critical for protecting user data and preventing unauthorized access.</p>

        <h3>JWT (JSON Web Token)</h3>
        <p>JWT is a compact, self-contained way to securely transmit information between parties. It consists of three parts:</p>
        <ul>
          <li><strong>Header:</strong> Token type and signing algorithm</li>
          <li><strong>Payload:</strong> Claims (user data, expiration, etc.)</li>
          <li><strong>Signature:</strong> Verifies the token hasn't been tampered with</li>
        </ul>

        <h3>JWT vs Session-Based Auth</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>JWT</th>
            <th>Session</th>
          </tr>
          <tr>
            <td>Storage</td>
            <td>Client-side (secure storage)</td>
            <td>Server-side (memory/database)</td>
          </tr>
          <tr>
            <td>Scalability</td>
            <td>Stateless, highly scalable</td>
            <td>Stateful, harder to scale</td>
          </tr>
          <tr>
            <td>Revocation</td>
            <td>Difficult (use short expiration)</td>
            <td>Easy (delete session)</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>Larger (contains data)</td>
            <td>Smaller (just session ID)</td>
          </tr>
          <tr>
            <td>Mobile Apps</td>
            <td>Excellent (no cookies)</td>
            <td>Difficult (cookie issues)</td>
          </tr>
        </table>

        <h3>OAuth 2.0 Flow</h3>
        <p>OAuth 2.0 is an authorization framework for delegated access. Common flows:</p>
        <ul>
          <li><strong>Authorization Code + PKCE:</strong> Most secure for mobile apps</li>
          <li><strong>Implicit Flow:</strong> Deprecated, not secure</li>
          <li><strong>Client Credentials:</strong> Server-to-server communication</li>
          <li><strong>Resource Owner Password:</strong> Legacy, avoid if possible</li>
        </ul>

        <h3>Biometric Authentication</h3>
        <p>Use device biometrics (Face ID, Touch ID, Fingerprint) for enhanced security:</p>
        <ul>
          <li><strong>iOS:</strong> Face ID (iPhone X+), Touch ID (older iPhones)</li>
          <li><strong>Android:</strong> Fingerprint, Face Unlock, Iris Scanner</li>
          <li><strong>Fallback:</strong> PIN/password if biometric fails</li>
          <li><strong>Local Only:</strong> Biometric data never leaves the device</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 2,
          language: 'typescript',
          title: 'Complete AuthService with JWT',
          code: `// src/app/services/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { SecureStorageService } from './secure-storage.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://api.yourapp.com/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private secureStorage: SecureStorageService
  ) {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state on app startup
   */
  private async initializeAuth(): Promise<void> {
    try {
      const token = await this.tokenService.getAccessToken();
      if (token && !this.tokenService.isTokenExpired(token)) {
        const user = await this.loadUserProfile();
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } else {
        // Try to refresh token
        await this.refreshToken();
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      await this.logout();
    }
  }

  /**
   * Login with email and password
   */
  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<LoginResponse>(\`\${this.API_URL}/login\`, credentials)
      .pipe(
        tap(async (response) => {
          // Store tokens securely
          await this.tokenService.setTokens(
            response.accessToken,
            response.refreshToken
          );

          // Update state
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  /**
   * Register new user
   */
  register(userData: {
    email: string;
    password: string;
    name: string;
  }): Observable<User> {
    return this.http.post<LoginResponse>(\`\${this.API_URL}/register\`, userData)
      .pipe(
        tap(async (response) => {
          await this.tokenService.setTokens(
            response.accessToken,
            response.refreshToken
          );
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  /**
   * Logout and clear tokens
   */
  async logout(): Promise<void> {
    try {
      // Call backend to invalidate token (if implemented)
      await this.http.post(\`\${this.API_URL}/logout\`, {}).toPromise();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local state regardless of API call result
      await this.tokenService.clearTokens();
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = await this.tokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http.post<{ accessToken: string }>(
      \`\${this.API_URL}/refresh\`,
      { refreshToken }
    ).pipe(
      tap(async (response) => {
        await this.tokenService.setAccessToken(response.accessToken);
      }),
      map(response => response.accessToken),
      catchError(async (error) => {
        // Refresh token expired or invalid - logout
        await this.logout();
        return throwError(() => error);
      })
    ).toPromise();
  }

  /**
   * Load user profile from API
   */
  private async loadUserProfile(): Promise<User> {
    return this.http.get<User>(\`\${this.API_URL}/profile\`)
      .toPromise();
  }

  /**
   * Get current user value (synchronous)
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated (synchronous)
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) ?? false;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = \`Error: \${error.error.message}\`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later';
          break;
        default:
          errorMessage = \`Error Code: \${error.status}\`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}`,
          description: 'Complete authentication service with JWT, token refresh, and role-based access',
          copyable: true,
        },
        {
          id: 3,
          language: 'typescript',
          title: 'TokenService with Secure Storage',
          code: `// src/app/services/auth/token.service.ts
import { Injectable } from '@angular/core';
import { SecureStorageService } from './secure-storage.service';

interface JWTPayload {
  sub: string;      // Subject (user ID)
  email: string;
  name: string;
  roles: string[];
  iat: number;      // Issued at
  exp: number;      // Expiration
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(private secureStorage: SecureStorageService) {}

  /**
   * Store both access and refresh tokens securely
   */
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      this.secureStorage.set(this.ACCESS_TOKEN_KEY, accessToken),
      this.secureStorage.set(this.REFRESH_TOKEN_KEY, refreshToken)
    ]);
  }

  /**
   * Store access token only
   */
  async setAccessToken(accessToken: string): Promise<void> {
    await this.secureStorage.set(this.ACCESS_TOKEN_KEY, accessToken);
  }

  /**
   * Get access token
   */
  async getAccessToken(): Promise<string | null> {
    return await this.secureStorage.get(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    return await this.secureStorage.get(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Clear all tokens
   */
  async clearTokens(): Promise<void> {
    await Promise.all([
      this.secureStorage.remove(this.ACCESS_TOKEN_KEY),
      this.secureStorage.remove(this.REFRESH_TOKEN_KEY)
    ]);
  }

  /**
   * Decode JWT payload (does not verify signature)
   */
  decodeToken(token: string): JWTPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) {
      return true;
    }

    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate <= new Date();
  }

  /**
   * Get token expiration time in milliseconds
   */
  getTokenExpirationTime(token: string): number | null {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) {
      return null;
    }

    return payload.exp * 1000;
  }

  /**
   * Get time until token expires (in milliseconds)
   */
  getTimeUntilExpiration(token: string): number | null {
    const expirationTime = this.getTokenExpirationTime(token);
    if (!expirationTime) {
      return null;
    }

    return expirationTime - Date.now();
  }

  /**
   * Extract user info from token
   */
  getUserInfoFromToken(token: string): {
    id: string;
    email: string;
    name: string;
    roles: string[];
  } | null {
    const payload = this.decodeToken(token);
    if (!payload) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: payload.roles
    };
  }
}`,
          description: 'Token service for JWT management with secure storage',
          copyable: true,
        },
        {
          id: 4,
          language: 'typescript',
          title: 'BiometricAuthService Implementation',
          code: `// src/app/services/auth/biometric-auth.service.ts
import { Injectable } from '@angular/core';
import { NativeBiometric, BiometryType } from '@capacitor-community/native-biometric';
import { Platform } from '@ionic/angular';

export interface BiometricAvailability {
  isAvailable: boolean;
  biometryType: BiometryType;
  reason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BiometricAuthService {
  constructor(private platform: Platform) {}

  /**
   * Check if biometric authentication is available
   */
  async isAvailable(): Promise<BiometricAvailability> {
    try {
      // Only check on native platforms
      if (!this.platform.is('capacitor')) {
        return {
          isAvailable: false,
          biometryType: BiometryType.NONE,
          reason: 'Not running on native platform'
        };
      }

      const result = await NativeBiometric.isAvailable();
      return {
        isAvailable: result.isAvailable,
        biometryType: result.biometryType,
      };
    } catch (error) {
      console.error('Biometric availability check failed:', error);
      return {
        isAvailable: false,
        biometryType: BiometryType.NONE,
        reason: 'Biometric hardware not available'
      };
    }
  }

  /**
   * Authenticate user with biometric
   */
  async authenticate(options?: {
    reason?: string;
    title?: string;
    subtitle?: string;
    description?: string;
  }): Promise<boolean> {
    try {
      const availability = await this.isAvailable();

      if (!availability.isAvailable) {
        throw new Error('Biometric authentication not available');
      }

      await NativeBiometric.verifyIdentity({
        reason: options?.reason || 'Please authenticate',
        title: options?.title || 'Authentication Required',
        subtitle: options?.subtitle,
        description: options?.description,
        maxAttempts: 3,
      });

      return true;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }

  /**
   * Save credentials for biometric login
   */
  async saveCredentials(username: string, password: string): Promise<void> {
    try {
      await NativeBiometric.setCredentials({
        username,
        password,
        server: 'com.yourapp.auth',
      });
    } catch (error) {
      console.error('Failed to save credentials:', error);
      throw error;
    }
  }

  /**
   * Get saved credentials after successful biometric authentication
   */
  async getCredentials(): Promise<{ username: string; password: string } | null> {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: 'com.yourapp.auth',
      });

      return {
        username: credentials.username,
        password: credentials.password
      };
    } catch (error) {
      console.error('Failed to get credentials:', error);
      return null;
    }
  }

  /**
   * Delete saved credentials
   */
  async deleteCredentials(): Promise<void> {
    try {
      await NativeBiometric.deleteCredentials({
        server: 'com.yourapp.auth',
      });
    } catch (error) {
      console.error('Failed to delete credentials:', error);
      throw error;
    }
  }

  /**
   * Get user-friendly biometric type name
   */
  getBiometricTypeName(type: BiometryType): string {
    switch (type) {
      case BiometryType.FACE_ID:
        return 'Face ID';
      case BiometryType.TOUCH_ID:
        return 'Touch ID';
      case BiometryType.FINGERPRINT:
        return 'Fingerprint';
      case BiometryType.FACE_AUTHENTICATION:
        return 'Face Recognition';
      case BiometryType.IRIS_AUTHENTICATION:
        return 'Iris Recognition';
      default:
        return 'Biometric';
    }
  }
}`,
          description: 'Complete biometric authentication service for Face ID, Touch ID, and Fingerprint',
          copyable: true,
        },
      ],
      interviewTips: [
        'JWT is stateless - server doesn\'t store session data, making it scalable',
        'Store tokens in Capacitor Secure Storage, never in localStorage on mobile',
        'OAuth 2.0 with PKCE (Proof Key for Code Exchange) is the most secure flow for mobile',
        'Token refresh should happen automatically before expiration (e.g., 5 mins before)',
        'Biometric data never leaves the device - it\'s hardware-protected',
        'Always implement fallback (PIN/password) when biometric fails',
      ],
    },
    {
      id: 212,
      title: 'Secure Storage',
      content: `
        <h2>Secure Data Storage</h2>
        <p>Storing sensitive data securely is critical for mobile applications. Never store passwords, tokens, or personal information in plain text. Use platform-specific secure storage mechanisms.</p>

        <h3>Storage Options</h3>
        <table>
          <tr>
            <th>Storage Type</th>
            <th>Security Level</th>
            <th>Use Cases</th>
            <th>Recommendation</th>
          </tr>
          <tr>
            <td>localStorage</td>
            <td>⚠️ Low</td>
            <td>Non-sensitive data only</td>
            <td>Avoid for mobile apps</td>
          </tr>
          <tr>
            <td>Capacitor Preferences</td>
            <td>⚠️ Low</td>
            <td>User preferences, settings</td>
            <td>OK for non-sensitive data</td>
          </tr>
          <tr>
            <td>Capacitor Secure Storage</td>
            <td>✅ High</td>
            <td>Tokens, credentials, keys</td>
            <td>Recommended</td>
          </tr>
          <tr>
            <td>iOS Keychain</td>
            <td>✅ Very High</td>
            <td>Passwords, certificates</td>
            <td>Best for iOS</td>
          </tr>
          <tr>
            <td>Android KeyStore</td>
            <td>✅ Very High</td>
            <td>Encryption keys, secrets</td>
            <td>Best for Android</td>
          </tr>
        </table>

        <h3>Data Classification</h3>
        <p>Classify data by sensitivity to determine storage approach:</p>
        <ul>
          <li><strong>Public:</strong> Can be shared freely (app version, public content)</li>
          <li><strong>Internal:</strong> Organization use only (user preferences)</li>
          <li><strong>Confidential:</strong> Requires protection (email, name)</li>
          <li><strong>Restricted:</strong> Highly sensitive (passwords, payment info, health data)</li>
        </ul>

        <h3>What to Store Securely</h3>
        <ul>
          <li>✅ Authentication tokens (JWT access/refresh tokens)</li>
          <li>✅ API keys and secrets</li>
          <li>✅ User credentials (encrypted)</li>
          <li>✅ Encryption keys</li>
          <li>✅ Payment information</li>
          <li>✅ Personal health information</li>
        </ul>

        <h3>What NOT to Store</h3>
        <ul>
          <li>❌ Plain text passwords</li>
          <li>❌ API keys hardcoded in source code</li>
          <li>❌ Credit card numbers (use tokenization)</li>
          <li>❌ Social Security Numbers</li>
          <li>❌ Unencrypted personal data</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 5,
          language: 'typescript',
          title: 'SecureStorageService Implementation',
          code: `// src/app/services/security/secure-storage.service.ts
import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from '@capacitor-community/secure-storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private isNative: boolean;

  constructor(private platform: Platform) {
    this.isNative = this.platform.is('capacitor');
  }

  /**
   * Store encrypted data
   */
  async set(key: string, value: string): Promise<void> {
    if (!this.isNative) {
      // Fallback for web (less secure, use with caution)
      sessionStorage.setItem(this.getWebKey(key), value);
      return;
    }

    try {
      await SecureStoragePlugin.set({
        key: this.sanitizeKey(key),
        value: value
      });
    } catch (error) {
      console.error(\`Failed to store \${key}:\`, error);
      throw new Error(\`Secure storage set failed for key: \${key}\`);
    }
  }

  /**
   * Retrieve encrypted data
   */
  async get(key: string): Promise<string | null> {
    if (!this.isNative) {
      // Fallback for web
      return sessionStorage.getItem(this.getWebKey(key));
    }

    try {
      const result = await SecureStoragePlugin.get({
        key: this.sanitizeKey(key)
      });
      return result.value;
    } catch (error) {
      // Key not found or other error
      return null;
    }
  }

  /**
   * Remove encrypted data
   */
  async remove(key: string): Promise<void> {
    if (!this.isNative) {
      sessionStorage.removeItem(this.getWebKey(key));
      return;
    }

    try {
      await SecureStoragePlugin.remove({
        key: this.sanitizeKey(key)
      });
    } catch (error) {
      console.error(\`Failed to remove \${key}:\`, error);
    }
  }

  /**
   * Clear all secure storage
   */
  async clear(): Promise<void> {
    if (!this.isNative) {
      // Only clear app-specific keys in web
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('secure_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
      return;
    }

    try {
      await SecureStoragePlugin.clear();
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
      throw error;
    }
  }

  /**
   * Check if key exists
   */
  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  /**
   * Get all keys (native only)
   */
  async keys(): Promise<string[]> {
    if (!this.isNative) {
      const keys: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('secure_')) {
          keys.push(key.replace('secure_', ''));
        }
      }
      return keys;
    }

    try {
      const result = await SecureStoragePlugin.keys();
      return result.value;
    } catch (error) {
      console.error('Failed to get keys:', error);
      return [];
    }
  }

  /**
   * Store object as JSON
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    const json = JSON.stringify(value);
    await this.set(key, json);
  }

  /**
   * Retrieve object from JSON
   */
  async getObject<T>(key: string): Promise<T | null> {
    const json = await this.get(key);
    if (!json) {
      return null;
    }

    try {
      return JSON.parse(json) as T;
    } catch (error) {
      console.error(\`Failed to parse JSON for \${key}:\`, error);
      return null;
    }
  }

  /**
   * Sanitize key to prevent issues
   */
  private sanitizeKey(key: string): string {
    return key.replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  /**
   * Get web fallback key with prefix
   */
  private getWebKey(key: string): string {
    return \`secure_\${key}\`;
  }

  /**
   * Check if running on native platform
   */
  isNativePlatform(): boolean {
    return this.isNative;
  }
}`,
          description: 'Complete secure storage service using Capacitor Secure Storage plugin',
          copyable: true,
        },
      ],
      interviewTips: [
        'iOS Keychain stores data in hardware-encrypted vault, protected by device passcode',
        'Android KeyStore uses hardware-backed security when available (TEE or Secure Element)',
        'Capacitor Secure Storage abstracts platform differences - uses Keychain on iOS, KeyStore on Android',
        'Never store tokens in localStorage on mobile - XSS can access it',
        'SessionStorage is cleared when tab closes - better than localStorage but still vulnerable to XSS',
        'Classify data by sensitivity: public, internal, confidential, restricted',
      ],
    },
    {
      id: 213,
      title: 'Network Security & Certificate Pinning',
      content: `
        <h2>Secure Network Communication</h2>
        <p>All network communication must be encrypted using HTTPS/TLS. Certificate pinning adds an extra layer of security by validating the server's certificate against a known certificate or public key.</p>

        <h3>HTTPS vs HTTP</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>HTTP</th>
            <th>HTTPS</th>
          </tr>
          <tr>
            <td>Encryption</td>
            <td>❌ None</td>
            <td>✅ TLS/SSL</td>
          </tr>
          <tr>
            <td>Data Integrity</td>
            <td>❌ Can be modified</td>
            <td>✅ Tamper-proof</td>
          </tr>
          <tr>
            <td>Authentication</td>
            <td>❌ No verification</td>
            <td>✅ Server verified</td>
          </tr>
          <tr>
            <td>SEO</td>
            <td>Lower ranking</td>
            <td>Higher ranking</td>
          </tr>
          <tr>
            <td>Browser Warning</td>
            <td>⚠️ "Not Secure"</td>
            <td>✅ Padlock icon</td>
          </tr>
        </table>

        <h3>Certificate Pinning</h3>
        <p>Certificate pinning prevents man-in-the-middle attacks by validating the server's certificate against a known certificate or public key stored in the app.</p>

        <h4>Pinning Types:</h4>
        <ul>
          <li><strong>Certificate Pinning:</strong> Pin the entire certificate (expires with cert)</li>
          <li><strong>Public Key Pinning:</strong> Pin the public key only (survives cert renewal)</li>
        </ul>

        <h4>Benefits:</h4>
        <ul>
          <li>Prevents MITM attacks even with compromised CA</li>
          <li>Protects against rogue certificates</li>
          <li>Adds defense layer beyond standard TLS</li>
        </ul>

        <h4>Considerations:</h4>
        <ul>
          <li>⚠️ Must update app when certificate changes</li>
          <li>⚠️ Backup pins recommended</li>
          <li>⚠️ Test thoroughly before production</li>
        </ul>

        <h3>Security Headers</h3>
        <p>HTTP security headers protect against common attacks:</p>
        <ul>
          <li><strong>Strict-Transport-Security (HSTS):</strong> Enforce HTTPS</li>
          <li><strong>Content-Security-Policy (CSP):</strong> Prevent XSS</li>
          <li><strong>X-Frame-Options:</strong> Prevent clickjacking</li>
          <li><strong>X-Content-Type-Options:</strong> Prevent MIME sniffing</li>
          <li><strong>X-XSS-Protection:</strong> Browser XSS filter</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 6,
          language: 'typescript',
          title: 'Certificate Pinning with CapacitorHttp',
          code: `// src/app/services/http/secure-http.service.ts
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

/**
 * Secure HTTP service with certificate pinning
 */
@Injectable({
  providedIn: 'root'
})
export class SecureHttpService {
  // Production API certificate SHA-256 fingerprint
  // Get this by running: openssl s_client -connect api.yourapp.com:443 | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
  private readonly CERTIFICATE_PINS = {
    'api.yourapp.com': [
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', // Primary cert
      'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB='  // Backup cert
    ]
  };

  /**
   * Perform GET request with certificate pinning
   */
  async get(url: string, options?: HttpOptions): Promise<HttpResponse> {
    return this.request({
      url,
      method: 'GET',
      ...options
    });
  }

  /**
   * Perform POST request with certificate pinning
   */
  async post(url: string, data: any, options?: HttpOptions): Promise<HttpResponse> {
    return this.request({
      url,
      method: 'POST',
      data,
      ...options
    });
  }

  /**
   * Perform PUT request with certificate pinning
   */
  async put(url: string, data: any, options?: HttpOptions): Promise<HttpResponse> {
    return this.request({
      url,
      method: 'PUT',
      data,
      ...options
    });
  }

  /**
   * Perform DELETE request with certificate pinning
   */
  async delete(url: string, options?: HttpOptions): Promise<HttpResponse> {
    return this.request({
      url,
      method: 'DELETE',
      ...options
    });
  }

  /**
   * Generic request method with certificate pinning
   */
  private async request(options: HttpOptions): Promise<HttpResponse> {
    try {
      // Extract hostname from URL
      const hostname = new URL(options.url).hostname;

      // Add certificate pins if available
      if (this.CERTIFICATE_PINS[hostname]) {
        options = {
          ...options,
          // @ts-ignore - Certificate pinning may not be in all Capacitor versions
          sslPinning: {
            certificates: this.CERTIFICATE_PINS[hostname]
          }
        };
      }

      // Perform request with Capacitor HTTP
      const response = await CapacitorHttp.request(options);

      return response;
    } catch (error) {
      console.error('Secure HTTP request failed:', error);

      // Check if certificate pinning failed
      if (error.message && error.message.includes('certificate')) {
        throw new Error('Certificate validation failed. Possible MITM attack detected.');
      }

      throw error;
    }
  }

  /**
   * Validate SSL certificate manually (if needed)
   */
  async validateCertificate(url: string): Promise<boolean> {
    try {
      // Perform a simple GET to test certificate
      await this.get(url);
      return true;
    } catch (error) {
      console.error('Certificate validation failed:', error);
      return false;
    }
  }
}`,
          description: 'Secure HTTP service with certificate pinning for man-in-the-middle attack prevention',
          copyable: true,
        },
        {
          id: 7,
          language: 'typescript',
          title: 'Security Headers Interceptor',
          code: `// src/app/interceptors/security-headers.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone request and add security headers
    const secureReq = req.clone({
      headers: this.addSecurityHeaders(req.headers)
    });

    return next.handle(secureReq);
  }

  /**
   * Add security headers to request
   */
  private addSecurityHeaders(headers: HttpHeaders): HttpHeaders {
    let secureHeaders = headers;

    // Add Content-Type if not present
    if (!secureHeaders.has('Content-Type')) {
      secureHeaders = secureHeaders.set('Content-Type', 'application/json');
    }

    // Add X-Requested-With to identify AJAX requests
    secureHeaders = secureHeaders.set('X-Requested-With', 'XMLHttpRequest');

    // Add Accept header
    if (!secureHeaders.has('Accept')) {
      secureHeaders = secureHeaders.set('Accept', 'application/json');
    }

    // Add custom security header (optional)
    secureHeaders = secureHeaders.set('X-Client-Type', 'mobile-app');
    secureHeaders = secureHeaders.set('X-Client-Version', '1.0.0');

    return secureHeaders;
  }
}

// Register in app.config.ts
// providers: [
//   { provide: HTTP_INTERCEPTORS, useClass: SecurityHeadersInterceptor, multi: true }
// ]`,
          description: 'HTTP interceptor to add security headers to all requests',
          copyable: true,
        },
      ],
      interviewTips: [
        'TLS/SSL encrypts data in transit - HTTPS uses TLS to secure HTTP communication',
        'Certificate pinning protects against compromised Certificate Authorities',
        'Public key pinning is preferred - survives certificate renewal',
        'Always have backup pins - prevents app lockout if primary cert changes',
        'HSTS (HTTP Strict Transport Security) forces HTTPS for specified duration',
        'Man-in-the-middle attacks intercept traffic - HTTPS + pinning prevents this',
      ],
    },
    {
      id: 214,
      title: 'XSS Prevention & Input Validation',
      content: `
        <h2>Cross-Site Scripting (XSS) Prevention</h2>
        <p>XSS is one of the most common web vulnerabilities. Attackers inject malicious scripts that execute in users' browsers, stealing data or performing unauthorized actions.</p>

        <h3>XSS Attack Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Stored XSS</td>
            <td>Malicious script saved in database</td>
            <td>User comment with &lt;script&gt; tag</td>
          </tr>
          <tr>
            <td>Reflected XSS</td>
            <td>Script in URL reflected back to user</td>
            <td>Search query with script in URL</td>
          </tr>
          <tr>
            <td>DOM-based XSS</td>
            <td>Client-side script modification</td>
            <td>JavaScript modifying DOM with user input</td>
          </tr>
        </table>

        <h3>XSS Prevention Strategies</h3>
        <ul>
          <li><strong>Input Validation:</strong> Validate and sanitize all user inputs</li>
          <li><strong>Output Encoding:</strong> Encode data when displaying</li>
          <li><strong>CSP:</strong> Content Security Policy to restrict script sources</li>
          <li><strong>DomSanitizer:</strong> Use Angular's built-in sanitizer</li>
          <li><strong>Avoid innerHTML:</strong> Use textContent or Angular binding</li>
        </ul>

        <h3>Input Validation Best Practices</h3>
        <ul>
          <li>✅ Validate on both client and server (never trust client)</li>
          <li>✅ Use allowlists (whitelist valid inputs)</li>
          <li>✅ Reject unknown inputs by default</li>
          <li>✅ Validate data type, length, format, range</li>
          <li>✅ Sanitize before storing in database</li>
          <li>✅ Encode output when displaying</li>
        </ul>

        <h3>Content Security Policy (CSP)</h3>
        <p>CSP is an HTTP header that tells browsers which sources to trust for scripts, styles, and other resources:</p>
        <pre><code>Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';</code></pre>
      `,
      codeSnippets: [
        {
          id: 8,
          language: 'typescript',
          title: 'InputValidationService with Sanitization',
          code: `// src/app/services/security/input-validation.service.ts
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Sanitize user input to prevent XSS
   */
  sanitize(input: string): string {
    if (!input) return '';

    return input
      .replace(/[<>\"']/g, '') // Remove dangerous characters
      .trim();
  }

  /**
   * Sanitize HTML content
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(1, html) || ''; // SecurityContext.HTML = 1
  }

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate strong password
   * At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
   */
  isStrongPassword(password: string): boolean {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  }

  /**
   * Validate URL format
   */
  isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Validate phone number (US format)
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\\+?1?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Validate alphanumeric string
   */
  isAlphanumeric(input: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(input);
  }

  /**
   * Validate length
   */
  isValidLength(input: string, min: number, max: number): boolean {
    return input.length >= min && input.length <= max;
  }

  /**
   * Check for SQL injection patterns
   */
  containsSqlInjection(input: string): boolean {
    const sqlPatterns = [
      /('|(--)|;|\\*|xp_|sp_)/i,
      /(union|select|insert|update|delete|drop|create|alter)/i
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Check for XSS patterns
   */
  containsXss(input: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\\/script>/gi,
      /javascript:/gi,
      /on\\w+\\s*=/gi, // Event handlers like onclick=
      /<iframe/gi
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Sanitize filename to prevent path traversal
   */
  sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace special chars
      .replace(/\\.\\./g, '') // Remove path traversal
      .substring(0, 255); // Limit length
  }

  /**
   * Escape HTML entities
   */
  escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Validate and sanitize user input for display
   */
  prepareForDisplay(input: string): string {
    // Remove XSS patterns
    if (this.containsXss(input)) {
      console.warn('XSS pattern detected in input');
      return this.escapeHtml(input);
    }

    return this.sanitize(input);
  }
}`,
          description: 'Comprehensive input validation and sanitization service',
          copyable: true,
        },
      ],
      interviewTips: [
        'XSS allows attackers to inject JavaScript that executes in victim\'s browser',
        'Stored XSS is most dangerous - persists in database and affects all users',
        'Angular automatically escapes values in templates - {{}} is safe',
        'innerHTML is dangerous - use [textContent] or DomSanitizer if HTML needed',
        'CSP (Content Security Policy) is defense in depth - blocks inline scripts',
        'Always validate on server - client validation can be bypassed',
      ],
    },
  ],
};
