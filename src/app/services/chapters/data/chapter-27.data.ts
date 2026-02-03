import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_27_DATA: Chapter = {
  id: 27,
  title: 'Interactive Media Gallery Widget',
  description: 'Build a production-ready, reusable interactive media gallery widget with gesture navigation, event emission, media rendering, action bar with flyout menu, view tracking, and comprehensive accessibility features.',
  icon: 'images-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  demoRoute: '/demo/27',
  sections: [
    {
      id: 270,
      title: 'Widget Architecture & Design',
      content: `
        <h2>Understanding Interactive Media Widgets</h2>
        <p>An interactive media widget is a reusable component that wraps media content (images, videos, or mixed media) and provides intuitive gesture-based navigation and interaction capabilities. Think Instagram Reels, TikTok, or Snapchat Stories!</p>

        <h3>Key Architectural Principles</h3>
        <ul>
          <li><strong>Component Hierarchy:</strong> Parent container delegates to specialized children</li>
          <li><strong>Event-Driven:</strong> No tight coupling, parent listens to widget events</li>
          <li><strong>Configuration:</strong> Behavior controlled via props/inputs</li>
          <li><strong>State Management:</strong> Component-local with signals/observables</li>
          <li><strong>Type Safety:</strong> Full TypeScript interfaces for all APIs</li>
        </ul>

        <h3>Component Hierarchy</h3>
        <pre><code>InteractiveMediaWidget (Smart Component)
├── MediaViewer (Content Display)
│   ├── MediaItem (Individual Renderer)
│   ├── ImageRenderer (Image Display)
│   ├── VideoRenderer (Video Player)
│   └── GestureDetector (Touch/Mouse Handler)
├── ActionBar (Bottom Controls)
│   ├── ActionButton × 3 (Comment, Add, More)
│   └── FlyoutMenu (Save, Report, Duplicate)
└── ProgressIndicator (Position Feedback)
    ├── PaginationDots (Image Lists)
    ├── ProgressBar (Videos)
    └── Counter (Alternative)</code></pre>

        <h3>Data Flow Pattern</h3>
        <p><strong>Downward:</strong> Props/Inputs flow from parent to child (immutable)</p>
        <p><strong>Upward:</strong> Events/Outputs flow from child to parent (async)</p>
        <p>Example: mediaList → MediaViewer → MediaItem (down), Swipe → MediaViewer → InteractiveMediaWidget → App (up)</p>

        <h3>Event Emission Architecture</h3>
        <p>Widget emits ALL interactions as events, parent decides how to handle them:</p>
        <ul>
          <li>Navigation Events: navigate_next, navigate_previous, navigate_up/down, navigate_in, navigate_back</li>
          <li>View Events: view_start, view_end, view_duration</li>
          <li>Engagement Events: like, hate, comment, share</li>
          <li>Content Management: save, report, duplicate, duplicate_with_overlay, add_media, clone</li>
          <li>Interaction Events: tap, double_tap, long_press, pinch_zoom, swipe</li>
          <li>Video Events: video_play, video_pause, video_complete, video_seek</li>
          <li>Error Events: media_load_error, media_load_success</li>
        </ul>

        <h3>Technology Stack</h3>
        <table>
          <tr>
            <th>Layer</th>
            <th>Technology</th>
            <th>Purpose</th>
          </tr>
          <tr>
            <td>Framework</td>
            <td>Angular 17+ (Standalone)</td>
            <td>TypeScript-first, DI, RxJS, OnPush, Signals</td>
          </tr>
          <tr>
            <td>UI Library</td>
            <td>Ionic Framework</td>
            <td>Cross-platform UI, Gesture Controller, Icons</td>
          </tr>
          <tr>
            <td>Gestures</td>
            <td>Ionic GestureController + Pointer Events</td>
            <td>Touch and mouse, prevents defaults, thresholds</td>
          </tr>
          <tr>
            <td>State</td>
            <td>Component-local (Signals/BehaviorSubject)</td>
            <td>No global state, reactive updates</td>
          </tr>
          <tr>
            <td>Animations</td>
            <td>CSS Transitions + Angular Animations</td>
            <td>GPU-accelerated, 60fps, smooth</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Widget Architecture Overview',
          code: `/**
 * Capacitor Plugin Architecture
 *
 * 💡 INTERVIEW: Component hierarchy and data flow
 */

interface WidgetArchitecture {
  presentationLayer: {
    components: [
      'InteractiveMediaWidget - Main container',
      'MediaViewer - Content display',
      'ActionBar - User controls',
      'ProgressIndicator - Position feedback'
    ];
    responsibility: 'Render UI, handle user input, emit events';
    technology: 'Angular components, Ionic UI, CSS animations';
  };

  businessLogicLayer: {
    services: [
      'GestureHandler - Process touch/mouse input',
      'MediaLoader - Lazy load and cache media',
      'ViewTracker - Track viewing analytics',
      'EventEmitter - Manage event emission'
    ];
    responsibility: 'Business rules, data processing, state';
    technology: 'Angular services, RxJS observables';
  };

  dataLayer: {
    interfaces: [
      'MediaObject - Media item data',
      'InteractionEvent - User interaction data',
      'WidgetConfig - Configuration options',
      'WidgetState - Internal state'
    ];
    responsibility: 'Type definitions, data contracts';
    technology: 'TypeScript interfaces';
  };
}

/**
 * Data Flow Pattern
 */
interface DataFlow {
  downward: {
    pattern: 'Props/Inputs';
    flow: 'Parent → Child';
    example: 'mediaList → MediaViewer → MediaItem';
    immutable: true;
  };

  upward: {
    pattern: 'Events/Outputs';
    flow: 'Child → Parent';
    example: 'Swipe → MediaViewer → Widget → App';
    async: true;
  };
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Event Emission System',
          code: `/**
 * Event Types (from spec)
 */
export type InteractionEventType =
  // Navigation Events
  | 'navigate_next' | 'navigate_previous'
  | 'navigate_up' | 'navigate_down'
  | 'navigate_in' | 'navigate_back'

  // View Events
  | 'view_start' | 'view_end' | 'view_duration'

  // Engagement Events
  | 'like' | 'hate' | 'comment' | 'share'

  // Content Management Events
  | 'save' | 'report' | 'duplicate'
  | 'duplicate_with_overlay' | 'add_media' | 'clone'

  // Interaction Events
  | 'tap' | 'double_tap' | 'long_press'
  | 'pinch_zoom' | 'swipe'

  // Video-specific Events
  | 'video_play' | 'video_pause'
  | 'video_complete' | 'video_seek'

  // Error Events
  | 'media_load_error' | 'media_load_success';

/**
 * Event Structure
 */
export interface MediaInteractionEvent<T = any> {
  eventType: InteractionEventType;
  mediaId: string | number;
  mediaIndex: number;
  timestamp: Date;
  metadata?: T;
  userContext?: {
    sessionId?: string;
    userId?: string;
    [key: string]: any;
  };
}

/**
 * Usage in Parent Component
 */
handleInteraction(event: MediaInteractionEvent): void {
  // Send to analytics
  this.analytics.track(event.eventType, {
    mediaId: event.mediaId,
    timestamp: event.timestamp
  });

  // Update backend
  if (event.eventType === 'like') {
    this.api.likeMedia(event.mediaId).subscribe();
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Component hierarchy: Smart container delegates to presentation children, single responsibility per component',
        'Data flow: Props/inputs down (immutable), events/outputs up (async)',
        'Event emission: Widget emits all interactions, parent handles analytics and business logic',
        'Technology: Angular 17+ standalone, Ionic for UI, Gesture Controller for touch, component-local state',
        'Benefits: Reusability, testability, maintainability, performance (OnPush), composability',
      ],
    },
    {
      id: 271,
      title: 'Setting Up the Library Project',
      content: `
        <h2>Creating an Angular Library</h2>
        <p>The Angular CLI provides a plugin scaffolding tool that generates a complete library template with TypeScript, iOS, Android, and build configuration.</p>

        <h3>Project Structure</h3>
        <pre><code>projects/interactive-media-widget/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── interactive-media-widget/
│   │   │   ├── media-viewer/
│   │   │   ├── action-bar/
│   │   │   └── progress-indicator/
│   │   ├── models/
│   │   │   ├── media-object.interface.ts
│   │   │   ├── interaction-event.interface.ts
│   │   │   ├── widget-config.interface.ts
│   │   │   └── widget-state.interface.ts
│   │   ├── services/
│   │   │   ├── gesture-handler.service.ts
│   │   │   ├── media-loader.service.ts
│   │   │   ├── view-tracker.service.ts
│   │   │   └── event-emitter.service.ts
│   │   ├── directives/
│   │   │   ├── swipe-gesture.directive.ts
│   │   │   ├── tap-gesture.directive.ts
│   │   │   └── pinch-zoom.directive.ts
│   │   └── interactive-media-widget.module.ts
│   └── public-api.ts
├── package.json
├── ng-package.json
├── tsconfig.lib.json
└── README.md</code></pre>

        <h3>Development Workflow</h3>
        <ol>
          <li><strong>Build Plugin:</strong> <code>npm run build</code> (compiles TypeScript, bundles with Rollup)</li>
          <li><strong>Link Locally:</strong> <code>npm link</code> (creates global symlink)</li>
          <li><strong>Link in App:</strong> <code>npm link interactive-media-widget</code> (in Ionic app)</li>
          <li><strong>Sync Native:</strong> <code>npx cap sync</code> (copies to iOS/Android)</li>
          <li><strong>Test:</strong> Run in app with hot reload</li>
        </ol>

        <h3>Build Process</h3>
        <ul>
          <li>TypeScript compiler (tsc) generates JS + type definitions</li>
          <li>Rollup bundles for browser/UMD consumption</li>
          <li>Auto-generates README.md from TSDoc comments</li>
          <li>Output to <code>dist/</code> folder</li>
        </ul>

        <h3>Watch Mode Development</h3>
        <ul>
          <li><strong>Terminal 1:</strong> <code>npm run build -- --watch</code> (in library)</li>
          <li><strong>Terminal 2:</strong> <code>ionic serve</code> (in app)</li>
          <li>Changes to library rebuild automatically and hot reload in app</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'bash',
          title: 'Creating Library with Angular CLI',
          code: `# Create new Angular library
ng generate library interactive-media-widget

# CLI generates complete structure
# Navigate to library
cd projects/interactive-media-widget

# Install dependencies
npm install

# Build library
npm run build

# Link library locally for testing
npm link

# In your Ionic app
cd /path/to/ionic-app
npm link interactive-media-widget

# Sync with native projects
npx cap sync`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'package.json - Library Configuration',
          code: `{
  "name": "interactive-media-widget",
  "version": "1.0.0",
  "description": "Reusable interactive media gallery widget",
  "main": "dist/plugin.cjs.js",
  "module": "dist/esm/index.js",
  "types": "dist/esm/index.d.ts",
  "unpkg": "dist/plugin.js",
  "files": [
    "dist/",
    "src/"
  ],
  "scripts": {
    "build": "ng build interactive-media-widget",
    "watch": "ng build interactive-media-widget --watch",
    "test": "ng test interactive-media-widget"
  },
  "keywords": [
    "angular",
    "ionic",
    "media",
    "gallery",
    "widget",
    "gestures",
    "reusable"
  ],
  "peerDependencies": {
    "@angular/common": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@ionic/angular": "^7.0.0",
    "rxjs": "^7.8.0"
  },
  "dependencies": {
    "tslib": "^2.6.0"
  },
  "sideEffects": false
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Library scaffolding: ng generate library creates complete template',
        'Local testing: npm link to test library in app without publishing',
        'Build process: TypeScript → JS + types, Rollup → UMD bundle',
        'Hot reload: Watch mode rebuilds library on changes, app hot reloads',
        'package.json: Configure main, module, types for different module systems',
      ],
    },
    {
      id: 272,
      title: 'Core Interfaces & Models',
      content: `
        <h2>Defining Plugin Interfaces</h2>
        <p>The TypeScript interface is your widget's public API contract. Define all types with comprehensive TSDoc comments for excellent developer experience.</p>

        <h3>MediaObject Interface</h3>
        <p>Data structure for media items supporting images, videos, and mixed media with extensible metadata.</p>
        <ul>
          <li><strong>Required:</strong> id, type, url</li>
          <li><strong>Optional:</strong> thumbnailUrl, duration, aspectRatio, metadata, overlays</li>
          <li><strong>Extensible:</strong> metadata[key: string]: any allows custom fields</li>
        </ul>

        <h3>InteractionEvent Interface</h3>
        <p>Type-safe event system for analytics and parent communication.</p>
        <ul>
          <li><strong>Generic Type T:</strong> Event-specific metadata (ViewMetadata, NavigationMetadata, etc.)</li>
          <li><strong>Standard Fields:</strong> eventType, mediaId, mediaIndex, timestamp</li>
          <li><strong>Context:</strong> userContext for session/user tracking</li>
        </ul>

        <h3>WidgetConfig Interface</h3>
        <p>Configuration-driven behavior makes widget reusable across different use cases.</p>
        <ul>
          <li><strong>Navigation:</strong> initialIndex, loop</li>
          <li><strong>Gestures:</strong> enableSwipeUp/Down/Left/Right, enableTap/DoubleTap/PinchZoom</li>
          <li><strong>UI:</strong> showActionBar, showProgressIndicator, customActionButtons, theme</li>
          <li><strong>Behavior:</strong> autoPlayVideos, muteByDefault, preloadAdjacent, swipeThreshold</li>
        </ul>

        <h3>Interface Best Practices</h3>
        <ul>
          <li>Use TSDoc comments for ALL public methods and properties</li>
          <li>Include @example tags for complex methods</li>
          <li>Document platform-specific behavior</li>
          <li>Mark optional properties with ?</li>
          <li>Use specific types (avoid 'any')</li>
          <li>Export all interfaces used in public API</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'MediaObject Interface',
          code: `/**
 * MediaObject Interface (from spec)
 */
export interface MediaObject {
  // Required fields
  id: string | number;
  type: 'image' | 'video' | 'mixed';
  url: string;

  // Optional fields
  thumbnailUrl?: string;        // For faster loading
  duration?: number;            // For videos (seconds)
  aspectRatio?: number;         // width/height (for layout)

  // Extensible metadata
  metadata?: {
    title?: string;
    description?: string;
    author?: string;
    createdAt?: Date;
    tags?: string[];
    [key: string]: any;         // Allow custom metadata
  };

  // Overlays (for duplicate with overlay feature)
  overlays?: OverlayObject[];
}

/**
 * OverlayObject Interface
 */
export interface OverlayObject {
  id: string;
  type: 'image' | 'video' | 'text' | 'sticker';
  url?: string;                 // For image/video overlays
  content?: string;             // For text overlays
  position: {
    x: number;                  // Percentage (0-100)
    y: number;                  // Percentage (0-100)
  };
  scale?: number;               // 0.1 - 5.0
  rotation?: number;            // Degrees 0-360
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'WidgetConfig Interface',
          code: `/**
 * Widget Configuration Interface
 */
export interface WidgetConfig {
  // Required
  mediaList: MediaObject[];

  // Navigation
  initialIndex?: number;          // Default: 0
  loop?: boolean;                 // Default: false

  // Gesture Configuration
  enableSwipeUp?: boolean;        // Default: true
  enableSwipeDown?: boolean;      // Default: true
  enableSwipeLeft?: boolean;      // Default: true
  enableSwipeRight?: boolean;     // Default: true
  enableTap?: boolean;            // Default: true
  enableDoubleTap?: boolean;      // Default: false
  enablePinchZoom?: boolean;      // Default: false

  // UI Configuration
  showActionBar?: boolean;        // Default: true
  showProgressIndicator?: boolean; // Default: true
  customActionButtons?: ActionButton[];
  actionBarPosition?: 'bottom' | 'top' | 'floating';
  theme?: 'light' | 'dark' | 'auto';

  // Behavior
  autoPlayVideos?: boolean;       // Default: true
  muteByDefault?: boolean;        // Default: false
  preloadAdjacent?: boolean;      // Default: true
  swipeThreshold?: number;        // Default: 50 (pixels)

  // Accessibility
  ariaLabel?: string;
  keyboardNavigation?: boolean;   // Default: true
}

/**
 * Example configurations for different use cases
 */
const instagramStoriesConfig: WidgetConfig = {
  mediaList: stories,
  enableSwipeLeft: true,
  enableSwipeRight: true,
  enableSwipeUp: false,
  enableSwipeDown: true,  // Dismiss
  autoPlayVideos: true,
  loop: false
};

const tiktokFeedConfig: WidgetConfig = {
  mediaList: videos,
  enableSwipeUp: true,    // Next video
  enableSwipeDown: true,  // Previous video
  enableSwipeLeft: false,
  enableSwipeRight: false,
  autoPlayVideos: true,
  loop: true              // Infinite scroll
};`,
          copyable: true,
        },
      ],
      interviewTips: [
        'TSDoc comments: Document all public APIs with @param, @returns, @example for auto-generated docs',
        'Type safety: Use specific types (not any), mark optional with ?, export all public interfaces',
        'Extensibility: metadata[key: string] allows custom fields without breaking changes',
        'Configuration: Same widget, different configs = different behaviors (Stories vs Reels)',
        'Generic metadata: MediaInteractionEvent<T> ensures type-safe event-specific data',
      ],
    },
    {
      id: 273,
      title: 'Gesture Detection System',
      content: `
        <h2>Implementing Cross-Platform Gestures</h2>
        <p>Gesture detection uses Ionic GestureController for unified touch and mouse handling across platforms.</p>

        <h3>Gesture Types</h3>
        <h4>Swipe Gestures</h4>
        <ul>
          <li><strong>Left/Right:</strong> Navigate to next/previous media (50px threshold)</li>
          <li><strong>Up:</strong> Next in feed/playlist (TikTok-style vertical feed)</li>
          <li><strong>Down:</strong> Previous or dismiss widget</li>
        </ul>

        <h4>Tap Gestures</h4>
        <ul>
          <li><strong>Single Tap:</strong> Play/pause video or navigate in</li>
          <li><strong>Double Tap:</strong> Like/favorite with heart animation</li>
          <li><strong>Long Press:</strong> Show context menu (500ms hold)</li>
        </ul>

        <h4>Zoom Gestures</h4>
        <ul>
          <li><strong>Pinch Zoom:</strong> Two-finger pinch for 1x-4x zoom (mobile)</li>
          <li><strong>Ctrl+Scroll:</strong> Zoom for desktop</li>
        </ul>

        <h3>Ionic GestureController</h3>
        <p>Provides cross-platform gesture handling with configurable thresholds and visual feedback.</p>
        <ul>
          <li><strong>onStart:</strong> Capture initial touch position</li>
          <li><strong>onMove:</strong> Track movement and apply visual feedback (transform)</li>
          <li><strong>onEnd:</strong> Calculate direction/distance, emit event, reset transform</li>
        </ul>

        <h3>Keyboard Navigation</h3>
        <p>Essential for accessibility - provide keyboard alternatives to all gestures.</p>
        <ul>
          <li><strong>Arrow Left/Right:</strong> Navigate previous/next</li>
          <li><strong>Arrow Up/Down:</strong> Navigate up/down (if enabled)</li>
          <li><strong>Space:</strong> Play/Pause video</li>
          <li><strong>Enter:</strong> Navigate in / Select</li>
          <li><strong>Escape:</strong> Navigate back</li>
          <li><strong>L:</strong> Like, <strong>C:</strong> Comment, <strong>S:</strong> Save</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Gesture Handler Service',
          code: `import { Injectable } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GestureHandlerService {
  constructor(private gestureCtrl: GestureController) {}

  createSwipeGesture(
    element: HTMLElement,
    onSwipe: (direction: SwipeDirection, distance: number) => void,
    threshold: number = 50
  ) {
    let startX = 0;
    let startY = 0;

    const gesture = this.gestureCtrl.create({
      el: element,
      threshold: 0,
      gestureName: 'swipe',

      onStart: (detail) => {
        startX = detail.startX;
        startY = detail.startY;
      },

      onMove: (detail) => {
        const deltaX = detail.currentX - startX;
        const deltaY = detail.currentY - startY;

        // Visual feedback during swipe
        element.style.transform = \`translate(\${deltaX}px, \${deltaY}px)\`;
      },

      onEnd: (detail) => {
        const deltaX = detail.currentX - startX;
        const deltaY = detail.currentY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        let direction: SwipeDirection | null = null;

        if (absX > absY && absX > threshold) {
          direction = deltaX > 0 ? 'right' : 'left';
          onSwipe(direction, absX);
        } else if (absY > absX && absY > threshold) {
          direction = deltaY > 0 ? 'down' : 'up';
          onSwipe(direction, absY);
        }

        // Reset with animation
        element.style.transition = 'transform 0.3s ease-out';
        element.style.transform = 'translate(0, 0)';
        setTimeout(() => element.style.transition = '', 300);
      }
    });

    gesture.enable();
    return gesture;
  }
}

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Keyboard Handler Service',
          code: `import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardHandlerService {
  private destroy$ = new Subject<void>();

  setupKeyboardNav(callbacks: {
    onNavigateNext?: () => void;
    onNavigatePrevious?: () => void;
    onPlayPause?: () => void;
    onLike?: () => void;
    onComment?: () => void;
    onSave?: () => void;
  }) {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(e => !this.isInputFocused()),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            callbacks.onNavigatePrevious?.();
            break;
          case 'ArrowRight':
            e.preventDefault();
            callbacks.onNavigateNext?.();
            break;
          case ' ':
            e.preventDefault();
            callbacks.onPlayPause?.();
            break;
          case 'l':
          case 'L':
            callbacks.onLike?.();
            break;
          case 'c':
          case 'C':
            callbacks.onComment?.();
            break;
          case 's':
          case 'S':
            e.preventDefault();
            callbacks.onSave?.();
            break;
        }
      });
  }

  private isInputFocused(): boolean {
    const activeElement = document.activeElement;
    return activeElement?.tagName === 'INPUT' ||
           activeElement?.tagName === 'TEXTAREA';
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'GestureController: Ionic provides unified API for touch and mouse, handles edge cases',
        'Visual feedback: Transform element during drag, animate back on release for smooth UX',
        'Thresholds: 50px swipe, 300ms double-tap, 500ms long-press prevents accidental triggers',
        'Keyboard navigation: Essential for accessibility, provide alternatives to all gestures',
        'Cleanup: gesture.destroy() on component destroy to prevent memory leaks',
      ],
    },
    {
      id: 274,
      title: 'Media Viewer & Action Bar Components',
      content: `
        <h2>Media Viewer Component</h2>
        <p>Presentation component for displaying media with gesture detection and loading states.</p>

        <h3>Features</h3>
        <ul>
          <li><strong>Image Renderer:</strong> Displays images with overlays support</li>
          <li><strong>Video Renderer:</strong> HTML5 video with autoplay, mute, loop controls</li>
          <li><strong>Loading States:</strong> Skeleton loader while loading</li>
          <li><strong>Error States:</strong> Error message with retry button</li>
          <li><strong>Gesture Integration:</strong> Swipe, tap, double-tap directives</li>
          <li><strong>Animations:</strong> Heart animation on double-tap (like)</li>
        </ul>

        <h3>Action Bar Component</h3>
        <p>Bottom controls with Comment, Add, and More buttons. More button opens flyout menu.</p>

        <h4>Action Bar Features</h4>
        <ul>
          <li><strong>Main Buttons:</strong> Comment, Add Media, More (always visible)</li>
          <li><strong>Flyout Menu:</strong> Save, Report, Duplicate (slides up from More)</li>
          <li><strong>Custom Buttons:</strong> Support for additional action buttons</li>
          <li><strong>Touch Targets:</strong> 44x44px minimum (WCAG AAA)</li>
          <li><strong>Backdrop:</strong> Click outside to close flyout</li>
        </ul>

        <h4>Flyout Menu Animation</h4>
        <ul>
          <li>Slide up from More button (200ms ease-out)</li>
          <li>Semi-transparent background with backdrop-filter</li>
          <li>Right-aligned above More button</li>
          <li>Close on: tap outside, tap More again, or select item</li>
        </ul>

        <h3>Progress Indicator</h3>
        <p>Shows current position in media list.</p>
        <ul>
          <li><strong>Pagination Dots:</strong> For image lists (top center, 8px dots)</li>
          <li><strong>Progress Bar:</strong> For videos (bottom, 2px height, auto-hide)</li>
          <li><strong>Counter:</strong> Alternative "3/12" text (top right)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Media Viewer Component',
          code: `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MediaObject } from '../../models/media-object.interface';
import { SwipeGestureDirective } from '../../directives/swipe-gesture.directive';
import { TapGestureDirective } from '../../directives/tap-gesture.directive';

@Component({
  selector: 'app-media-viewer',
  standalone: true,
  imports: [CommonModule, IonicModule, SwipeGestureDirective, TapGestureDirective],
  template: \`
    <div class="media-viewer"
         appSwipeGesture
         [swipeThreshold]="swipeThreshold"
         (swipe)="onSwipe($event)"
         appTapGesture
         [enableDoubleTap]="enableDoubleTap"
         (singleTap)="onTap()"
         (doubleTap)="onDoubleTap($event)">

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-spinner">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <!-- Image Renderer -->
      <div *ngIf="currentMedia?.type === 'image' && !isLoading"
           class="image-renderer">
        <img [src]="currentMedia.url"
             [alt]="currentMedia.metadata?.title || 'Media image'"
             (load)="onMediaLoad()"
             (error)="onMediaError($event)">
      </div>

      <!-- Video Renderer -->
      <div *ngIf="currentMedia?.type === 'video' && !isLoading"
           class="video-renderer">
        <video [src]="currentMedia.url"
               [muted]="isMuted"
               [autoplay]="autoPlay"
               [loop]="loop"
               (loadeddata)="onMediaLoad()"
               (error)="onMediaError($event)"
               playsinline>
        </video>
      </div>

      <!-- Error State -->
      <div *ngIf="hasError" class="error-state">
        <ion-icon name="alert-circle-outline"></ion-icon>
        <p>Failed to load media</p>
        <ion-button (click)="retry()">Retry</ion-button>
      </div>

      <!-- Heart Animation (Double Tap) -->
      <div *ngIf="showHeartAnimation"
           class="heart-animation"
           [style.left.px]="heartPosition.x"
           [style.top.px]="heartPosition.y">
        <ion-icon name="heart"></ion-icon>
      </div>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaViewerComponent {
  @Input() currentMedia: MediaObject | null = null;
  @Input() enableDoubleTap = false;
  @Input() swipeThreshold = 50;
  @Input() autoPlay = true;
  @Input() isMuted = false;
  @Input() loop = false;

  @Output() swipe = new EventEmitter<any>();
  @Output() tap = new EventEmitter<void>();
  @Output() doubleTap = new EventEmitter<any>();
  @Output() mediaLoad = new EventEmitter<void>();
  @Output() mediaError = new EventEmitter<Error>();

  isLoading = true;
  hasError = false;
  showHeartAnimation = false;
  heartPosition = { x: 0, y: 0 };

  onDoubleTap(event: { x: number; y: number }): void {
    this.heartPosition = event;
    this.showHeartAnimation = true;
    setTimeout(() => this.showHeartAnimation = false, 600);
    this.doubleTap.emit(event);
  }

  onMediaLoad(): void {
    this.isLoading = false;
    this.mediaLoad.emit();
  }

  onMediaError(event: Event): void {
    this.hasError = true;
    this.mediaError.emit(new Error('Media load failed'));
  }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Action Bar Component',
          code: `import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: \`
    <div class="action-bar">
      <button class="action-button" (click)="onComment.emit()">
        <ion-icon name="chatbubble-outline"></ion-icon>
        <span>Comment</span>
      </button>

      <button class="action-button" (click)="onAdd.emit()">
        <ion-icon name="add-circle-outline"></ion-icon>
        <span>Add</span>
      </button>

      <button class="action-button" (click)="toggleFlyout()">
        <ion-icon name="ellipsis-horizontal"></ion-icon>
        <span>More</span>
      </button>

      <!-- Flyout Menu -->
      <div *ngIf="showFlyout" class="flyout-menu">
        <button (click)="handleAction('save')">
          <ion-icon name="bookmark-outline"></ion-icon>Save
        </button>
        <button (click)="handleAction('report')">
          <ion-icon name="flag-outline"></ion-icon>Report
        </button>
        <button (click)="handleAction('duplicate')">
          <ion-icon name="copy-outline"></ion-icon>Duplicate
        </button>
      </div>
    </div>

    <div *ngIf="showFlyout" class="flyout-backdrop"
         (click)="toggleFlyout()"></div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent {
  @Output() onComment = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onReport = new EventEmitter<void>();
  @Output() onDuplicate = new EventEmitter<void>();

  showFlyout = false;

  toggleFlyout(): void {
    this.showFlyout = !this.showFlyout;
  }

  handleAction(action: string): void {
    this.showFlyout = false;
    if (action === 'save') this.onSave.emit();
    else if (action === 'report') this.onReport.emit();
    else if (action === 'duplicate') this.onDuplicate.emit();
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'OnPush change detection: Only re-renders when inputs change, performance optimization',
        'Loading states: Show skeleton while loading, error state with retry on failure',
        'Gesture directives: Reusable directives for swipe and tap detection',
        'Heart animation: Double-tap triggers heart at tap position, fades out after 600ms',
        'Action bar: 44x44px touch targets, semi-transparent background, flyout slides up from More',
      ],
    },
    {
      id: 275,
      title: 'Event System & View Tracking',
      content: `
        <h2>Event Emission System</h2>
        <p>Centralized event emission for analytics and parent component integration.</p>

        <h3>Event Emitter Service</h3>
        <p>Central service that emits all widget interactions as typed events.</p>
        <ul>
          <li><strong>Generic Events:</strong> emitInteraction() for any event type</li>
          <li><strong>Specific Helpers:</strong> emitViewStart(), emitLike(), emitNavigation()</li>
          <li><strong>Type Safety:</strong> Generic metadata for event-specific data</li>
          <li><strong>Observable Stream:</strong> interaction$ observable for RxJS integration</li>
        </ul>

        <h3>View Tracking Service</h3>
        <p>Track view start, duration, and completion for analytics and engagement metrics.</p>

        <h4>View Tracking Flow</h4>
        <ol>
          <li><strong>View Start:</strong> Media visible for 250ms (filters accidental swipes)</li>
          <li><strong>Duration Tracking:</strong> Emit view_duration every 5 seconds</li>
          <li><strong>View End:</strong> Calculate total duration and completion percentage</li>
          <li><strong>Completed View:</strong> Mark as completed if >= 75% viewed</li>
        </ol>

        <h4>Why These Thresholds?</h4>
        <ul>
          <li><strong>250ms View Start:</strong> Industry standard (Facebook, Instagram), filters accidental swipes</li>
          <li><strong>5 Second Intervals:</strong> Balance between granularity and avoiding spam</li>
          <li><strong>75% Completion:</strong> Common metric for "completed view" in social media</li>
        </ul>

        <h3>Main Widget Integration</h3>
        <p>Smart component orchestrates children, manages state, and emits events.</p>
        <ul>
          <li>Subscribes to event stream</li>
          <li>Forwards events to parent via @Output()</li>
          <li>Manages navigation and media changes</li>
          <li>Coordinates view tracking lifecycle</li>
          <li>Setup keyboard navigation</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Event Emitter Service',
          code: `import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MediaInteractionEvent, InteractionEventType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  private interactionSubject = new Subject<MediaInteractionEvent>();
  public interaction$ = this.interactionSubject.asObservable();

  emitInteraction<T = any>(
    eventType: InteractionEventType,
    mediaId: string | number,
    mediaIndex: number,
    metadata?: T
  ): void {
    const event: MediaInteractionEvent<T> = {
      eventType,
      mediaId,
      mediaIndex,
      timestamp: new Date(),
      metadata
    };

    this.interactionSubject.next(event);
  }

  emitViewStart(mediaId: string, index: number): void {
    this.emitInteraction('view_start', mediaId, index);
  }

  emitViewEnd(
    mediaId: string,
    index: number,
    duration: number,
    percentageViewed: number
  ): void {
    this.emitInteraction('view_end', mediaId, index, {
      duration,
      percentageViewed,
      completedView: percentageViewed >= 75
    });
  }

  emitLike(mediaId: string, index: number): void {
    this.emitInteraction('like', mediaId, index);
  }

  emitComment(mediaId: string, index: number): void {
    this.emitInteraction('comment', mediaId, index);
  }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'View Tracker Service',
          code: `import { Injectable } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class ViewTrackerService {
  private viewStartTimes = new Map<string, number>();
  private viewTimers = new Map<string, any>();
  private durationTimers = new Map<string, any>();

  constructor(private eventEmitter: EventEmitterService) {}

  startViewTracking(mediaId: string): void {
    const viewStartTimer = setTimeout(() => {
      if (!this.viewStartTimes.has(mediaId)) {
        const startTime = Date.now();
        this.viewStartTimes.set(mediaId, startTime);

        this.eventEmitter.emitInteraction('view_start', mediaId, 0);
        this.startDurationTracking(mediaId);
      }
    }, 250); // Wait 250ms to filter accidental swipes

    this.viewTimers.set(mediaId, viewStartTimer);
  }

  endViewTracking(mediaId: string): void {
    const viewStartTimer = this.viewTimers.get(mediaId);
    if (viewStartTimer) {
      clearTimeout(viewStartTimer);
      this.viewTimers.delete(mediaId);
    }

    const durationTimer = this.durationTimers.get(mediaId);
    if (durationTimer) {
      clearInterval(durationTimer);
      this.durationTimers.delete(mediaId);
    }

    const startTime = this.viewStartTimes.get(mediaId);
    if (startTime) {
      const totalDuration = Date.now() - startTime;
      const percentageViewed = Math.min(100, (totalDuration / 3000) * 100);

      this.eventEmitter.emitViewEnd(
        mediaId,
        0,
        totalDuration,
        percentageViewed
      );

      this.viewStartTimes.delete(mediaId);
    }
  }

  private startDurationTracking(mediaId: string): void {
    const timer = setInterval(() => {
      const startTime = this.viewStartTimes.get(mediaId);
      if (startTime) {
        const currentDuration = Date.now() - startTime;
        this.eventEmitter.emitInteraction('view_duration', mediaId, 0, {
          currentDuration,
          percentageViewed: Math.min(100, (currentDuration / 3000) * 100)
        });
      }
    }, 5000); // Every 5 seconds

    this.durationTimers.set(mediaId, timer);
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Event emission: Centralized service emits all interactions, parent handles analytics/business logic',
        'View tracking: 250ms delay filters accidental swipes, 5s intervals balance granularity vs spam',
        'Completed view: 75% threshold is social media standard (Facebook, Instagram, TikTok)',
        'RxJS integration: interaction$ observable for reactive programming patterns',
        'Cleanup: Clear timers in endViewTracking() and ngOnDestroy to prevent memory leaks',
      ],
    },
    {
      id: 276,
      title: 'Media Loading & Performance',
      content: `
        <h2>Optimizing Media Loading</h2>
        <p>Media loading optimization balances user experience with performance and memory usage.</p>

        <h3>Loading Strategy</h3>
        <h4>Lazy Loading</h4>
        <ul>
          <li><strong>Load Current:</strong> Immediately load media user is viewing</li>
          <li><strong>Preload Adjacent:</strong> Load next and previous in background</li>
          <li><strong>Unload Distant:</strong> Unload media 3+ positions away to save memory</li>
        </ul>

        <h4>Loading States</h4>
        <ul>
          <li><strong>idle:</strong> Media not yet requested</li>
          <li><strong>loading:</strong> Show skeleton/spinner</li>
          <li><strong>loaded:</strong> Display media, emit success event</li>
          <li><strong>error:</strong> Show error state, emit error event, provide retry</li>
        </ul>

        <h3>Memory Management</h3>
        <ul>
          <li><strong>Revoke Object URLs:</strong> URL.revokeObjectURL() for blob: URLs</li>
          <li><strong>Clear Video Sources:</strong> Set src = '', call load() to free memory</li>
          <li><strong>Remove from Map:</strong> Delete loaded media entries</li>
          <li><strong>Distance Threshold:</strong> Keep current ±2, unload ≥3 away</li>
        </ul>

        <h3>Performance Optimizations</h3>
        <h4>GPU Acceleration</h4>
        <ul>
          <li><strong>transform & opacity:</strong> Use for animations (GPU-accelerated)</li>
          <li><strong>will-change:</strong> Hint browser to optimize specific properties</li>
          <li><strong>Avoid layout triggers:</strong> Don't animate width, height, top, left</li>
        </ul>

        <h4>Rendering Optimizations</h4>
        <ul>
          <li><strong>OnPush Change Detection:</strong> Only re-render on input changes</li>
          <li><strong>RequestAnimationFrame:</strong> Sync animations with browser refresh</li>
          <li><strong>Virtualization:</strong> Only render current ±1 items in DOM</li>
          <li><strong>Debounce/Throttle:</strong> Scroll and resize handlers</li>
        </ul>

        <h3>Progressive Enhancement</h3>
        <ol>
          <li>Show thumbnail first (if available)</li>
          <li>Load full resolution in background</li>
          <li>Smooth fade-in transition when loaded</li>
          <li>Keep thumbnail visible during load</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'Media Loader Service',
          code: `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MediaObject } from '../models';

export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

@Injectable({
  providedIn: 'root'
})
export class MediaLoaderService {
  private loadedMedia = new Map<string, HTMLImageElement | HTMLVideoElement>();
  private loadingStates = new Map<string, BehaviorSubject<LoadingState>>();

  async loadMedia(media: MediaObject): Promise<void> {
    const mediaId = media.id.toString();

    if (this.loadedMedia.has(mediaId)) return;

    this.updateState(mediaId, 'loading');

    try {
      if (media.type === 'image') {
        await this.loadImage(media.url, mediaId);
      } else if (media.type === 'video') {
        await this.loadVideo(media.url, mediaId);
      }

      this.updateState(mediaId, 'loaded');
    } catch (error) {
      this.updateState(mediaId, 'error');
      throw error;
    }
  }

  preloadAdjacent(currentIndex: number, mediaList: MediaObject[]): void {
    if (currentIndex + 1 < mediaList.length) {
      this.loadMedia(mediaList[currentIndex + 1]).catch(() => {});
    }
    if (currentIndex - 1 >= 0) {
      this.loadMedia(mediaList[currentIndex - 1]).catch(() => {});
    }
  }

  unloadDistantMedia(currentIndex: number, mediaList: MediaObject[]): void {
    mediaList.forEach((media, index) => {
      if (Math.abs(index - currentIndex) >= 3) {
        this.unloadMedia(media.id.toString());
      }
    });
  }

  private loadImage(url: string, mediaId: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedMedia.set(mediaId, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = url;
    });
  }

  private unloadMedia(mediaId: string): void {
    const media = this.loadedMedia.get(mediaId);
    if (media instanceof HTMLVideoElement) {
      media.src = '';
      media.load();
    }
    this.loadedMedia.delete(mediaId);
    this.updateState(mediaId, 'idle');
  }

  private updateState(mediaId: string, state: LoadingState): void {
    if (!this.loadingStates.has(mediaId)) {
      this.loadingStates.set(mediaId, new BehaviorSubject(state));
    } else {
      this.loadingStates.get(mediaId)!.next(state);
    }
  }
}`,
          copyable: true,
        },
        {
          id: 2,
          language: 'scss',
          title: 'Performance CSS',
          code: `/* GPU Acceleration */
.media-viewer img,
.media-viewer video {
  will-change: transform; /* Hint browser to optimize */
  transform: translateZ(0); /* Force GPU layer */
}

/* Smooth animations */
.media-viewer {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

/* Avoid layout triggers - use transform instead */
.swipe-animation {
  /* ✅ Good: GPU-accelerated */
  transform: translateX(100px);
  opacity: 0.5;

  /* ❌ Bad: Triggers layout recalculation */
  /* left: 100px; */
  /* width: 200px; */
}

/* Loading skeleton */
.loading-skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Lazy loading: Load current immediately, preload adjacent, unload distant (3+ away)',
        'Memory management: Revoke object URLs, clear video src and load(), delete from map',
        'GPU acceleration: Use transform/opacity for animations, will-change for hints',
        'OnPush: Only re-render on input changes, performance optimization for large lists',
        'Progressive enhancement: Show thumbnail → load full res → smooth transition',
      ],
    },
    {
      id: 277,
      title: 'Accessibility & Testing',
      content: `
        <h2>Making Gesture UIs Accessible</h2>
        <p>Gesture-based UIs require careful accessibility implementation to support keyboard navigation, screen readers, and reduced motion preferences.</p>

        <h3>ARIA Labels and Roles</h3>
        <ul>
          <li><strong>Container:</strong> role="region" aria-label="Interactive media gallery"</li>
          <li><strong>Buttons:</strong> aria-label for all action buttons</li>
          <li><strong>Progress:</strong> role="progressbar" with aria-valuenow/min/max</li>
          <li><strong>Live Regions:</strong> aria-live="polite" for state announcements</li>
          <li><strong>Toggle Buttons:</strong> aria-pressed for like/favorite states</li>
        </ul>

        <h3>Keyboard Navigation</h3>
        <ul>
          <li><strong>Tab Order:</strong> Logical focus flow through action buttons</li>
          <li><strong>Focus Indicators:</strong> 2px outline on all interactive elements</li>
          <li><strong>Shortcuts:</strong> Arrow keys, Space, Enter, Escape, L, C, S</li>
          <li><strong>Focus Management:</strong> Set initial focus, trap in modals</li>
        </ul>

        <h3>Screen Reader Support</h3>
        <ul>
          <li><strong>Alt Text:</strong> Required for all images</li>
          <li><strong>Context:</strong> Announce "Viewing 2 of 5" on media change</li>
          <li><strong>Instructions:</strong> "Press left or right arrow to navigate"</li>
          <li><strong>.sr-only:</strong> Screen reader-only content (visually hidden)</li>
        </ul>

        <h3>Reduced Motion</h3>
        <p>Respect prefers-reduced-motion media query:</p>
        <ul>
          <li>Disable animations (duration: 0.01ms)</li>
          <li>Apply final state immediately</li>
          <li>Keep functionality intact</li>
        </ul>

        <h3>Testing Strategy</h3>
        <h4>Unit Tests (70%)</h4>
        <ul>
          <li>Test component rendering with different inputs</li>
          <li>Test event emission (swipe, tap, double-tap)</li>
          <li>Test loading and error states</li>
          <li>Mock services for isolation</li>
        </ul>

        <h4>Integration Tests (20%)</h4>
        <ul>
          <li>Test widget in real Ionic app</li>
          <li>Test service integration</li>
          <li>Test navigation flows</li>
        </ul>

        <h4>E2E Tests (10%)</h4>
        <ul>
          <li>Test on physical devices</li>
          <li>Test gesture interactions</li>
          <li>Test keyboard navigation</li>
          <li>Test accessibility with screen readers</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'html',
          title: 'Accessibility Implementation',
          code: `<!-- ARIA Labels and Roles -->
<div role="region"
     aria-label="Interactive media gallery"
     aria-live="polite">

  <!-- Screen reader only -->
  <span class="sr-only">
    Viewing {{ currentIndex + 1 }} of {{ totalItems }}.
    Press left or right arrow to navigate.
    Press L to like, C to comment, S to save.
  </span>

  <!-- Action buttons with labels -->
  <button aria-label="Like this media"
          [attr.aria-pressed]="isLiked"
          (click)="like()">
    <ion-icon name="heart"></ion-icon>
  </button>

  <button aria-label="Comment on this media"
          (click)="comment()">
    <ion-icon name="chatbubble-outline"></ion-icon>
  </button>

  <!-- Progress indicator -->
  <div role="progressbar"
       [attr.aria-valuenow]="currentIndex + 1"
       [attr.aria-valuemin]="1"
       [attr.aria-valuemax]="totalItems">
    {{ currentIndex + 1 }} / {{ totalItems }}
  </div>
</div>`,
          copyable: true,
        },
        {
          id: 2,
          language: 'scss',
          title: 'Accessibility CSS',
          code: `/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus indicators */
.action-button:focus {
  outline: 2px solid var(--ion-color-primary);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .action-button {
    border: 2px solid currentColor;
    font-weight: 700;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .media-viewer {
    transition: none !important;
  }
}`,
          copyable: true,
        },
        {
          id: 3,
          language: 'typescript',
          title: 'Unit Test Example',
          code: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaViewerComponent } from './media-viewer.component';

describe('MediaViewerComponent', () => {
  let component: MediaViewerComponent;
  let fixture: ComponentFixture<MediaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaViewerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit swipe event on swipe gesture', () => {
    spyOn(component.swipe, 'emit');
    component.onSwipe({ direction: 'left', distance: 100 });
    expect(component.swipe.emit).toHaveBeenCalledWith({
      direction: 'left',
      distance: 100
    });
  });

  it('should show heart animation on double tap', (done) => {
    spyOn(component.doubleTap, 'emit');
    component.onDoubleTap({ x: 100, y: 200 });

    expect(component.doubleTap.emit).toHaveBeenCalledWith({ x: 100, y: 200 });
    expect(component.showHeartAnimation).toBe(true);

    setTimeout(() => {
      expect(component.showHeartAnimation).toBe(false);
      done();
    }, 650);
  });

  it('should show error state on media load error', () => {
    component.onMediaError(new Event('error'));
    expect(component.hasError).toBe(true);
  });
});`,
          copyable: true,
        },
      ],
      interviewTips: [
        'ARIA: Use role="region", aria-label, aria-live for announcements, aria-pressed for toggles',
        'Keyboard: Full navigation with arrows, space, enter, escape, plus shortcuts (L, C, S)',
        'Screen readers: .sr-only for context, announce state changes, provide navigation instructions',
        'Reduced motion: Respect prefers-reduced-motion, disable animations but keep functionality',
        'Testing pyramid: 70% unit (fast, isolated), 20% integration (real app), 10% E2E (devices)',
      ],
    },
  ],
};
