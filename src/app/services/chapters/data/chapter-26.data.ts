// src/app/services/chapters/data/chapter-26.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_26_DATA: Chapter = {
  id: 26,
  title: 'Custom Capacitor Plugins',
  description: 'Master building custom Capacitor plugins with native iOS (Swift), Android (Kotlin), and web implementations. Bridge native capabilities to web with TypeScript interfaces, event listeners, background tasks, and production-ready plugin development.',
  icon: 'code-working-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 260,
      title: 'Capacitor Plugin Architecture Overview',
      content: `
        <h2>Understanding Capacitor Plugins</h2>
        <p>Capacitor plugins bridge web code (TypeScript/JavaScript) with native platform APIs (iOS Swift, Android Kotlin). They enable your Ionic/web app to access native device features unavailable in browsers.</p>

        <h3>Plugin Architecture</h3>
        <p>Capacitor uses a bidirectional bridge:</p>
        <ul>
          <li><strong>Web → Native:</strong> Call native methods from JavaScript</li>
          <li><strong>Native → Web:</strong> Send events from native code to JavaScript</li>
          <li><strong>Type Safety:</strong> Full TypeScript support with interfaces</li>
          <li><strong>Promise-based:</strong> Async/await for all native operations</li>
        </ul>

        <h3>Capacitor vs Cordova</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>Capacitor</th>
            <th>Cordova</th>
          </tr>
          <tr>
            <td>Language Support</td>
            <td>TypeScript-first, modern Swift/Kotlin</td>
            <td>JavaScript-only, Objective-C/Java</td>
          </tr>
          <tr>
            <td>Architecture</td>
            <td>Web-first with native fallback</td>
            <td>Native-first approach</td>
          </tr>
          <tr>
            <td>Native Projects</td>
            <td>Part of source code, direct access</td>
            <td>Generated/managed by CLI</td>
          </tr>
          <tr>
            <td>Configuration</td>
            <td>Simple TypeScript config</td>
            <td>Heavy XML (plugin.xml, config.xml)</td>
          </tr>
          <tr>
            <td>IDE Support</td>
            <td>Excellent autocomplete and types</td>
            <td>Limited type information</td>
          </tr>
        </table>

        <h3>When to Create a Custom Plugin</h3>
        <h4>✅ Create Plugin When:</h4>
        <ul>
          <li>Need hardware access not in official plugins (NFC, BLE, sensors)</li>
          <li>Require custom native UI components (custom camera, video player)</li>
          <li>Need platform-specific SDKs (payment, analytics, ML models)</li>
          <li>Background processing requirements (sync, notifications, location)</li>
          <li>Performance-critical operations (image processing, encryption)</li>
        </ul>

        <h4>❌ Use Existing Plugin When:</h4>
        <ul>
          <li>Official Capacitor plugin exists (@capacitor/camera, @capacitor/geolocation)</li>
          <li>Community plugin exists (@capacitor-community/*)</li>
          <li>Can be done with Web APIs (Battery Status API, Geolocation API)</li>
          <li>Simple HTTP/storage - use Angular HttpClient or Storage plugins</li>
        </ul>

        <h3>Plugin Lifecycle</h3>
        <ol>
          <li><strong>Registration:</strong> Plugin registered when app loads</li>
          <li><strong>Initialization:</strong> Plugin initializes on first method call</li>
          <li><strong>Method Invocation:</strong> Each call goes through bridge</li>
          <li><strong>Event Listeners:</strong> Bidirectional communication setup</li>
          <li><strong>Cleanup:</strong> Remove listeners to prevent memory leaks</li>
        </ol>

        <h3>Communication Patterns</h3>
        <ul>
          <li><strong>Simple Promise:</strong> One-time operations with result</li>
          <li><strong>Promise (void):</strong> Actions without return value</li>
          <li><strong>Event Listeners:</strong> Continuous monitoring, sensor data</li>
          <li><strong>Multiple Calls:</strong> Complex multi-step workflows</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Plugin Architecture Overview',
          code: `/**
 * Capacitor Plugin Architecture
 *
 * 💡 INTERVIEW: Capacitor uses a bidirectional bridge that allows:
 * 1. Web → Native: Call native methods from JavaScript
 * 2. Native → Web: Send events from native code to JavaScript
 * 3. Type Safety: Full TypeScript support with interfaces
 * 4. Promise-based: Async/await for all native operations
 */

interface PluginArchitecture {
  webLayer: {
    technology: 'TypeScript/JavaScript';
    purpose: 'Define plugin interface and web fallback';
    components: [
      'definitions.ts - Plugin interface',
      'index.ts - Plugin registration',
      'web.ts - Web implementation (fallback)'
    ];
  };

  bridge: {
    technology: 'Capacitor Core';
    purpose: 'Route calls between web and native';
    features: [
      'Method invocation (web → native)',
      'Event listeners (native → web)',
      'Serialization (JSON bridge)',
      'Error handling'
    ];
  };

  iosLayer: {
    technology: 'Swift + Objective-C';
    purpose: 'iOS platform implementation';
    components: [
      'Plugin.swift - Swift implementation',
      'Plugin.m - Objective-C bridge (exposes Swift to Capacitor)'
    ];
  };

