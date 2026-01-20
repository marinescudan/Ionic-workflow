// src/app/services/chapters/data/chapter-19.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_19_DATA: Chapter = {
  id: 19,
  title: 'Production & Deployment',
  description: 'Build, optimize, and deploy to iOS App Store, Google Play Store, and Web with CI/CD',
  icon: 'rocket-outline',
  category: 'advanced',
  completed: false,
  hasDemo: false,
  sections: [
    {
      id: 190,
      title: 'Environment Configuration',
      content: `
        <h2>Environment Setup</h2>
        <p>Modern applications require different configurations for development, staging, and production environments. Angular provides a powerful environment system to manage these configurations at build time.</p>

        <h3>Why Multiple Environments?</h3>
        <ul>
          <li><strong>API Endpoints:</strong> Point to different servers (localhost, staging, production)</li>
          <li><strong>Feature Flags:</strong> Enable/disable features per environment</li>
          <li><strong>Debug Settings:</strong> Logging, source maps, error reporting</li>
          <li><strong>API Keys:</strong> Different keys for development vs production</li>
          <li><strong>Analytics:</strong> Separate tracking IDs for testing vs production</li>
        </ul>

        <h3>Environment Strategy</h3>
        <table>
          <tr>
            <th>Environment</th>
            <th>Purpose</th>
            <th>API</th>
            <th>Debug</th>
          </tr>
          <tr>
            <td>Development</td>
            <td>Local development</td>
            <td>localhost:3000</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Staging</td>
            <td>QA testing</td>
            <td>staging.api.com</td>
            <td>Enabled</td>
          </tr>
          <tr>
            <td>Production</td>
            <td>Live users</td>
            <td>api.yourapp.com</td>
            <td>Disabled</td>
          </tr>
        </table>

        <h3>Security Best Practices</h3>
        <ul>
          <li>✅ Never commit real API keys to version control</li>
          <li>✅ Use environment variables in CI/CD for secrets</li>
          <li>✅ Enable source maps only in development</li>
          <li>✅ Use different Firebase projects per environment</li>
          <li>✅ Implement feature flags for gradual rollouts</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'environment.ts - Development Configuration',
          code: `// src/environments/environment.ts
export const environment = {
  production: false,
  staging: false,

  // API Configuration
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000',
  graphqlUrl: 'http://localhost:3000/graphql',

  // Feature Flags
  enableAnalytics: false,
  enableErrorReporting: false,
  enablePerformanceMonitoring: false,
  enableOfflineMode: true,
  enablePushNotifications: false,

  // Third-party Services (dev keys)
  firebase: {
    apiKey: 'AIzaSyDEV-KEY-FOR-DEVELOPMENT',
    authDomain: 'ionic-workflow-dev.firebaseapp.com',
    projectId: 'ionic-workflow-dev',
    storageBucket: 'ionic-workflow-dev.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef',
  },

  // Debug Settings
  debug: true,
  logLevel: 'debug',
  showDebugInfo: true,

  // App Settings
  appName: 'Ionic Workflow (Dev)',
  version: '1.0.0-dev',
  buildNumber: 1,
};`,
          description: 'Development environment with debug enabled and local API endpoints',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'environment.prod.ts - Production Configuration',
          code: `// src/environments/environment.prod.ts
export const environment = {
  production: true,
  staging: false,

  // API Configuration (production endpoints)
  apiUrl: 'https://api.ionicworkflow.com/api',
  wsUrl: 'wss://api.ionicworkflow.com',
  graphqlUrl: 'https://api.ionicworkflow.com/graphql',

  // Feature Flags
  enableAnalytics: true,
  enableErrorReporting: true,
  enablePerformanceMonitoring: true,
  enableOfflineMode: true,
  enablePushNotifications: true,

  // Third-party Services (production keys - injected via CI/CD)
  firebase: {
    apiKey: 'REPLACE_WITH_CI_CD_VARIABLE',
    authDomain: 'ionic-workflow.firebaseapp.com',
    projectId: 'ionic-workflow',
    storageBucket: 'ionic-workflow.appspot.com',
    messagingSenderId: '987654321',
    appId: '1:987654321:web:xyz123',
  },

  // Debug Settings (disabled in production)
  debug: false,
  logLevel: 'error',
  showDebugInfo: false,

  // App Settings
  appName: 'Ionic Workflow',
  version: '1.0.0',
  buildNumber: 1,
};`,
          description: 'Production environment with optimizations enabled and real API endpoints',
          copyable: true,
        },
        {
          id: 3,
          language: 'typescript',
          title: 'ConfigService - Using Environment Variables',
          code: `// src/app/services/config/config.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get isProduction(): boolean {
    return environment.production;
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  get wsUrl(): string {
    return environment.wsUrl;
  }

  get appVersion(): string {
    return environment.version;
  }

  // Feature flags
  isFeatureEnabled(feature: string): boolean {
    const featureMap: Record<string, boolean> = {
      analytics: environment.enableAnalytics,
      errorReporting: environment.enableErrorReporting,
      performanceMonitoring: environment.enablePerformanceMonitoring,
      offlineMode: environment.enableOfflineMode,
      pushNotifications: environment.enablePushNotifications,
    };

    return featureMap[feature] ?? false;
  }

  // Dynamic configuration
  getApiEndpoint(path: string): string {
    return \`\${this.apiUrl}/\${path}\`;
  }

  // Log only in development
  log(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.log(\`[ConfigService] \${message}\`, ...args);
    }
  }
}`,
          description: 'Service to access environment configuration throughout the app',
          copyable: true,
        },
      ],
      interviewTips: [
        'Environment files should never contain real production secrets - use CI/CD variables',
        'Angular uses fileReplacements in angular.json to swap environment files at build time',
        'Feature flags allow you to enable/disable features without rebuilding the app',
        'Always use HTTPS (not HTTP) for production API endpoints',
        'Source maps should be disabled in production to prevent code inspection',
      ],
    },
    {
      id: 191,
      title: 'Build Optimization',
      content: `
        <h2>Production Build Optimization</h2>
        <p>Optimizing your app for production is crucial for performance, user experience, and app store approval. A well-optimized app loads faster, uses less bandwidth, and provides a better experience.</p>

        <h3>Build Optimization Strategies</h3>
        <ul>
          <li><strong>Bundle Analysis:</strong> Identify large dependencies and optimize</li>
          <li><strong>Lazy Loading:</strong> Load routes on-demand instead of upfront</li>
          <li><strong>Tree Shaking:</strong> Remove unused code automatically</li>
          <li><strong>Minification:</strong> Compress JavaScript, CSS, and HTML</li>
          <li><strong>AOT Compilation:</strong> Ahead-of-time compilation for faster startup</li>
          <li><strong>PWA Optimization:</strong> Service workers for offline support</li>
        </ul>

        <h3>Target Bundle Sizes</h3>
        <table>
          <tr>
            <th>Build Type</th>
            <th>Initial Bundle</th>
            <th>Total Size</th>
            <th>Load Time (3G)</th>
          </tr>
          <tr>
            <td>Development</td>
            <td>5-10 MB</td>
            <td>15-30 MB</td>
            <td>30-60s</td>
          </tr>
          <tr>
            <td>Production</td>
            <td>500 KB - 1 MB</td>
            <td>2-4 MB</td>
            <td>5-10s</td>
          </tr>
        </table>

        <h3>Performance Metrics</h3>
        <ul>
          <li><strong>First Contentful Paint (FCP):</strong> < 1.8s</li>
          <li><strong>Time to Interactive (TTI):</strong> < 3.8s</li>
          <li><strong>Largest Contentful Paint (LCP):</strong> < 2.5s</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> < 0.1</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 4,
          language: 'bash',
          title: 'Bundle Analysis Commands',
          code: `# Install webpack bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Build with stats.json
ng build --stats-json

# Analyze bundle
npx webpack-bundle-analyzer www/stats.json

# Or use source-map-explorer
npm install --save-dev source-map-explorer
npx source-map-explorer www/**/*.js

# Check bundle sizes
ls -lh www/**/*.js | sort -k5 -h

# Lighthouse performance audit
npx lighthouse http://localhost:8100 --view`,
          description: 'Commands to analyze and optimize bundle size',
          copyable: true,
        },
        {
          id: 5,
          language: 'typescript',
          title: 'angular.json - Production Optimizations',
          code: `// angular.json - production configuration excerpt
{
  "configurations": {
    "production": {
      "optimization": {
        "scripts": true,
        "styles": {
          "minify": true,
          "inlineCritical": true
        },
        "fonts": true
      },
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "aot": true,
      "extractLicenses": true,
      "buildOptimizer": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        },
        {
          "type": "anyComponentStyle",
          "maximumWarning": "8kb",
          "maximumError": "10kb"
        }
      ],
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}`,
          description: 'Angular production build configuration with all optimizations enabled',
          copyable: true,
        },
        {
          id: 6,
          language: 'typescript',
          title: 'app.routes.ts - Lazy Loading Strategy',
          code: `// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chapters',
    pathMatch: 'full'
  },
  {
    path: 'chapters',
    loadComponent: () => import('./pages/chapters/chapters.page')
      .then(m => m.ChaptersPage)
  },
  {
    path: 'chapters/:id',
    loadComponent: () => import('./pages/chapters/chapter-detail/chapter-detail.page')
      .then(m => m.ChapterDetailPage)
  },
  {
    path: 'demo/:chapterId',
    loadComponent: () => import('./pages/demo/demo.page')
      .then(m => m.DemoPage)
  },
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.page')
      .then(m => m.ProgressPage)
  },
  {
    path: 'graphql-demo',
    loadComponent: () => import('./pages/graphql-demo/graphql-demo.page')
      .then(m => m.GraphqlDemoPage)
  },
  // Heavy pages loaded only when needed
  {
    path: 'webrtc',
    loadComponent: () => import('./pages/webrtc/webrtc.page')
      .then(m => m.WebrtcPage)
  },
  {
    path: 'camera',
    loadComponent: () => import('./pages/camera/camera.page')
      .then(m => m.CameraPage)
  }
];`,
          description: 'All routes use lazy loading with loadComponent for optimal code splitting',
          copyable: true,
        },
        {
          id: 7,
          language: 'typescript',
          title: 'ngsw-config.json - Service Worker Configuration',
          code: `// ngsw-config.json - PWA Service Worker Configuration
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api-calls",
      "urls": [
        "https://api.ionicworkflow.com/**"
      ],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1h",
        "timeout": "10s",
        "strategy": "freshness"
      }
    }
  ]
}`,
          description: 'PWA service worker configuration for offline support and caching',
          copyable: true,
        },
      ],
      interviewTips: [
        'Lazy loading can reduce initial bundle size by 50-70% in large applications',
        'Tree shaking only works with ES6 modules (import/export), not CommonJS (require)',
        'AOT (Ahead-of-Time) compilation catches template errors at build time, not runtime',
        'Source maps should be disabled in production to prevent reverse engineering',
        'Service workers enable offline functionality but add complexity - use for content-heavy apps',
      ],
    },
    {
      id: 192,
      title: 'iOS Deployment',
      content: `
        <h2>iOS App Store Deployment</h2>
        <p>Deploying to the iOS App Store requires an Apple Developer account ($99/year), Xcode, and proper signing certificates. The process involves building the app, signing it with your certificate, testing via TestFlight, and submitting for review.</p>

        <h3>iOS Deployment Prerequisites</h3>
        <ul>
          <li>✅ <strong>Apple Developer Account:</strong> $99/year individual or $299/year organization</li>
          <li>✅ <strong>macOS Computer:</strong> Required for Xcode and iOS builds</li>
          <li>✅ <strong>Xcode:</strong> Latest version from Mac App Store</li>
          <li>✅ <strong>Development Certificate:</strong> For testing on device</li>
          <li>✅ <strong>Distribution Certificate:</strong> For App Store submission</li>
          <li>✅ <strong>Provisioning Profile:</strong> Links your app ID to certificates</li>
          <li>✅ <strong>App ID:</strong> Unique identifier for your app (com.yourcompany.appname)</li>
        </ul>

        <h3>iOS Build Process</h3>
        <ol>
          <li><strong>Sync Capacitor:</strong> Copy web assets to iOS project</li>
          <li><strong>Open Xcode:</strong> Open the iOS project in Xcode</li>
          <li><strong>Configure Signing:</strong> Select your team and provisioning profile</li>
          <li><strong>Set Version:</strong> Update version and build number</li>
          <li><strong>Build Archive:</strong> Create an archive for distribution</li>
          <li><strong>Upload to TestFlight:</strong> Test with internal/external testers</li>
          <li><strong>Submit for Review:</strong> Fill out metadata and submit</li>
        </ol>

        <h3>Common iOS Rejection Reasons</h3>
        <table>
          <tr>
            <th>Reason</th>
            <th>Solution</th>
          </tr>
          <tr>
            <td>Missing privacy policy</td>
            <td>Add privacy policy URL in App Store Connect</td>
          </tr>
          <tr>
            <td>Incomplete Info.plist permissions</td>
            <td>Add usage descriptions for all APIs (camera, microphone, etc.)</td>
          </tr>
          <tr>
            <td>App crashes on launch</td>
            <td>Test thoroughly on real devices, not just simulator</td>
          </tr>
          <tr>
            <td>Misleading screenshots</td>
            <td>Screenshots must accurately represent app functionality</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 8,
          language: 'typescript',
          title: 'capacitor.config.ts - iOS Configuration',
          code: `// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.ionicworkflow',
  appName: 'Ionic Workflow',
  webDir: 'www',
  bundledWebRuntime: false,

  // iOS-specific configuration
  ios: {
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: true,
    scrollEnabled: true,
    backgroundColor: '#ffffff',

    // Prefer native navigation (iOS look & feel)
    preferredContentMode: 'mobile',
  },

  // Server configuration for live reload (development only)
  server: {
    // url: 'http://192.168.1.100:8100', // Uncomment for live reload
    // cleartext: true,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6366f1',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;`,
          description: 'Capacitor configuration with iOS-specific settings',
          copyable: true,
        },
        {
          id: 9,
          language: 'bash',
          title: 'iOS Build Commands',
          code: `# 1. Install dependencies
npm install

# 2. Build the web app for production
ionic build --prod

# 3. Sync web assets to iOS project
npx cap sync ios

# 4. Update iOS platform (if needed)
npx cap update ios

# 5. Open in Xcode
npx cap open ios

# ========================================
# In Xcode:
# ========================================
# 1. Select "Any iOS Device (arm64)" as build target
# 2. Go to Product > Archive
# 3. Wait for archive to complete
# 4. Window > Organizer > Select archive
# 5. Click "Distribute App"
# 6. Select "App Store Connect"
# 7. Upload

# ========================================
# Alternative: Command line build (advanced)
# ========================================
# Build archive via command line
xcodebuild -workspace ios/App/App.xcworkspace \\
  -scheme App \\
  -configuration Release \\
  -archivePath ./build/App.xcarchive \\
  archive

# Export for App Store
xcodebuild -exportArchive \\
  -archivePath ./build/App.xcarchive \\
  -exportPath ./build \\
  -exportOptionsPlist ios/App/ExportOptions.plist`,
          description: 'Complete iOS build and deployment process',
          copyable: true,
        },
        {
          id: 10,
          language: 'yaml',
          title: 'Fastlane - iOS Automation (Optional)',
          code: `# ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Build and upload to TestFlight"
  lane :beta do
    # Increment build number
    increment_build_number(xcodeproj: "App/App.xcodeproj")

    # Build the app
    build_app(
      workspace: "App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: {
          "com.yourcompany.ionicworkflow" => "Ionic Workflow AppStore"
        }
      }
    )

    # Upload to TestFlight
    upload_to_testflight(
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      changelog: "Bug fixes and performance improvements"
    )

    # Send notification
    slack(
      message: "iOS build uploaded to TestFlight! 🎉",
      success: true
    )
  end

  desc "Submit to App Store"
  lane :release do
    deliver(
      submit_for_review: true,
      automatic_release: false,
      force: true,
      skip_metadata: false,
      skip_screenshots: false,
      skip_binary_upload: false
    )
  end
end`,
          description: 'Fastlane configuration for automated iOS builds and uploads',
          copyable: true,
        },
      ],
      interviewTips: [
        'iOS requires a Mac for building - no way around this due to Xcode requirement',
        'Development certificates are for testing on devices, Distribution for App Store',
        'TestFlight allows up to 10,000 external testers without App Review',
        'App Review typically takes 24-48 hours but can vary significantly',
        'Keep Info.plist usage descriptions clear and honest to avoid rejection',
      ],
    },
    {
      id: 193,
      title: 'Android Deployment',
      content: `
        <h2>Google Play Store Deployment</h2>
        <p>Deploying to Google Play Store requires a Google Play Console account ($25 one-time fee), Android Studio, and a signed APK/AAB. The process is more flexible than iOS, with faster review times (typically 1-3 days).</p>

        <h3>Android Deployment Prerequisites</h3>
        <ul>
          <li>✅ <strong>Google Play Console Account:</strong> $25 one-time registration fee</li>
          <li>✅ <strong>Android Studio:</strong> Can build on Mac, Windows, or Linux</li>
          <li>✅ <strong>Keystore File:</strong> Used to sign your app (keep this secure!)</li>
          <li>✅ <strong>App Bundle (AAB):</strong> Preferred format for Play Store</li>
          <li>✅ <strong>or APK:</strong> Alternative format (larger file size)</li>
          <li>✅ <strong>Privacy Policy:</strong> Required for apps accessing sensitive data</li>
        </ul>

        <h3>Android Build Process</h3>
        <ol>
          <li><strong>Create Keystore:</strong> Generate signing key (ONE TIME - backup!)</li>
          <li><strong>Configure Gradle:</strong> Add signing configuration</li>
          <li><strong>Sync Capacitor:</strong> Copy web assets to Android project</li>
          <li><strong>Build Release:</strong> Generate signed AAB/APK</li>
          <li><strong>Upload to Play Console:</strong> Create app in Play Console</li>
          <li><strong>Internal Testing:</strong> Test with internal track first</li>
          <li><strong>Production Release:</strong> Roll out to users (can be gradual)</li>
        </ol>

        <h3>AAB vs APK</h3>
        <table>
          <tr>
            <th>Format</th>
            <th>Size</th>
            <th>Delivery</th>
            <th>Recommended</th>
          </tr>
          <tr>
            <td>AAB (Android App Bundle)</td>
            <td>Smaller (dynamic delivery)</td>
            <td>Play Store only</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>APK (Android Package)</td>
            <td>Larger (all resources)</td>
            <td>Anywhere</td>
            <td>❌ Legacy</td>
          </tr>
        </table>

        <h3>ProGuard Benefits</h3>
        <ul>
          <li><strong>Code Shrinking:</strong> Removes unused code and resources</li>
          <li><strong>Obfuscation:</strong> Renames classes/methods to short names</li>
          <li><strong>Optimization:</strong> Optimizes bytecode for better performance</li>
          <li><strong>Security:</strong> Makes reverse engineering much harder</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 11,
          language: 'bash',
          title: 'Generate Keystore (ONE TIME ONLY)',
          code: `# Generate keystore (BACKUP THIS FILE - YOU CAN'T RECOVER IT!)
keytool -genkey -v \\
  -keystore my-release-key.keystore \\
  -alias my-key-alias \\
  -keyalg RSA \\
  -keysize 2048 \\
  -validity 10000

# You'll be prompted for:
# - Keystore password (REMEMBER THIS!)
# - Key password (REMEMBER THIS!)
# - Your name and organization info

# Move keystore to safe location
mkdir -p android/app/release
mv my-release-key.keystore android/app/release/

# ⚠️ CRITICAL: Backup this keystore file!
# If you lose it, you can NEVER update your app on Play Store
# You'll have to publish a completely new app

# Check keystore info
keytool -list -v -keystore android/app/release/my-release-key.keystore`,
          description: 'Generate keystore file for signing Android releases (ONE TIME OPERATION)',
          copyable: true,
        },
        {
          id: 12,
          language: 'typescript',
          title: 'build.gradle - Signing Configuration',
          code: `// android/app/build.gradle

android {
    namespace "com.yourcompany.ionicworkflow"
    compileSdkVersion rootProject.ext.compileSdkVersion

    defaultConfig {
        applicationId "com.yourcompany.ionicworkflow"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"

        // Enable multidex for apps with 64K+ methods
        multiDexEnabled true
    }

    // Signing configuration for release builds
    signingConfigs {
        release {
            // Read from gradle.properties or environment variables
            storeFile file(System.getenv("KEYSTORE_FILE") ?: "release/my-release-key.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'

            // Shrink resources (removes unused resources)
            shrinkResources true
        }
        debug {
            minifyEnabled false
            debuggable true
        }
    }

    // Product flavors for different environments
    flavorDimensions "environment"
    productFlavors {
        dev {
            dimension "environment"
            applicationIdSuffix ".dev"
            versionNameSuffix "-dev"
        }
        staging {
            dimension "environment"
            applicationIdSuffix ".staging"
            versionNameSuffix "-staging"
        }
        prod {
            dimension "environment"
        }
    }
}`,
          description: 'Complete Gradle signing configuration with ProGuard and flavors',
          copyable: true,
        },
        {
          id: 13,
          language: 'bash',
          title: 'proguard-rules.pro - Code Obfuscation',
          code: `# android/app/proguard-rules.pro

# Keep Capacitor classes
-keep class com.getcapacitor.** { *; }
-keepclassmembers class com.getcapacitor.** { *; }

# Keep Ionic/Cordova classes
-keep class org.apache.cordova.** { *; }

# Keep model classes (data classes used for JSON)
-keep class com.yourcompany.ionicworkflow.models.** { *; }

# Keep WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep custom view constructors
-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet);
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep Serializable classes
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Remove logging in production
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Keep Firebase
-keep class com.google.firebase.** { *; }

# Keep Gson/JSON libraries
-keep class com.google.gson.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}`,
          description: 'ProGuard rules to obfuscate code while keeping necessary classes',
          copyable: true,
        },
        {
          id: 14,
          language: 'bash',
          title: 'Android Build Commands',
          code: `# 1. Install dependencies