  androidLayer: {
    technology: 'Kotlin/Java';
    purpose: 'Android platform implementation';
    components: [
      'Plugin.kt - Kotlin implementation',
      '@CapacitorPlugin annotation'
    ];
  };
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Plugin Communication Patterns',
          code: `/**
 * Plugin Communication Patterns
 *
 * 💡 INTERVIEW: Different patterns for different use cases
 */

// Pattern 1: Simple Promise (Most Common)
// Use for: One-time operations with immediate result
interface SimplePromisePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getBatteryLevel(): Promise<{ level: number }>;
}

// Usage:
const result = await MyPlugin.echo({ value: 'Hello' });
console.log(result.value); // "Hello"

// Pattern 2: Promise with No Return (Fire-and-Forget)
// Use for: Actions without meaningful return value
interface NoReturnPlugin {
  showAlert(options: { title: string; message: string }): Promise<void>;
  vibrate(options: { duration: number }): Promise<void>;
}

// Usage:
await MyPlugin.showAlert({ title: 'Hi', message: 'Welcome!' });

// Pattern 3: Event Listeners (Real-time Updates)
// Use for: Continuous monitoring, sensor data, location updates
interface EventListenerPlugin {
  addListener(
    eventName: 'batteryChanged',
    listenerFunc: (info: { level: number; isCharging: boolean }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  removeAllListeners(): Promise<void>;
}

// Usage:
const listener = await MyPlugin.addListener('batteryChanged', (info) => {
  console.log('Battery:', info.level, 'Charging:', info.isCharging);
});

// Clean up when done
await listener.remove();

// Pattern 4: Multiple Method Calls (Complex Operations)
// Use for: Multi-step workflows
interface ComplexPlugin {
  initialize(config: any): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  getStatus(): Promise<{ running: boolean }>;
}

// Usage:
await MyPlugin.initialize({ apiKey: 'xxx' });
await MyPlugin.start();
const status = await MyPlugin.getStatus();
await MyPlugin.stop();

/**
 * 💡 INTERVIEW: Choose the right pattern based on:
 * - Frequency: One-time → Promise; Continuous → Event Listener
 * - Return value: Result → Promise<T>; No result → Promise<void>
 * - Complexity: Simple → Single method; Complex → Multiple methods
 */`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Capacitor vs Cordova: Capacitor uses TypeScript-first with Swift/Kotlin, while Cordova uses JavaScript with Objective-C/Java',
        'Bridge communication: JSON serialization for web↔native, Promise-based async operations',
        'Plugin lifecycle: Registration → Initialization → Method calls → Event listeners → Cleanup',
        'When to build plugin: Need hardware access, custom native UI, or platform-specific SDKs not available in existing plugins',
        'Memory management: Always remove event listeners in ngOnDestroy to prevent memory leaks',
      ],
    },
    {
      id: 261,
      title: 'Setting Up Plugin Development',
      content: `
        <h2>Creating a New Capacitor Plugin</h2>
        <p>The Capacitor CLI provides a plugin scaffolding tool that generates a complete plugin template with TypeScript, iOS, Android, and build configuration.</p>

        <h3>Plugin Project Structure</h3>
        <pre><code>my-custom-plugin/
├── src/
│   ├── definitions.ts          (TypeScript interfaces - YOUR API)
│   ├── index.ts                (Plugin registration)
│   └── web.ts                  (Web fallback implementation)
├── ios/
│   └── Plugin/
│       ├── Plugin.swift        (iOS Swift implementation)
│       ├── Plugin.m            (Objective-C bridge)
│       └── Plugin.xcodeproj    (Xcode project)
├── android/
│   ├── build.gradle            (Android build config)
│   └── src/main/java/com/plugin/
│       └── Plugin.kt           (Android Kotlin implementation)
├── package.json                (npm package configuration)
├── tsconfig.json               (TypeScript config)
├── rollup.config.js            (Build bundler config)
├── capacitor.config.json       (Plugin metadata)
├── README.md                   (Auto-generated documentation)
└── .gitignore</code></pre>

        <h3>Key Files to Edit</h3>
        <ul>
          <li><strong>src/definitions.ts:</strong> Define your plugin interface with TypeScript</li>
          <li><strong>src/web.ts:</strong> Implement web fallback using Web APIs</li>
          <li><strong>ios/Plugin/Plugin.swift:</strong> Implement iOS native code in Swift</li>
          <li><strong>android/.../Plugin.kt:</strong> Implement Android native code in Kotlin</li>
          <li><strong>package.json:</strong> Configure npm package metadata</li>
        </ul>

        <h3>Development Workflow</h3>
        <ol>
          <li><strong>Build Plugin:</strong> <code>npm run build</code> (compiles TypeScript, bundles with Rollup)</li>
          <li><strong>Link Locally:</strong> <code>npm link</code> (creates global symlink)</li>
          <li><strong>Link in App:</strong> <code>npm link my-custom-plugin</code> (in Ionic app)</li>
          <li><strong>Sync Native:</strong> <code>npx cap sync</code> (copies to iOS/Android)</li>
          <li><strong>Open IDEs:</strong> <code>npx cap open ios</code> or <code>npx cap open android</code></li>
          <li><strong>Test:</strong> Run on devices, iterate and rebuild</li>
        </ol>

        <h3>Build Process</h3>
        <ul>
          <li>TypeScript compiler (tsc) generates JS + type definitions</li>
          <li>Rollup bundles for browser/UMD consumption</li>
          <li>Auto-generates README.md from TSDoc comments</li>
          <li>Output to <code>dist/</code> folder</li>
        </ul>

        <h3>Hot Reload</h3>
        <p>Web code hot reloads with <code>ionic serve</code>, but native changes require rebuilding in Xcode/Android Studio.</p>

        <h4>Watch Mode Development:</h4>
        <ul>
          <li><strong>Terminal 1:</strong> <code>npm run build -- --watch</code> (in plugin)</li>
          <li><strong>Terminal 2:</strong> <code>ionic serve</code> (in app)</li>
          <li><strong>Terminal 3:</strong> <code>npx cap sync</code> (when native changes made)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'bash',
          title: 'Creating New Plugin with CLI',
          code: `# Create new Capacitor plugin with CLI
npm init @capacitor/plugin@latest my-custom-plugin

# CLI prompts:
# - Plugin name: my-custom-plugin
# - Plugin package name: @mycompany/my-custom-plugin
# - Plugin class name: MyCustomPlugin
# - Plugin description: My awesome Capacitor plugin
# - Git repository: https://github.com/mycompany/my-custom-plugin
# - Author: Your Name
# - License: MIT
# - Plugin ID (Android package): com.mycompany.mycustomplugin

cd my-custom-plugin

# Install dependencies
npm install

# Build plugin
npm run build

# Link plugin locally for testing
npm link

# In your Ionic app
cd /path/to/your/ionic-app
npm link my-custom-plugin

# Sync with native projects
npx cap sync

# Open native IDEs
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'package.json - Plugin Configuration',
          code: `{
  "name": "my-custom-plugin",
  "version": "1.0.0",
  "description": "Custom Capacitor plugin for awesome features",
  "main": "dist/plugin.cjs.js",
  "module": "dist/esm/index.js",
  "types": "dist/esm/index.d.ts",
  "unpkg": "dist/plugin.js",
  "files": [
    "android/",
    "ios/",
    "dist/",
    "src/"
  ],
  "scripts": {
    "verify": "npm run verify:ios && npm run verify:android && npm run verify:web",
    "verify:ios": "cd ios && pod install && xcodebuild -workspace Plugin.xcworkspace -scheme Plugin",
    "verify:android": "cd android && ./gradlew clean build test",
    "verify:web": "npm run build",
    "build": "npm run clean && npm run docgen && tsc && rollup -c rollup.config.js",
    "clean": "rimraf ./dist",
    "watch": "tsc --watch",
    "docgen": "docgen --api MyCustomPlugin --output-readme README.md",
    "prepublishOnly": "npm run build"
  },
  "capacitor": {
    "ios": {
      "src": "ios"
    },
    "android": {
      "src": "android"
    }
  },
  "keywords": [
    "capacitor",
    "plugin",
    "native",
    "mobile"
  ],
  "author": "Your Name <email@example.com>",
  "license": "MIT",
  "devDependencies": {
    "@capacitor/cli": "^5.0.0",
    "@capacitor/core": "^5.0.0",
    "@capacitor/docgen": "^0.2.0",
    "typescript": "~4.9.0",
    "rollup": "^2.79.0"
  },
  "peerDependencies": {
    "@capacitor/core": "^5.0.0"
  }
}

/**
 * 💡 INTERVIEW: Key package.json fields:
 *
 * - main: CommonJS entry (Node.js)
 * - module: ES module entry (bundlers)
 * - types: TypeScript definitions
 * - unpkg: UMD bundle for CDN
 * - files: What gets published to npm
 * - capacitor: iOS/Android code locations
 * - prepublishOnly: Ensures build before publish
 */`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Plugin scaffolding: npm init @capacitor/plugin generates complete template with TypeScript, iOS, Android, and build config',
        'Local testing: Use npm link to test plugin in app without publishing to npm',
        'Build process: TypeScript → JavaScript + types, Rollup → UMD bundle, docgen → README',
        'Hot reload: Web code hot reloads, native changes require Xcode/Android Studio rebuild',
        'package.json: Configure main, module, types for different module systems; files array controls npm publish',
      ],
    },
    {
      id: 262,
      title: 'TypeScript Interface Design',
      content: `
        <h2>Defining Plugin Interfaces</h2>
        <p>The TypeScript interface is your plugin's public API contract. Define all methods, events, and types with comprehensive TSDoc comments for excellent developer experience.</p>

        <h3>Interface Best Practices</h3>
        <ul>
          <li>Use TSDoc comments for ALL public methods and properties</li>
          <li>Include @example tags for complex methods</li>
          <li>Document platform-specific behavior</li>
          <li>Specify required permissions</li>
          <li>Mark optional properties with ?</li>
          <li>Use specific types (avoid 'any')</li>
          <li>Export all interfaces used in public API</li>
          <li>Version methods with @since tags</li>
        </ul>

        <h3>Advanced Type Patterns</h3>
        <h4>1. Union Types for Event Names</h4>
        <p>Use TypeScript function overloading for type-safe event listeners where the data type depends on the event name.</p>

        <h4>2. Generic Result Wrappers</h4>
        <p>Create generic types for consistent error handling and result patterns across methods.</p>

        <h4>3. Branded Types</h4>
        <p>Use branded types to prevent mixing incompatible string types (FilePath vs UrlString).</p>

        <h4>4. Discriminated Unions</h4>
        <p>Use discriminated unions for type-safe result handling with success/error states.</p>

        <h3>Plugin Listener Handle</h3>
        <p>The PluginListenerHandle pattern allows both <code>await listener.remove()</code> and direct <code>listener.remove()</code> usage:</p>
        <pre><code>Promise<PluginListenerHandle> & PluginListenerHandle</code></pre>

        <h3>Documentation Benefits</h3>
        <ul>
          <li>IDE autocomplete and IntelliSense</li>
          <li>Compile-time error detection</li>
          <li>Self-documenting code</li>
          <li>Auto-generated README from TSDoc</li>
          <li>Refactoring safety</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'definitions.ts - Complete Plugin Interface',
          code: `// src/definitions.ts

/**
 * MyCustomPlugin interface - provides device and UI utilities
 *
 * @example
 * \`\`\`typescript
 * import { MyCustomPlugin } from 'my-custom-plugin';
 *
 * const result = await MyCustomPlugin.echo({ value: 'Hello World' });
 * console.log(result.value); // "Hello World"
 * \`\`\`
 */
export interface MyCustomPlugin {
  /**
   * Echo back a value (useful for testing plugin communication)
   *
   * @param options - Object with value to echo
   * @returns Promise resolving to echoed value
   *
   * @example
   * \`\`\`typescript
   * const result = await MyCustomPlugin.echo({ value: 'test' });
   * console.log(result.value); // "test"
   * \`\`\`
   *
   * @since 1.0.0
   */
  echo(options: EchoOptions): Promise<EchoResult>;

  /**
   * Get device battery level
   *
   * Requires permissions:
   * - iOS: No permissions needed
   * - Android: No permissions needed
   *
   * @returns Promise resolving to battery level (0-100)
   *
   * @example
   * \`\`\`typescript
   * const battery = await MyCustomPlugin.getBatteryLevel();
   * console.log(\`Battery: \${battery.level}%\`);
   * if (battery.isCharging) {
   *   console.log('Device is charging');
   * }
   * \`\`\`
   *
   * @since 1.0.0
   */
  getBatteryLevel(): Promise<BatteryInfo>;

  /**
   * Show native alert dialog
   *
   * Displays a native alert using platform UI:
   * - iOS: UIAlertController
   * - Android: AlertDialog
   * - Web: window.alert
   *
   * @param options - Alert configuration
   * @returns Promise resolving when alert is dismissed
   *
   * @example
   * \`\`\`typescript
   * await MyCustomPlugin.showAlert({
   *   title: 'Success',
   *   message: 'Operation completed successfully!',
   *   buttonText: 'OK'
   * });
   * \`\`\`
   *
   * @since 1.0.0
   */
  showAlert(options: AlertOptions): Promise<void>;

  /**
   * Start monitoring battery changes
   *
   * @param eventName - Must be 'batteryChanged'
   * @param listenerFunc - Callback receiving battery updates
   * @returns Promise resolving to listener handle
   *
   * @example
   * \`\`\`typescript
   * const listener = await MyCustomPlugin.addListener(
   *   'batteryChanged',
   *   (info) => {
   *     console.log(\`Battery: \${info.level}%\`);
   *   }
   * );
   *
   * // Later: remove listener
   * await listener.remove();
   * \`\`\`
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'batteryChanged',
    listenerFunc: (info: BatteryInfo) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Remove all listeners for this plugin
   */
  removeAllListeners(): Promise<void>;

  /**
   * Check plugin permissions
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request plugin permissions
   */
  requestPermissions(): Promise<PermissionStatus>;
}

export interface EchoOptions {
  value: string;
}

export interface EchoResult {
  value: string;
}

export interface BatteryInfo {
  level: number;           // 0-100
  isCharging: boolean;
  status?: 'unknown' | 'charging' | 'discharging' | 'full';
}

export interface AlertOptions {
  title: string;
  message: string;
  buttonText?: string;
}

export interface PermissionStatus {
  battery: PermissionState;
}

export type PermissionState = 'prompt' | 'granted' | 'denied';

export interface PluginListenerHandle {
  remove: () => Promise<void>;
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Advanced Type Patterns',
          code: `/**
 * Advanced Plugin Type Patterns
 */

// Pattern 1: Union Types for Event Names (Type-safe listeners)
export interface MultiEventPlugin {
  addListener(
    eventName: 'batteryChanged',
    listenerFunc: (info: BatteryInfo) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'networkChanged',
    listenerFunc: (info: NetworkInfo) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

// Pattern 2: Generic Result Wrappers
export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface FilePlugin {
  readFile(path: string): Promise<OperationResult<string>>;
  writeFile(path: string, data: string): Promise<OperationResult<void>>;
}

// Pattern 3: Branded Types (Type safety)
export type FilePath = string & { __brand: 'FilePath' };
export type UrlString = string & { __brand: 'UrlString' };

export interface TypeSafePlugin {
  openFile(path: FilePath): Promise<void>;
  openUrl(url: UrlString): Promise<void>;
}

// Pattern 4: Discriminated Unions
export type PluginResult =
  | { success: true; data: any }
  | { success: false; error: PluginError };

export interface PluginError {
  code: 'PERMISSION_DENIED' | 'NOT_AVAILABLE' | 'UNKNOWN';
  message: string;
}

// Type-safe result handling
const result = await plugin.doSomething();
if (result.success) {
  console.log(result.data); // TypeScript knows data exists
} else {
  console.error(result.error.code); // TypeScript knows error exists
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'TSDoc comments: Document all public methods with @param, @returns, @example, @since for auto-generated docs',
        'Type safety: Use specific types (not any), mark optional with ?, export all public interfaces',
        'Advanced patterns: Union types for type-safe events, generic wrappers for consistent APIs, branded types to prevent type confusion',
        'PluginListenerHandle: Pattern Promise<T> & T allows both await and direct usage',
        'Benefits: IDE autocomplete, compile-time errors, self-documenting code, refactoring safety',
      ],
    },
    {
      id: 263,
      title: 'Web Implementation',
      content: `
        <h2>Web Fallback with WebPlugin</h2>
        <p>The web implementation provides fallback functionality when running in browsers (ionic serve), enables testing without native builds, supports PWAs, and provides platform parity where Web APIs exist.</p>

        <h3>WebPlugin Base Class</h3>
        <p>Extend WebPlugin and implement your plugin interface. WebPlugin provides helper methods:</p>
        <ul>
          <li><code>this.unavailable(message)</code> - Throw when feature not available</li>
          <li><code>this.unimplemented(message)</code> - Throw when feature not implemented</li>
          <li><code>notifyListeners(eventName, data)</code> - Send events to listeners</li>
        </ul>

        <h3>Web API Fallbacks</h3>
        <h4>Battery Status API:</h4>
        <p>Available in Chrome/Edge only. Always check availability with feature detection.</p>

        <h4>Common Web API Alternatives:</h4>
        <ul>
          <li><strong>Camera:</strong> getUserMedia() or file input fallback</li>
          <li><strong>Storage:</strong> localStorage, IndexedDB</li>
          <li><strong>Geolocation:</strong> navigator.geolocation</li>
          <li><strong>Device Motion:</strong> DeviceMotionEvent, DeviceOrientationEvent</li>
          <li><strong>Network:</strong> navigator.onLine, Network Information API</li>
        </ul>

        <h3>Graceful Degradation Strategies</h3>
        <ol>
          <li><strong>Feature Detection:</strong> Check if Web API exists before using</li>
          <li><strong>Progressive Enhancement:</strong> Provide basic functionality, enhance if possible</li>
          <li><strong>Polyfills:</strong> Use libraries to fill gaps</li>
          <li><strong>Mock Data:</strong> Enable testing without native builds</li>
          <li><strong>User Education:</strong> Show helpful messages when features unavailable</li>
          <li><strong>Alternative UX:</strong> File input instead of camera, localStorage instead of native storage</li>
        </ol>

        <h3>Event Listener Implementation</h3>
        <p>For Web APIs that support events (Battery Status, Device Motion), register native browser event listeners and forward to plugin listeners.</p>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'web.ts - Web Plugin Implementation',
          code: `// src/web.ts

import { WebPlugin } from '@capacitor/core';
import type {
  MyCustomPlugin,
  EchoOptions,
  EchoResult,
  BatteryInfo,
  AlertOptions,
  PermissionStatus,
} from './definitions';

export class MyCustomPluginWeb
  extends WebPlugin
  implements MyCustomPlugin
{
  /**
   * Echo implementation (same across all platforms)
   */
  async echo(options: EchoOptions): Promise<EchoResult> {
    console.log('ECHO from web:', options);
    return { value: options.value };
  }

  /**
   * Get battery level using Battery Status API
   *
   * 💡 INTERVIEW: Web has Battery Status API but it's deprecated
   * and only works in Chrome/Opera. Always handle unavailability.
   */
  async getBatteryLevel(): Promise<BatteryInfo> {
    // Check if Battery Status API is available
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();

        return {
          level: Math.round(battery.level * 100),
          isCharging: battery.charging,
          status: battery.charging ? 'charging' : 'discharging',
        };
      } catch (error) {
        console.error('Battery API error:', error);
        throw this.unavailable('Battery Status API failed');
      }
    }

    // Fallback: throw unavailable
    throw this.unavailable(
      'Battery Status API not available in this browser. ' +
      'Supported in Chrome/Edge only.'
    );
  }

  /**
   * Show alert using window.alert
   */
  async showAlert(options: AlertOptions): Promise<void> {
    const message = options.title
      ? \`\${options.title}\\n\\n\${options.message}\`
      : options.message;

    window.alert(message);
  }

  /**
   * Add battery change listener
   */
  async addListener(
    eventName: 'batteryChanged',
    listenerFunc: (info: BatteryInfo) => void
  ): Promise<any> {
    if (!('getBattery' in navigator)) {
      throw this.unavailable('Battery Status API not available');
    }

    const battery = await (navigator as any).getBattery();

    const handler = () => {
      listenerFunc({
        level: Math.round(battery.level * 100),
        isCharging: battery.charging,
        status: battery.charging ? 'charging' : 'discharging',
      });
    };

    battery.addEventListener('levelchange', handler);
    battery.addEventListener('chargingchange', handler);

    return {
      remove: async () => {
        battery.removeEventListener('levelchange', handler);
        battery.removeEventListener('chargingchange', handler);
      },
    };
  }

  async checkPermissions(): Promise<PermissionStatus> {
    return {
      battery: 'getBattery' in navigator ? 'granted' : 'denied',
    };
  }

  async requestPermissions(): Promise<PermissionStatus> {
    return this.checkPermissions();
  }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Advanced Web Fallback Patterns',
          code: `/**
 * Advanced Web Fallback Patterns
 */

// Pattern 1: Feature Detection with Fallbacks
export class AdvancedWebPlugin extends WebPlugin {
  async getDeviceInfo(): Promise<DeviceInfo> {
    // Try modern API first
    if ('userAgentData' in navigator) {
      const ua = (navigator as any).userAgentData;
      return {
        platform: ua.platform,
        mobile: ua.mobile,
        brands: ua.brands.map((b: any) => b.brand).join(', '),
      };
    }

    // Fallback to legacy User-Agent parsing
    const ua = navigator.userAgent;
    return {
      platform: this.detectPlatform(ua),
      mobile: /mobile/i.test(ua),
      brands: this.detectBrowser(ua),
    };
  }
}

// Pattern 2: Mock Data for Testing
export class MockableWebPlugin extends WebPlugin {
  private mockMode = false;

  enableMockMode(enable: boolean): void {
    this.mockMode = enable;
  }

  async getBatteryLevel(): Promise<BatteryInfo> {
    if (this.mockMode) {
      return {
        level: 75,
        isCharging: false,
        status: 'discharging',
      };
    }

    // Real implementation...
  }
}

// Pattern 3: Graceful Camera Fallback
export class CameraWebPlugin extends WebPlugin {
  async capturePhoto(): Promise<{ path: string }> {
    // Try modern getUserMedia API
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      // Show custom camera UI
      return this.showCameraUI(stream);
    }

    // Fallback: file input
    return this.showFileInput();
  }

  private async showFileInput(): Promise<{ path: string }> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';

      input.onchange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
          resolve({ path: URL.createObjectURL(file) });
        } else {
          reject(this.unavailable('No file selected'));
        }
      };

      input.click();
    });
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'WebPlugin base class: Provides unavailable(), unimplemented(), and notifyListeners() helpers',
        'Feature detection: Always check if Web API exists before using (if ("getBattery" in navigator))',
        'Graceful degradation: Provide fallbacks (file input for camera, localStorage for storage)',
        'Mock data: Enable testing in browser without native builds',
        'Error handling: Use this.unavailable() for unsupported features with helpful messages',
      ],
    },
    {
      id: 264,
      title: 'iOS Native Implementation',
      content: `
        <h2>Swift Plugin Implementation</h2>
        <p>iOS plugins are written in Swift with an Objective-C bridge to expose methods to Capacitor's runtime.</p>

        <h3>Swift Plugin Structure</h3>
        <ul>
          <li><strong>@objc(PluginName):</strong> Exposes Swift class to Objective-C</li>
          <li><strong>extends CAPPlugin:</strong> Base class for all plugins</li>
          <li><strong>@objc func methodName(_ call: CAPPluginCall):</strong> Plugin methods</li>
          <li><strong>call.resolve([...]):</strong> Return success result</li>
          <li><strong>call.reject("error"):</strong> Return error</li>
        </ul>

        <h3>Threading in iOS</h3>
        <ul>
          <li><strong>UI operations:</strong> MUST run on main thread via DispatchQueue.main.async</li>
          <li><strong>Heavy work:</strong> Run on background thread via DispatchQueue.global(qos: .userInitiated)</li>
          <li><strong>Plugin calls:</strong> Received on main thread by default</li>
          <li><strong>Always resolve/reject on main thread</strong></li>
        </ul>

        <h3>Permission Handling</h3>
        <p>iOS requires checking authorization status before using protected APIs:</p>
        <ul>
          <li>AVCaptureDevice.authorizationStatus(for: .video) for Camera</li>
          <li>CLLocationManager.authorizationStatus() for Location</li>
          <li>AVAudioSession.sharedInstance().recordPermission for Microphone</li>
        </ul>

        <h3>Event Listeners</h3>
        <p>Use <code>notifyListeners("eventName", data: [...])</code> to send events to JavaScript. Register for iOS notifications (NotificationCenter) and forward to plugin listeners.</p>

        <h3>Memory Management</h3>
        <ul>
          <li>Use [weak self] in closures to prevent retain cycles</li>
          <li>Remove NotificationCenter observers in deinit</li>
          <li>Invalidate timers</li>
          <li>Clean up resources</li>
        </ul>

        <h3>Info.plist Configuration</h3>
        <p>Add usage descriptions for all permissions used. App Store rejects apps without proper descriptions.</p>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Plugin.swift - iOS Swift Implementation',
          code: `// ios/Plugin/Plugin.swift
// Note: This is Swift code shown as TypeScript due to language restrictions

import Foundation
import Capacitor
import UIKit

@objc(MyCustomPlugin)
public class MyCustomPlugin: CAPPlugin {

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }

    @objc func getBatteryLevel(_ call: CAPPluginCall) {
        UIDevice.current.isBatteryMonitoringEnabled = true
        let level = UIDevice.current.batteryLevel
        let state = UIDevice.current.batteryState

        if level == -1.0 {
            call.reject("Battery level unavailable")
            return
        }

        let status: String
        switch state {
        case .charging, .full:
            status = "charging"
        case .unplugged:
            status = "discharging"
        default:
            status = "unknown"
        }

        call.resolve([
            "level": Int(level * 100),
            "isCharging": state == .charging || state == .full,
            "status": status
        ])
    }

    @objc func showAlert(_ call: CAPPluginCall) {
        let title = call.getString("title") ?? ""
        let message = call.getString("message") ?? ""
        let buttonText = call.getString("buttonText") ?? "OK"

        DispatchQueue.main.async {
            let alert = UIAlertController(
                title: title,
                message: message,
                preferredStyle: .alert
            )

            alert.addAction(UIAlertAction(
                title: buttonText,
                style: .default,
                handler: { _ in call.resolve() }
            ))

            self.bridge?.viewController?.present(
                alert,
                animated: true
            )
        }
    }

    @objc func startBatteryMonitoring(_ call: CAPPluginCall) {
        UIDevice.current.isBatteryMonitoringEnabled = true

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(batteryChanged),
            name: UIDevice.batteryLevelDidChangeNotification,
            object: nil
        )

        call.resolve()
    }

    @objc private func batteryChanged() {
        let level = UIDevice.current.batteryLevel
        let state = UIDevice.current.batteryState

        notifyListeners("batteryChanged", data: [
            "level": Int(level * 100),
            "isCharging": state == .charging || state == .full,
            "status": state == .charging ? "charging" : "discharging"
        ])
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
        UIDevice.current.isBatteryMonitoringEnabled = false
    }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Plugin.m - Objective-C Bridge',
          code: `// ios/Plugin/Plugin.m
// Note: This is Objective-C code shown as TypeScript due to language restrictions

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyCustomPlugin, "MyCustomPlugin",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(getBatteryLevel, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(showAlert, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(startBatteryMonitoring, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(stopBatteryMonitoring, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(checkPermissions, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(requestPermissions, CAPPluginReturnPromise);
)

// CAPPluginReturnPromise: Modern async/await (use this)
// CAPPluginReturnCallback: Legacy callback (deprecated)`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Threading: UI operations on DispatchQueue.main.async, heavy work on DispatchQueue.global()',
        'Plugin methods: Receive CAPPluginCall, use call.resolve() for success, call.reject() for error',
        'Event listeners: Use notifyListeners() to send events from native to JavaScript',
        'Memory management: Use [weak self] in closures, remove observers in deinit',
        'Permissions: Check authorization status, request if needed, add usage descriptions to Info.plist',
      ],
    },
    {
      id: 265,
      title: 'Android Native Implementation',
      content: `
        <h2>Kotlin Plugin Implementation</h2>
        <p>Android plugins use Kotlin with simple annotations - much simpler than iOS!</p>

        <h3>Kotlin Plugin Structure</h3>
        <ul>
          <li><strong>@CapacitorPlugin(name = "PluginName"):</strong> Defines plugin</li>
          <li><strong>extends Plugin():</strong> Base class for all plugins</li>
          <li><strong>@PluginMethod:</strong> Exposes methods to JavaScript</li>
          <li><strong>call.resolve(JSObject):</strong> Return success result</li>
          <li><strong>call.reject("error"):</strong> Return error</li>
        </ul>

        <h3>Threading in Android</h3>
        <ul>
          <li><strong>UI operations:</strong> MUST run on UI thread via activity.runOnUiThread</li>
          <li><strong>Heavy work:</strong> Run on background thread via Thread or Coroutines</li>
          <li><strong>Plugin calls:</strong> Received on UI thread by default</li>
          <li><strong>Always resolve/reject on UI thread</strong></li>
        </ul>

        <h3>Kotlin Coroutines (Preferred)</h3>
        <p>Use Coroutines for cleaner async code:</p>
        <ul>
          <li>Dispatchers.IO for background work</li>
          <li>Dispatchers.Main for UI operations</li>
          <li>withContext() to switch dispatchers</li>
        </ul>

        <h3>Permission Handling</h3>
        <ul>
          <li>Check: ContextCompat.checkSelfPermission(context, permission)</li>
          <li>Request: pluginRequestPermissions(arrayOf(permission), requestCode)</li>
          <li>Handle result: handleRequestPermissionsResult()</li>
          <li>Declare in AndroidManifest.xml</li>
        </ul>

        <h3>Event Listeners</h3>
        <p>Use <code>notifyListeners("eventName", JSObject)</code> to send events. Register for Android broadcasts (BroadcastReceiver) and forward to plugin listeners.</p>

        <h3>Context vs Activity</h3>
        <ul>
          <li><strong>context:</strong> Application context (always available)</li>
          <li><strong>activity:</strong> Current Activity (can be null, check before use)</li>
          <li>Use activity for UI operations, context for system services</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Plugin.kt - Android Kotlin Implementation',
          code: `// android/src/main/java/com/plugin/Plugin.kt
// Note: This is Kotlin code shown as TypeScript due to language restrictions

package com.mycompany.mycustomplugin

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import androidx.appcompat.app.AlertDialog
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "MyCustomPlugin")
class MyCustomPlugin : Plugin() {

    @PluginMethod
    fun echo(call: PluginCall) {
        val value = call.getString("value") ?: ""
        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }

    @PluginMethod
    fun getBatteryLevel(call: PluginCall) {
        val batteryStatus: Intent? = IntentFilter(
            Intent.ACTION_BATTERY_CHANGED
        ).let { ifilter ->
            context.registerReceiver(null, ifilter)
        }

        val level: Int = batteryStatus?.getIntExtra(
            BatteryManager.EXTRA_LEVEL, -1
        ) ?: -1
        val scale: Int = batteryStatus?.getIntExtra(
            BatteryManager.EXTRA_SCALE, -1
        ) ?: -1

        val batteryPct: Float = level / scale.toFloat() * 100

        val status: Int = batteryStatus?.getIntExtra(
            BatteryManager.EXTRA_STATUS, -1
        ) ?: -1
        val isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING

        val ret = JSObject()
        ret.put("level", batteryPct.toInt())
        ret.put("isCharging", isCharging)
        ret.put("status", if (isCharging) "charging" else "discharging")
        call.resolve(ret)
    }

    @PluginMethod
    fun showAlert(call: PluginCall) {
        val title = call.getString("title") ?: ""
        val message = call.getString("message") ?: ""
        val buttonText = call.getString("buttonText") ?: "OK"

        activity.runOnUiThread {
            val builder = AlertDialog.Builder(activity)
            builder.setTitle(title)
            builder.setMessage(message)
            builder.setPositiveButton(buttonText) { dialog, _ ->
                dialog.dismiss()
                call.resolve()
            }
            builder.show()
        }
    }