npm install

# 2. Build the web app for production
ionic build --prod

# 3. Sync web assets to Android project
npx cap sync android

# 4. Update Android platform (if needed)
npx cap update android

# ========================================
# Option 1: Build via Android Studio (Recommended)
# ========================================
npx cap open android

# In Android Studio:
# 1. Build > Select Build Variant > prodRelease
# 2. Build > Generate Signed Bundle / APK
# 3. Select Android App Bundle (AAB)
# 4. Select your keystore
# 5. Enter passwords
# 6. Click Finish

# ========================================
# Option 2: Build via Command Line
# ========================================

# Set environment variables for signing
export KEYSTORE_FILE="./android/app/release/my-release-key.keystore"
export KEYSTORE_PASSWORD="your_keystore_password"
export KEY_ALIAS="my-key-alias"
export KEY_PASSWORD="your_key_password"

# Build release AAB (Android App Bundle - RECOMMENDED)
cd android
./gradlew bundleProdRelease

# Or build release APK
./gradlew assembleProdRelease

# Output files:
# AAB: android/app/build/outputs/bundle/prodRelease/app-prod-release.aab
# APK: android/app/build/outputs/apk/prodRelease/app-prod-release.apk

# ========================================
# Verify the build
# ========================================
# Check AAB contents
bundletool build-apks --bundle=app-prod-release.aab \\
  --output=app.apks \\
  --ks=my-release-key.keystore \\
  --ks-key-alias=my-key-alias