    private var batteryReceiver: android.content.BroadcastReceiver? = null

    @PluginMethod
    fun startBatteryMonitoring(call: PluginCall) {
        batteryReceiver = object : android.content.BroadcastReceiver() {
            override fun onReceive(context: android.content.Context, intent: Intent) {
                val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
                val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
                val batteryPct = level / scale.toFloat() * 100

                val ret = JSObject()
                ret.put("level", batteryPct.toInt())
                notifyListeners("batteryChanged", ret)
            }
        }

        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        context.registerReceiver(batteryReceiver, filter)
        call.resolve()
    }

    override fun handleOnDestroy() {
        super.handleOnDestroy()
        batteryReceiver?.let {
            context.unregisterReceiver(it)
            batteryReceiver = null
        }
    }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Permission Handling Pattern',
          code: `// Permission Handling in Android (Kotlin)
// Note: Kotlin code shown as TypeScript

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

@PluginMethod
fun requestCameraPermission(call: PluginCall) {
    val permission = Manifest.permission.CAMERA
    val status = ContextCompat.checkSelfPermission(context, permission)

    if (status == PackageManager.PERMISSION_GRANTED) {
        val ret = JSObject()
        ret.put("camera", "granted")
        call.resolve(ret)
        return
    }

    // Request permission
    pluginRequestPermissions(
        arrayOf(permission),
        REQUEST_CAMERA_PERMISSION
    )

    // Save call for later resolution
    saveCall(call)
}

override fun handleRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
) {
    super.handleRequestPermissionsResult(requestCode, permissions, grantResults)

    if (requestCode == REQUEST_CAMERA_PERMISSION) {
        val call = savedCall ?: return
        val granted = grantResults.isNotEmpty() &&
                     grantResults[0] == PackageManager.PERMISSION_GRANTED

        val ret = JSObject()
        ret.put("camera", if (granted) "granted" else "denied")
        call.resolve(ret)
    }
}

companion object {
    private const val REQUEST_CAMERA_PERMISSION = 1001
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Annotations: @CapacitorPlugin for class, @PluginMethod for methods - much simpler than iOS',
        'Threading: UI operations on activity.runOnUiThread, heavy work on Thread or Coroutines (Dispatchers.IO)',
        'Permissions: Check with ContextCompat, request with pluginRequestPermissions(), handle in handleRequestPermissionsResult()',
        'Event listeners: Use notifyListeners() with JSObject, register BroadcastReceivers for system events',
        'Cleanup: Override handleOnDestroy() to unregister receivers, cancel jobs, close resources',
      ],
    },
    {
      id: 266,
      title: 'Event System & Real-time Updates',
      content: `
        <h2>Event Listener Implementation</h2>
        <p>Event listeners enable real-time communication from native code to JavaScript. Perfect for sensors, location updates, battery status, network changes, and any continuous monitoring scenario.</p>

        <h3>Event Pattern</h3>
        <ol>
          <li><strong>JavaScript:</strong> Call addListener() with event name and callback</li>
          <li><strong>Native:</strong> Register for platform events (iOS NotificationCenter, Android BroadcastReceiver)</li>
          <li><strong>Native:</strong> Use notifyListeners() to send data to JavaScript</li>
          <li><strong>JavaScript:</strong> Receive data in callback</li>
          <li><strong>Cleanup:</strong> Remove listener to prevent memory leaks</li>
        </ol>

        <h3>iOS Event Pattern</h3>
        <ul>
          <li>Register for NotificationCenter notifications</li>
          <li>In notification handler, call notifyListeners("eventName", data: [...])</li>
          <li>Remove observers in deinit or stop method</li>
        </ul>

        <h3>Android Event Pattern</h3>
        <ul>
          <li>Create BroadcastReceiver for system events</li>
          <li>Register receiver with IntentFilter</li>
          <li>In onReceive(), call notifyListeners("eventName", JSObject)</li>
          <li>Unregister receiver in handleOnDestroy()</li>
        </ul>

        <h3>Memory Management</h3>
        <p>CRITICAL: Always remove listeners to prevent memory leaks and battery drain</p>
        <ul>
          <li>Store listener handle: <code>const listener = await Plugin.addListener(...)</code></li>
          <li>Remove in ngOnDestroy: <code>await listener.remove()</code></li>
          <li>Use service pattern for shared listeners across components</li>
          <li>Implement reference counting for multi-component listeners</li>
        </ul>