# Install on connected device
bundletool install-apks --apks=app.apks`,
          description: 'Complete Android build process for Play Store submission',
          copyable: true,
        },
      ],
      interviewTips: [
        'Losing your keystore means you can never update your app - backup to multiple secure locations',
        'AAB (App Bundle) is required for new apps on Play Store since August 2021',
        'ProGuard shrinks code by 30-50% and makes reverse engineering much harder',
        'Internal testing track allows up to 100 testers without review',
        'Staged rollouts (5% → 20% → 50% → 100%) reduce risk of critical bugs',
      ],
    },
    {
      id: 194,
      title: 'Web Deployment',
      content: `
        <h2>Web Deployment</h2>
        <p>Deploying the web version of your Ionic app provides instant access without app store approval. You can deploy to Firebase Hosting, Netlify, Vercel, or any static hosting service. PWA features enable offline support and "Add to Home Screen" functionality.</p>

        <h3>Web Deployment Options</h3>
        <table>
          <tr>
            <th>Service</th>
            <th>Free Tier</th>
            <th>Build Time</th>
            <th>CDN</th>
            <th>SSL</th>
          </tr>
          <tr>
            <td>Firebase Hosting</td>
            <td>10 GB storage, 360 MB/day transfer</td>
            <td>~2 min</td>
            <td>✅ Global</td>
            <td>✅ Free</td>
          </tr>
          <tr>
            <td>Netlify</td>
            <td>100 GB bandwidth</td>
            <td>~1 min</td>
            <td>✅ Global</td>
            <td>✅ Free</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>100 GB bandwidth</td>
            <td>~30 sec</td>
            <td>✅ Global</td>
            <td>✅ Free</td>
          </tr>
        </table>

        <h3>PWA Features</h3>
        <ul>
          <li><strong>Offline Support:</strong> Service workers cache assets for offline use</li>
          <li><strong>Add to Home Screen:</strong> Install prompt for mobile browsers</li>
          <li><strong>Push Notifications:</strong> Web push notifications (Chrome, Firefox)</li>
          <li><strong>Background Sync:</strong> Sync data when connection restored</li>
          <li><strong>App-like Experience:</strong> Full screen, splash screen, app icon</li>
        </ul>

        <h3>Custom Domain Setup</h3>
        <ol>
          <li><strong>Purchase Domain:</strong> Use Namecheap, GoDaddy, or Google Domains</li>
          <li><strong>Add DNS Records:</strong> Point domain to hosting provider</li>
          <li><strong>Configure SSL:</strong> Enable HTTPS (usually automatic)</li>
          <li><strong>Test:</strong> Verify domain works with HTTPS</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 15,
          language: 'typescript',
          title: 'firebase.json - Firebase Hosting Configuration',
          code: `// firebase.json
{
  "hosting": {
    "public": "www",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "ngsw.json",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "**/*",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
}`,
          description: 'Firebase Hosting configuration with caching and security headers',
          copyable: true,
        },
        {
          id: 16,
          language: 'bash',
          title: 'Firebase Deployment Commands',
          code: `# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Hosting
# - Use existing project or create new
# - Public directory: www
# - Configure as SPA: Yes
# - Setup automatic builds: No

# Build the app
ionic build --prod

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy to specific site (if using multiple sites)
firebase deploy --only hosting:production

# Preview before deploying
firebase hosting:channel:deploy preview

# View deployment
firebase open hosting:site

# ========================================
# Continuous Deployment (GitHub Actions)
# ========================================
# See CI/CD section for automated deployment`,
          description: 'Firebase Hosting deployment workflow',
          copyable: true,
        },
        {
          id: 17,
          language: 'typescript',
          title: 'netlify.toml - Netlify Configuration',
          code: `# netlify.toml
[build]
  base = "/"
  publish = "www"
  command = "npm run build:prod"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/manifest.webmanifest"
  [headers.values]
    Content-Type = "application/manifest+json"

# Environment-specific deployments
[context.production]
  environment = { NODE_ENV = "production" }

[context.deploy-preview]
  environment = { NODE_ENV = "staging" }

[context.branch-deploy]
  environment = { NODE_ENV = "development" }`,
          description: 'Netlify configuration with SPA routing and caching',
          copyable: true,
        },
        {
          id: 18,
          language: 'bash',
          title: '_redirects - SPA Routing for Static Hosts',
          code: `# www/_redirects (for Netlify, Surge, etc.)

# Redirect all routes to index.html for SPA routing
/*    /index.html   200

# Or with custom 404 page
/*    /index.html   404

# API proxy (optional - forward API calls to backend)
/api/*  https://api.yourbackend.com/:splat  200

# Custom domain redirects
https://www.yourdomain.com/*  https://yourdomain.com/:splat  301!`,
          description: 'Redirects file for SPA routing on static hosting providers',
          copyable: true,
        },
      ],
      interviewTips: [
        'PWAs can be installed like native apps but don\'t have access to all device APIs',
        'Service workers must be served over HTTPS (except localhost for testing)',
        'CDN caching dramatically improves performance - set long cache times for assets',
        'Always use Cache-Control: no-cache for index.html to ensure users get latest version',
        'Firebase Hosting provides automatic SSL and global CDN for free',
      ],
    },
    {
      id: 195,
      title: 'CI/CD Pipeline',
      content: `
        <h2>CI/CD Automation</h2>
        <p>Continuous Integration and Continuous Deployment (CI/CD) automates testing, building, and deploying your app. This reduces manual errors, speeds up releases, and ensures consistent quality.</p>

        <h3>CI/CD Benefits</h3>
        <ul>
          <li><strong>Automated Testing:</strong> Run tests on every commit</li>
          <li><strong>Consistent Builds:</strong> Same build process every time</li>
          <li><strong>Faster Releases:</strong> Deploy in minutes, not hours</li>
          <li><strong>Reduced Errors:</strong> No manual deployment mistakes</li>
          <li><strong>Version Control:</strong> Track every build and deployment</li>
          <li><strong>Rollback:</strong> Easy to revert to previous versions</li>
        </ul>

        <h3>GitHub Actions Workflow</h3>
        <table>
          <tr>
            <th>Trigger</th>
            <th>Actions</th>
            <th>Duration</th>
          </tr>
          <tr>
            <td>Push to main</td>
            <td>Lint, test, build</td>
            <td>~5 min</td>
          </tr>
          <tr>
            <td>Pull request</td>
            <td>Lint, test, preview deploy</td>
            <td>~7 min</td>
          </tr>
          <tr>
            <td>Tag (v*)</td>
            <td>Build iOS/Android, deploy</td>
            <td>~20 min</td>
          </tr>
        </table>

        <h3>Secrets Management</h3>
        <p>Store sensitive data in GitHub Secrets (Settings > Secrets and variables > Actions):</p>
        <ul>
          <li><code>FIREBASE_TOKEN</code> - Firebase deployment token</li>
          <li><code>APPLE_CERTIFICATE_BASE64</code> - iOS signing certificate</li>
          <li><code>APPLE_PROVISIONING_PROFILE_BASE64</code> - iOS provisioning profile</li>
          <li><code>ANDROID_KEYSTORE_BASE64</code> - Android keystore</li>
          <li><code>KEYSTORE_PASSWORD</code> - Keystore password</li>
          <li><code>KEY_ALIAS</code> - Key alias</li>
          <li><code>KEY_PASSWORD</code> - Key password</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 19,
          language: 'yaml',
          title: '.github/workflows/ci.yml - Continuous Integration',
          code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Run unit tests
        run: npm run test:ci

      - name: Build app
        run: npm run build:prod

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

      - name: Archive build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: www/`,
          description: 'Basic CI workflow for linting, testing, and building',
          copyable: true,
        },
        {
          id: 20,
          language: 'yaml',
          title: '.github/workflows/deploy-web.yml - Web Deployment',
          code: `# .github/workflows/deploy-web.yml
name: Deploy Web

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build production app
        run: npm run build:prod
        env:
          NODE_ENV: production

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '\${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '\${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: ionic-workflow

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './www'
          production-branch: main
          github-token: \${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: \${{ job.status }}
          text: 'Web deployment completed! 🚀'
          webhook_url: \${{ secrets.SLACK_WEBHOOK }}
        if: always()`,
          description: 'Automated web deployment to Firebase and Netlify',
          copyable: true,
        },
        {
          id: 21,
          language: 'yaml',
          title: '.github/workflows/ios-build.yml - iOS Build and Upload',
          code: `# .github/workflows/ios-build.yml
name: iOS Build

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build-ios:
    runs-on: macos-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build web app
        run: npm run build:prod

      - name: Setup Capacitor
        run: |
          npx cap sync ios
          npx cap update ios

      - name: Install the Apple certificate and provisioning profile
        env:
          BUILD_CERTIFICATE_BASE64: \${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          P12_PASSWORD: \${{ secrets.P12_PASSWORD }}
          BUILD_PROVISION_PROFILE_BASE64: \${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
          KEYCHAIN_PASSWORD: \${{ secrets.KEYCHAIN_PASSWORD }}
        run: |
          # Create variables
          CERTIFICATE_PATH=$RUNNER_TEMP/build_certificate.p12
          PP_PATH=$RUNNER_TEMP/build_pp.mobileprovision
          KEYCHAIN_PATH=$RUNNER_TEMP/app-signing.keychain-db

          # Import certificate and provisioning profile from secrets
          echo -n "$BUILD_CERTIFICATE_BASE64" | base64 --decode -o $CERTIFICATE_PATH
          echo -n "$BUILD_PROVISION_PROFILE_BASE64" | base64 --decode -o $PP_PATH

          # Create temporary keychain
          security create-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
          security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
          security unlock-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH

          # Import certificate to keychain
          security import $CERTIFICATE_PATH -P "$P12_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
          security list-keychain -d user -s $KEYCHAIN_PATH

          # Apply provisioning profile
          mkdir -p ~/Library/MobileDevice/Provisioning\\ Profiles
          cp $PP_PATH ~/Library/MobileDevice/Provisioning\\ Profiles

      - name: Build iOS app
        run: |
          xcodebuild -workspace ios/App/App.xcworkspace \\
            -scheme App \\
            -configuration Release \\
            -archivePath $RUNNER_TEMP/App.xcarchive \\
            archive

      - name: Export IPA
        run: |
          xcodebuild -exportArchive \\
            -archivePath $RUNNER_TEMP/App.xcarchive \\
            -exportPath $RUNNER_TEMP/build \\
            -exportOptionsPlist ios/App/ExportOptions.plist

      - name: Upload to TestFlight
        uses: apple-actions/upload-testflight-build@v1
        with:
          app-path: $RUNNER_TEMP/build/App.ipa
          issuer-id: \${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
          api-key-id: \${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
          api-private-key: \${{ secrets.APP_STORE_CONNECT_API_PRIVATE_KEY }}

      - name: Clean up keychain
        if: always()
        run: |
          security delete-keychain $RUNNER_TEMP/app-signing.keychain-db`,
          description: 'Complete iOS build and TestFlight upload workflow',
          copyable: true,
        },
        {
          id: 22,
          language: 'yaml',
          title: '.github/workflows/android-build.yml - Android Build',
          code: `# .github/workflows/android-build.yml
name: Android Build

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build-android:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Install dependencies
        run: npm ci

      - name: Build web app
        run: npm run build:prod

      - name: Setup Capacitor
        run: |
          npx cap sync android
          npx cap update android

      - name: Decode Keystore
        env:
          ANDROID_KEYSTORE_BASE64: \${{ secrets.ANDROID_KEYSTORE_BASE64 }}
        run: |
          echo $ANDROID_KEYSTORE_BASE64 | base64 -d > android/app/release/my-release-key.keystore

      - name: Build Android AAB
        env:
          KEYSTORE_PASSWORD: \${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.KEY_PASSWORD }}
        run: |
          cd android
          ./gradlew bundleProdRelease

      - name: Sign AAB
        uses: r0adkll/sign-android-release@v1
        with:
          releaseDirectory: android/app/build/outputs/bundle/prodRelease
          signingKeyBase64: \${{ secrets.ANDROID_KEYSTORE_BASE64 }}
          alias: \${{ secrets.KEY_ALIAS }}
          keyStorePassword: \${{ secrets.KEYSTORE_PASSWORD }}
          keyPassword: \${{ secrets.KEY_PASSWORD }}

      - name: Upload to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.PLAY_STORE_SERVICE_ACCOUNT_JSON }}
          packageName: com.yourcompany.ionicworkflow
          releaseFiles: android/app/build/outputs/bundle/prodRelease/app-prod-release.aab
          track: internal
          status: completed
          inAppUpdatePriority: 2

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: android-release
          path: android/app/build/outputs/bundle/prodRelease/app-prod-release.aab`,
          description: 'Complete Android build and Play Store upload workflow',
          copyable: true,
        },
      ],
      interviewTips: [
        'GitHub Actions provides 2,000 free minutes/month for private repos, unlimited for public',
        'macOS runners are required for iOS builds and cost 10x Linux minutes',
        'Store signing credentials as GitHub Secrets, never commit them to the repo',
        'Use matrix builds to test on multiple Node/Java versions simultaneously',
        'Separate workflows for PR checks vs production deployments for better control',
      ],
    },
    {
      id: 196,
      title: 'Security & Production Best Practices',
      content: `
        <h2>Security Hardening</h2>
        <p>Production apps must be secured against common vulnerabilities. This includes API key protection, code obfuscation, certificate pinning, and following platform-specific security guidelines.</p>

        <h3>Security Checklist</h3>
        <ul>
          <li>✅ <strong>API Keys:</strong> Never commit secrets to git, use environment variables</li>
          <li>✅ <strong>HTTPS Only:</strong> Enforce SSL/TLS for all network requests</li>
          <li>✅ <strong>Certificate Pinning:</strong> Prevent man-in-the-middle attacks</li>
          <li>✅ <strong>Code Obfuscation:</strong> Use ProGuard (Android) to obfuscate code</li>
          <li>✅ <strong>Input Validation:</strong> Sanitize all user input to prevent XSS/injection</li>
          <li>✅ <strong>Authentication:</strong> Use OAuth 2.0, never store passwords in plain text</li>
          <li>✅ <strong>Storage Encryption:</strong> Encrypt sensitive data in SQLite/preferences</li>
          <li>✅ <strong>Biometric Auth:</strong> Use device biometrics for sensitive actions</li>
          <li>✅ <strong>Session Management:</strong> Implement token refresh and timeout</li>
          <li>✅ <strong>Error Handling:</strong> Don\\'t expose sensitive info in error messages</li>
        </ul>

        <h3>Common Vulnerabilities</h3>
        <table>
          <tr>
            <th>Vulnerability</th>
            <th>Risk</th>
            <th>Prevention</th>
          </tr>
          <tr>
            <td>Exposed API Keys</td>
            <td>🔴 Critical</td>
            <td>Use environment variables, key rotation</td>
          </tr>
          <tr>
            <td>Insecure HTTP</td>
            <td>🔴 Critical</td>
            <td>Enforce HTTPS, HSTS headers</td>
          </tr>
          <tr>
            <td>SQL Injection</td>
            <td>🟠 High</td>
            <td>Use parameterized queries, ORMs</td>
          </tr>
          <tr>
            <td>XSS Attacks</td>
            <td>🟠 High</td>
            <td>Sanitize input, CSP headers</td>
          </tr>
          <tr>
            <td>Code Tampering</td>
            <td>🟡 Medium</td>
            <td>Code signing, obfuscation, integrity checks</td>
          </tr>
        </table>

        <h3>Performance Monitoring</h3>
        <p>Monitor production apps to detect and fix issues quickly:</p>
        <ul>
          <li><strong>Error Tracking:</strong> Sentry, Bugsnag, Firebase Crashlytics</li>
          <li><strong>Performance:</strong> Firebase Performance, New Relic</li>
          <li><strong>Analytics:</strong> Google Analytics, Mixpanel, Amplitude</li>
          <li><strong>Logs:</strong> Centralized logging with Loggly, Papertrail</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 23,
          language: 'typescript',
          title: 'API Key Service with Obfuscation',
          code: `// src/app/services/security/api-key.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  // Never store keys directly in code like this in production
  // This is for demonstration only

  private readonly keys = {
    // Obfuscated keys (base64 encoded)
    firebase: this.decode(environment.firebase.apiKey),
    google: this.decode('R29vZ2xlQVBJS2V5SGVyZQ=='),
  };

  // Decode base64 (basic obfuscation)
  private decode(encoded: string): string {
    try {
      return atob(encoded);
    } catch (e) {
      console.error('Failed to decode API key');
      return '';
    }
  }

  // Get API key for service
  getKey(service: 'firebase' | 'google'): string {
    if (!environment.production) {
      console.warn(\`Using API key for: \${service}\`);
    }
    return this.keys[service] || '';
  }

  // Validate API key format
  private validateKey(key: string): boolean {
    return key.length > 0 && !key.includes('REPLACE_WITH');
  }

  // Check if keys are configured
  checkConfiguration(): boolean {
    const firebaseKey = this.getKey('firebase');
    if (!this.validateKey(firebaseKey)) {
      console.error('Firebase API key not configured!');
      return false;
    }
    return true;
  }
}

// ====================================
// BEST PRACTICE: Use a backend proxy
// ====================================
// Instead of storing API keys in the app, proxy requests through your backend:
//
// Frontend: POST /api/send-notification
// Backend: Adds API key and forwards to Firebase
//
// This way, API keys are never exposed to the client`,
          description: 'Service to manage and obfuscate API keys (use backend proxy in production)',
          copyable: true,
        },
        {
          id: 24,
          language: 'typescript',
          title: 'Sentry Error Tracking Setup',
          code: `// src/main.ts - Sentry integration
import { enableProdMode, ErrorHandler } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry
if (environment.production) {
  Sentry.init({
    dsn: "https://your-dsn@sentry.io/project-id",
    integrations: [
      new BrowserTracing({
        tracingOrigins: ["localhost", "https://api.yourapp.com"],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
    environment: 'production',
    release: \`ionic-workflow@\${environment.version}\`,

    // Filter sensitive data
    beforeSend(event, hint) {
      // Remove sensitive data from error reports
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }

      // Don't send errors from development
      if (event.environment === 'development') {
        return null;
      }

      return event;
    },

    // Ignore common non-critical errors
    ignoreErrors: [
      'Non-Error promise rejection captured',
      'ResizeObserver loop limit exceeded',
      'Network request failed',
    ],
  });
}

// src/app/app.config.ts - Provide Sentry error handler
import { ErrorHandler } from '@angular/core';
import * as Sentry from "@sentry/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false, // Don't show Sentry error dialog
      }),
    },
    // ... other providers
  ],
};`,
          description: 'Production error tracking with Sentry',
          copyable: true,
        },
        {
          id: 25,
          language: 'typescript',
          title: 'Firebase Performance Monitoring',
          code: `// src/app/services/monitoring/performance.service.ts
import { Injectable } from '@angular/core';
import { getPerformance, trace } from 'firebase/performance';
import { initializeApp } from 'firebase/app';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private performance;

  constructor() {
    if (environment.enablePerformanceMonitoring) {
      const app = initializeApp(environment.firebase);
      this.performance = getPerformance(app);
    }
  }

  // Measure custom operations
  async measureOperation<T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> {
    if (!this.performance) {
      return operation();
    }

    const traceInstance = trace(this.performance, operationName);
    traceInstance.start();

    try {
      const result = await operation();
      traceInstance.stop();
      return result;
    } catch (error) {
      traceInstance.putAttribute('error', 'true');
      traceInstance.stop();
      throw error;
    }
  }

  // Example: Measure API calls
  async measureApiCall<T>(
    endpoint: string,
    apiCall: () => Promise<T>
  ): Promise<T> {
    return this.measureOperation(\`api_\${endpoint}\`, apiCall);
  }

  // Example: Measure page load
  measurePageLoad(pageName: string): void {
    if (!this.performance) return;

    const pageTrace = trace(this.performance, \`page_\${pageName}\`);
    pageTrace.start();

    // Stop trace after page is interactive
    setTimeout(() => {
      pageTrace.stop();
    }, 0);
  }
}

// Usage in component:
// constructor(private performanceService: PerformanceService) {}
//
// ngOnInit() {
//   this.performanceService.measurePageLoad('chapters');
// }
//
// loadChapters() {
//   return this.performanceService.measureApiCall(
//     'chapters',
//     () => this.http.get('/api/chapters')
//   );
// }`,
          description: 'Firebase Performance Monitoring for tracking app performance',
          copyable: true,
        },
      ],
      interviewTips: [
        'Certificate pinning prevents MITM attacks but requires app updates for cert rotation',
        'ProGuard obfuscation can reduce APK size by 30-50% and makes reverse engineering harder',
        'Store secrets in backend, never in client code - mobile apps can be decompiled',
        'HTTPS is not enough - use certificate pinning for critical financial/health apps',
        'Monitor production errors with Sentry/Crashlytics to catch issues before users report them',
      ],
    },
  ],
};