        <h3>Service Pattern with RxJS</h3>
        <p>Create an Angular service that wraps plugin events as RxJS Observables for better integration with Angular components.</p>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Using Event Listeners in Angular',
          code: `import { Component, OnDestroy, OnInit } from '@angular/core';
import { SensorPlugin, PluginListenerHandle, AccelerometerData } from 'sensor-plugin';

@Component({
  selector: 'app-sensor-demo',
  template: \`
    <ion-card>
      <ion-card-header>
        <ion-card-title>Accelerometer Data</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>X: {{ acceleration.x | number:'1.2-2' }} m/s²</p>
        <p>Y: {{ acceleration.y | number:'1.2-2' }} m/s²</p>
        <p>Z: {{ acceleration.z | number:'1.2-2' }} m/s²</p>
      </ion-card-content>
    </ion-card>

    <ion-button expand="block" (click)="toggleMonitoring()">
      {{ isMonitoring ? 'Stop' : 'Start' }} Monitoring
    </ion-button>
  \`
})
export class SensorDemoComponent implements OnInit, OnDestroy {
  acceleration = { x: 0, y: 0, z: 0 };
  isMonitoring = false;
  private listener?: PluginListenerHandle;

  async toggleMonitoring() {
    if (this.isMonitoring) {
      await this.stopMonitoring();
    } else {
      await this.startMonitoring();
    }
  }

  private async startMonitoring() {
    await SensorPlugin.startAccelerometer();

    this.listener = await SensorPlugin.addListener(
      'accelerometerUpdate',
      (data: AccelerometerData) => {
        this.acceleration = { x: data.x, y: data.y, z: data.z };
      }
    );

    this.isMonitoring = true;
  }

  private async stopMonitoring() {
    if (this.listener) {
      await this.listener.remove();
      this.listener = undefined;
    }
    await SensorPlugin.stopAccelerometer();
    this.isMonitoring = false;
  }

  /**
   * 💡 INTERVIEW: CRITICAL - Always clean up in ngOnDestroy
   */
  async ngOnDestroy() {
    await this.stopMonitoring();
  }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Service Pattern with Reference Counting',
          code: `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SensorPlugin, AccelerometerData, PluginListenerHandle } from 'sensor-plugin';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private accelerationSubject = new BehaviorSubject<AccelerometerData>({
    x: 0, y: 0, z: 0, timestamp: 0
  });

  public acceleration$: Observable<AccelerometerData> =
    this.accelerationSubject.asObservable();

  private listener?: PluginListenerHandle;
  private listenerCount = 0;

  /**
   * Start monitoring (reference counted)
   *
   * 💡 INTERVIEW: Reference counting ensures sensor stops only
   * when no components are listening
   */
  async startMonitoring(): Promise<void> {
    this.listenerCount++;

    if (this.listenerCount > 1) return; // Already monitoring

    await SensorPlugin.startAccelerometer();

    this.listener = await SensorPlugin.addListener(
      'accelerometerUpdate',
      (data: AccelerometerData) => {
        this.accelerationSubject.next(data);
      }
    );
  }

  async stopMonitoring(): Promise<void> {
    this.listenerCount = Math.max(0, this.listenerCount - 1);

    if (this.listenerCount > 0) return; // Still have listeners

    if (this.listener) {
      await this.listener.remove();
      this.listener = undefined;
    }

    await SensorPlugin.stopAccelerometer();
  }
}

// Usage in component:
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  acceleration$ = this.sensorService.acceleration$;

  constructor(private sensorService: SensorService) {}

  async ngOnInit() {
    await this.sensorService.startMonitoring();
  }

  async ngOnDestroy() {
    await this.sensorService.stopMonitoring();
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Event pattern: addListener() in JS, register native observers, notifyListeners() from native, remove in ngOnDestroy',
        'iOS events: Use NotificationCenter.default.addObserver, remove in deinit',
        'Android events: Create BroadcastReceiver, register with IntentFilter, unregister in handleOnDestroy()',
        'Memory leaks: ALWAYS remove listeners in ngOnDestroy, store listener handle for removal',
        'Service pattern: Wrap plugin events as RxJS Observables, implement reference counting for multiple components',
      ],
    },
    {
      id: 267,
      title: 'Advanced Topics: Background Tasks & Native UI',
      content: `
        <h2>Background Task Implementation</h2>
        <p>Background tasks enable work to continue when app is not in foreground. Different implementations for iOS and Android.</p>

        <h3>iOS Background Tasks (BGTaskScheduler)</h3>
        <p>iOS 13+ uses BGTaskScheduler for background work:</p>
        <ul>
          <li><strong>BGAppRefreshTask:</strong> Short periodic updates (max 30 seconds)</li>
          <li><strong>BGProcessingTask:</strong> Longer processing (few minutes, deferrable)</li>
          <li>System decides when to run based on battery, usage, network</li>
          <li>No guaranteed execution time</li>
          <li>Register task identifiers in Info.plist</li>
        </ul>

        <h4>iOS Limitations:</h4>
        <ul>
          <li>System controls execution (battery, usage patterns)</li>
          <li>30 seconds max for app refresh</li>
          <li>Tasks can be terminated anytime</li>
          <li>User can disable background refresh in Settings</li>
        </ul>

        <h3>Android Background Tasks (WorkManager)</h3>
        <p>WorkManager is the modern Android solution for background work:</p>
        <ul>
          <li><strong>OneTimeWorkRequest:</strong> Single execution with optional delay</li>
          <li><strong>PeriodicWorkRequest:</strong> Repeated execution (min 15 minutes)</li>
          <li>Respects Doze mode and battery optimization</li>
          <li>Guaranteed execution (eventually)</li>
          <li>Survives app restarts and device reboots</li>
        </ul>

        <h4>WorkManager Constraints:</h4>
        <ul>
          <li>Network type (connected, metered, unmetered)</li>
          <li>Battery not low</li>
          <li>Device charging</li>
          <li>Device idle</li>
          <li>Storage not low</li>
        </ul>

        <h3>Custom Native UI Components</h3>
        <p>Present native view controllers for custom UIs that web can't provide:</p>
        <ul>
          <li>Custom camera interfaces with filters</li>
          <li>Native document scanners</li>
          <li>Custom video players</li>
          <li>Native image editors</li>
        </ul>

        <h4>Pattern:</h4>
        <ol>
          <li>Create custom UIViewController (iOS) or Activity (Android)</li>
          <li>Present modally from plugin</li>
          <li>Save PluginCall for later resolution</li>
          <li>Use delegate/callback to resolve call when UI dismissed</li>
        </ol>

        <h3>Plugin Configuration</h3>
        <p>Plugins can read configuration from capacitor.config.ts for API keys, feature flags, and customization.</p>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'iOS Background Task (BGTaskScheduler)',
          code: `// ios/Plugin/BackgroundTaskPlugin.swift
// Note: Swift code shown as TypeScript

import Foundation
import Capacitor
import BackgroundTasks

@objc(BackgroundTaskPlugin)
public class BackgroundTaskPlugin: CAPPlugin {

    private let taskIdentifier = "com.myapp.background.refresh"

    override public func load() {
        super.load()
        registerBackgroundTasks()
    }

    private func registerBackgroundTasks() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: taskIdentifier,
            using: nil
        ) { task in
            self.handleBackgroundTask(task: task as! BGAppRefreshTask)
        }
    }

    @objc func scheduleBackgroundRefresh(_ call: CAPPluginCall) {
        let request = BGAppRefreshTaskRequest(identifier: taskIdentifier)
        request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)

        do {
            try BGTaskScheduler.shared.submit(request)
            call.resolve(["scheduled": true, "taskId": taskIdentifier])
        } catch {
            call.reject("Failed to schedule: \\(error.localizedDescription)")
        }
    }

    private func handleBackgroundTask(task: BGAppRefreshTask) {
        scheduleNextBackgroundRefresh()

        task.expirationHandler = {
            task.setTaskCompleted(success: false)
        }

        performBackgroundWork { success in
            task.setTaskCompleted(success: success)
        }
    }

    private func performBackgroundWork(completion: @escaping (Bool) -> Void) {
        DispatchQueue.global(qos: .background).async {
            // Simulate work
            Thread.sleep(forTimeInterval: 2)

            self.notifyListeners("backgroundTaskCompleted", data: [
                "timestamp": Date().timeIntervalSince1970,
                "success": true
            ])

            completion(true)
        }
    }
}

// Info.plist Required:
// <key>BGTaskSchedulerPermittedIdentifiers</key>
// <array>
//     <string>com.myapp.background.refresh</string>
// </array>`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Android Background Task (WorkManager)',
          code: `// android/src/main/java/com/plugin/BackgroundTaskPlugin.kt
// Note: Kotlin code shown as TypeScript

package com.plugin.backgroundtaskplugin

import android.content.Context
import androidx.work.*
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.util.concurrent.TimeUnit

@CapacitorPlugin(name = "BackgroundTaskPlugin")
class BackgroundTaskPlugin : Plugin() {

    @PluginMethod
    fun schedulePeriodicTask(call: PluginCall) {
        val intervalMinutes = call.getInt("intervalMinutes", 60)!!

        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .setRequiresBatteryNotLow(true)
            .build()

        val workRequest = PeriodicWorkRequestBuilder<BackgroundSyncWorker>(
            intervalMinutes.toLong(),
            TimeUnit.MINUTES
        )
            .setConstraints(constraints)
            .setBackoffCriteria(
                BackoffPolicy.EXPONENTIAL,
                10,
                TimeUnit.MINUTES
            )
            .build()

        WorkManager.getInstance(context)
            .enqueueUniquePeriodicWork(
                "background_sync",
                ExistingPeriodicWorkPolicy.REPLACE,
                workRequest
            )

        val ret = JSObject()
        ret.put("taskId", workRequest.id.toString())
        call.resolve(ret)
    }
}

class BackgroundSyncWorker(
    context: Context,
    params: WorkerParameters
) : Worker(context, params) {

    override fun doWork(): Result {
        return try {
            performSync()
            Result.success()
        } catch (e: Exception) {
            Result.retry()
        }
    }

    private fun performSync() {
        // Background work (runs on background thread)
        Thread.sleep(2000)
    }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'iOS background: BGTaskScheduler with 30s limit for BGAppRefreshTask, system decides when to run',
        'Android background: WorkManager with 15 min minimum for periodic work, guaranteed execution',
        'iOS limitations: No guaranteed timing, can be terminated, user can disable in Settings',
        'WorkManager constraints: Set network, battery, charging requirements for optimal execution',
        'Custom UI: Present native view controllers, save PluginCall, resolve when UI dismissed via delegate',
      ],
    },
    {
      id: 268,
      title: 'Testing, Publishing & Maintenance',
      content: `
        <h2>Plugin Testing Strategies</h2>
        <p>Test plugins at multiple levels for comprehensive coverage.</p>

        <h3>Testing Pyramid</h3>
        <ul>
          <li><strong>Unit Tests (70%):</strong> Test web implementation, fast feedback</li>
          <li><strong>Integration Tests (20%):</strong> Test in Ionic app, verify service integration</li>
          <li><strong>E2E Tests (10%):</strong> Test on real devices, full user flows</li>
        </ul>

        <h3>Unit Testing</h3>
        <p>Test TypeScript/web layer with Jest or Jasmine. Mock native calls for fast execution.</p>

        <h3>Integration Testing</h3>
        <p>Test plugin integrated into Ionic app. Use real plugin or mocks depending on what you're testing.</p>

        <h3>E2E Testing</h3>
        <p>Test on physical iOS and Android devices with Appium or Detox. Verify native behavior, permissions, edge cases.</p>

        <h3>Manual Testing Checklist</h3>
        <ul>
          <li>Test on physical devices (both iOS and Android)</li>
          <li>Test edge cases (permissions denied, low battery, airplane mode)</li>
          <li>Test background/foreground transitions</li>
          <li>Monitor memory leaks (Chrome DevTools heap snapshots)</li>
          <li>Monitor battery usage</li>
        </ul>

        <h3>Semantic Versioning</h3>
        <p>Follow semantic versioning (MAJOR.MINOR.PATCH) for plugin releases:</p>
        <ul>
          <li><strong>MAJOR:</strong> Breaking changes (removed methods, changed signatures)</li>
          <li><strong>MINOR:</strong> New features (added methods, backward-compatible)</li>
          <li><strong>PATCH:</strong> Bug fixes (no API changes)</li>
        </ul>

        <h3>Publishing to npm</h3>
        <ol>
          <li>Update version: <code>npm version patch/minor/major</code></li>
          <li>Build: <code>npm run build</code></li>
          <li>Test locally: <code>npm pack</code> and install tarball</li>
          <li>Publish: <code>npm publish</code> (or <code>npm publish --access public</code> for scoped)</li>
          <li>Tag: <code>git tag v1.0.0 && git push origin v1.0.0</code></li>
          <li>Create GitHub release with changelog</li>
        </ol>

        <h3>Maintenance Best Practices</h3>
        <ul>
          <li>Update dependencies monthly</li>
          <li>Test with latest Capacitor version</li>
          <li>Monitor GitHub issues, respond within 48 hours</li>
          <li>Run <code>npm audit</code> for security vulnerabilities</li>
          <li>Support previous major version for 6-12 months</li>
          <li>Provide migration guides for breaking changes</li>
        </ul>

        <h3>Documentation</h3>
        <ul>
          <li>Auto-generate README from TSDoc comments</li>
          <li>Include installation instructions</li>
          <li>Platform-specific configuration (iOS Info.plist, Android AndroidManifest.xml)</li>
          <li>API reference with examples</li>
          <li>Compatibility matrix (iOS version, Android version)</li>
          <li>Changelog (CHANGELOG.md)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Unit Testing Example',
          code: `// test/web.spec.ts

import { MyCustomPluginWeb } from '../src/web';

describe('MyCustomPluginWeb', () => {
  let plugin: MyCustomPluginWeb;

  beforeEach(() => {
    plugin = new MyCustomPluginWeb();
  });

  it('should echo value', async () => {
    const result = await plugin.echo({ value: 'test' });
    expect(result.value).toBe('test');
  });

  it('should show alert', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    await plugin.showAlert({
      title: 'Test',
      message: 'Message',
    });

    expect(alertSpy).toHaveBeenCalledWith('Test\\n\\nMessage');
    alertSpy.mockRestore();
  });

  it('should throw unavailable for battery on unsupported browser', async () => {
    await expect(plugin.getBatteryLevel()).rejects.toThrow(
      'Battery Status API not available'
    );
  });
});`,
          copyable: true,
        },
        {
          id: 2,
          language: 'bash',
          title: 'Publishing Workflow',
          code: `# 1. Update version
npm version patch  # or minor, major

# 2. Build plugin
npm run build

# 3. Verify build output
ls -la dist/

# 4. Test package locally
npm pack
# Creates: my-custom-plugin-1.0.0.tgz

# Install in test app
cd /path/to/test-app
npm install /path/to/my-custom-plugin-1.0.0.tgz
npx cap sync

# Test thoroughly!

# 5. Publish to npm
npm login
npm publish  # or npm publish --access public for scoped

# 6. Create Git tag
git tag v1.0.0
git push origin v1.0.0

# 7. Create GitHub release
# - Go to GitHub → Releases → New Release
# - Tag: v1.0.0
# - Title: Release 1.0.0
# - Description: Changelog entries

# npm publish checklist:
# ✅ Version bumped
# ✅ Build successful
# ✅ Tests passing
# ✅ README updated
# ✅ CHANGELOG updated
# ✅ No sensitive data
# ✅ Tested in real app`,
          copyable: true,
        },
        {
          id: 3,
          language: 'typescript',
          title: 'Semantic Versioning Examples',
          code: `/**
 * Semantic Versioning: MAJOR.MINOR.PATCH
 *
 * 💡 INTERVIEW: Follow semantic versioning for plugins
 */

// MAJOR (1.0.0 → 2.0.0): Breaking changes
const majorChanges = [
  'Removed getBatteryLevel() method',
  'Changed echo() signature from echo(value) to echo(options)',
  'Renamed plugin from MyPlugin to MyCustomPlugin',
  'Changed return type from string to object'
];

// MINOR (1.0.0 → 1.1.0): New features
const minorChanges = [
  'Added new showAlert() method',
  'Added batteryChanged event listener',
  'Added new optional parameter buttonText to showAlert',
  'Deprecated oldMethod() - use newMethod() instead'
];

// PATCH (1.0.0 → 1.0.1): Bug fixes
const patchChanges = [
  'Fixed crash when battery monitoring enabled twice',
  'Fixed memory leak in event listeners',
  'Improved error messages',
  'Updated documentation'
];

// Pre-release versions
const preReleaseVersions = [
  '1.0.0-alpha.1',  // Early testing
  '1.0.0-beta.2',   // Feature complete, testing
  '1.0.0-rc.1'      // Release candidate
];`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Testing pyramid: 70% unit tests (web), 20% integration (app), 10% E2E (devices)',
        'Semantic versioning: MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes',
        'Publishing: npm version, build, pack for testing, publish, git tag, GitHub release',
        'Maintenance: Update dependencies monthly, respond to issues promptly, support previous major for 6-12 months',
        'Documentation: Auto-generate from TSDoc, include examples, platform config, compatibility matrix',
      ],
    },
  ],
};
