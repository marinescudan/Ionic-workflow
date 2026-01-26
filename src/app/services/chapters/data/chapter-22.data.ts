import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_22_DATA: Chapter = {
  id: 22,
  title: 'Web Performance',
  description: 'Master Core Web Vitals, bundle optimization, lazy loading, change detection, memory management, and runtime performance for blazing-fast Ionic applications',
  icon: 'speedometer-outline',
  category: 'expert',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 220,
      title: 'Performance Fundamentals & Core Web Vitals',
      content: `
        <h2>Understanding Web Performance</h2>
        <p>Web performance directly impacts user experience, conversion rates, and SEO rankings. Google uses Core Web Vitals as ranking signals, making performance optimization essential for modern web applications.</p>

        <h3>Core Web Vitals</h3>
        <table>
          <tr>
            <th>Metric</th>
            <th>What it Measures</th>
            <th>Good</th>
            <th>Needs Improvement</th>
            <th>Poor</th>
          </tr>
          <tr>
            <td>LCP (Largest Contentful Paint)</td>
            <td>Loading performance</td>
            <td>&lt; 2.5s</td>
            <td>2.5s - 4.0s</td>
            <td>&gt; 4.0s</td>
          </tr>
          <tr>
            <td>FID (First Input Delay)</td>
            <td>Interactivity</td>
            <td>&lt; 100ms</td>
            <td>100ms - 300ms</td>
            <td>&gt; 300ms</td>
          </tr>
          <tr>
            <td>CLS (Cumulative Layout Shift)</td>
            <td>Visual stability</td>
            <td>&lt; 0.1</td>
            <td>0.1 - 0.25</td>
            <td>&gt; 0.25</td>
          </tr>
          <tr>
            <td>INP (Interaction to Next Paint)</td>
            <td>Responsiveness (replacing FID)</td>
            <td>&lt; 200ms</td>
            <td>200ms - 500ms</td>
            <td>&gt; 500ms</td>
          </tr>
        </table>

        <h3>Additional Performance Metrics</h3>
        <ul>
          <li><strong>TTFB (Time to First Byte):</strong> Server response time - target &lt; 800ms</li>
          <li><strong>FCP (First Contentful Paint):</strong> First content rendered - target &lt; 1.8s</li>
          <li><strong>TTI (Time to Interactive):</strong> Page fully interactive - target &lt; 3.8s</li>
          <li><strong>TBT (Total Blocking Time):</strong> Main thread blocked - target &lt; 200ms</li>
        </ul>

        <h3>Browser Rendering Pipeline</h3>
        <ol>
          <li><strong>Parse HTML:</strong> Build DOM tree from HTML</li>
          <li><strong>Parse CSS:</strong> Build CSSOM from stylesheets</li>
          <li><strong>JavaScript Execution:</strong> Run scripts (can block rendering)</li>
          <li><strong>Render Tree:</strong> Combine DOM + CSSOM</li>
          <li><strong>Layout:</strong> Calculate element positions and sizes</li>
          <li><strong>Paint:</strong> Fill in pixels for each layer</li>
          <li><strong>Composite:</strong> Combine layers into final image</li>
        </ol>

        <h3>Performance Budget Example</h3>
        <table>
          <tr>
            <th>Resource Type</th>
            <th>Budget</th>
            <th>Typical Angular App</th>
          </tr>
          <tr>
            <td>Initial JavaScript</td>
            <td>&lt; 170 KB (gzipped)</td>
            <td>200-400 KB</td>
          </tr>
          <tr>
            <td>Total JavaScript</td>
            <td>&lt; 350 KB (gzipped)</td>
            <td>500 KB - 1 MB</td>
          </tr>
          <tr>
            <td>CSS</td>
            <td>&lt; 50 KB</td>
            <td>30-80 KB</td>
          </tr>
          <tr>
            <td>Images</td>
            <td>&lt; 500 KB</td>
            <td>Variable</td>
          </tr>
          <tr>
            <td>Fonts</td>
            <td>&lt; 100 KB</td>
            <td>50-200 KB</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'PerformanceMonitorService - Core Web Vitals Tracking',
          code: `// src/app/services/performance/performance-monitor.service.ts
import { Injectable, NgZone } from '@angular/core';
import { onLCP, onFID, onCLS, onTTFB, onFCP, onINP, Metric } from 'web-vitals';

export interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  fcp: number | null;
  inp: number | null;
  customMarks: Map<string, number>;
}

export interface PerformanceReport {
  metrics: PerformanceMetrics;
  timestamp: number;
  url: string;
  userAgent: string;
  connectionType: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
    inp: null,
    customMarks: new Map()
  };

  private observers: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor(private ngZone: NgZone) {
    this.initializeWebVitals();
  }

  /**
   * Initialize Core Web Vitals monitoring
   */
  private initializeWebVitals(): void {
    // Run outside Angular zone to avoid unnecessary change detection
    this.ngZone.runOutsideAngular(() => {
      // Largest Contentful Paint
      onLCP((metric: Metric) => {
        this.metrics.lcp = metric.value;
        this.logMetric('LCP', metric.value, metric.rating);
        this.notifyObservers();
      });

      // First Input Delay
      onFID((metric: Metric) => {
        this.metrics.fid = metric.value;
        this.logMetric('FID', metric.value, metric.rating);
        this.notifyObservers();
      });

      // Cumulative Layout Shift
      onCLS((metric: Metric) => {
        this.metrics.cls = metric.value;
        this.logMetric('CLS', metric.value, metric.rating);
        this.notifyObservers();
      });

      // Time to First Byte
      onTTFB((metric: Metric) => {
        this.metrics.ttfb = metric.value;
        this.logMetric('TTFB', metric.value, metric.rating);
        this.notifyObservers();
      });

      // First Contentful Paint
      onFCP((metric: Metric) => {
        this.metrics.fcp = metric.value;
        this.logMetric('FCP', metric.value, metric.rating);
        this.notifyObservers();
      });

      // Interaction to Next Paint (replacing FID in 2024)
      onINP((metric: Metric) => {
        this.metrics.inp = metric.value;
        this.logMetric('INP', metric.value, metric.rating);
        this.notifyObservers();
      });
    });
  }

  /**
   * Log metric to console with color coding
   */
  private logMetric(name: string, value: number, rating: string): void {
    const colors = {
      good: '#0CCE6B',
      'needs-improvement': '#FFA400',
      poor: '#FF4E42'
    };

    console.log(
      \`%c[\${name}] \${value.toFixed(2)} (\${rating})\`,
      \`color: \${colors[rating as keyof typeof colors] || '#888'}\`
    );
  }

  /**
   * Create custom performance mark
   */
  mark(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(name);
      this.metrics.customMarks.set(name, performance.now());
    }
  }

  /**
   * Measure time between two marks
   */
  measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof performance !== 'undefined') {
      try {
        const measure = performance.measure(
          name,
          startMark,
          endMark || undefined
        );
        return measure.duration;
      } catch (error) {
        console.warn(\`Failed to measure \${name}:\`, error);
        return null;
      }
    }
    return null;
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Generate performance report
   */
  generateReport(): PerformanceReport {
    const connection = (navigator as any).connection;

    return {
      metrics: this.getMetrics(),
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connectionType: connection?.effectiveType || 'unknown'
    };
  }

  /**
   * Subscribe to metric updates
   */
  subscribe(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  private notifyObservers(): void {
    this.observers.forEach(callback => callback(this.getMetrics()));
  }

  /**
   * Send metrics to analytics endpoint
   */
  async sendToAnalytics(endpoint: string): Promise<void> {
    const report = this.generateReport();

    try {
      // Use sendBeacon for reliability during page unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, JSON.stringify(report));
      } else {
        await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(report),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        });
      }
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
    }
  }
}`,
          description: 'Complete service for tracking Core Web Vitals and custom performance metrics using the web-vitals library',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Performance Budget Configuration',
          code: `// angular.json - Performance budgets configuration
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kb",
                  "maximumError": "8kb"
                },
                {
                  "type": "anyScript",
                  "maximumWarning": "150kb",
                  "maximumError": "300kb"
                },
                {
                  "type": "any",
                  "maximumWarning": "200kb",
                  "maximumError": "400kb"
                },
                {
                  "type": "bundle",
                  "name": "vendor",
                  "maximumWarning": "400kb",
                  "maximumError": "600kb"
                },
                {
                  "type": "bundle",
                  "name": "main",
                  "maximumWarning": "100kb",
                  "maximumError": "200kb"
                }
              ]
            }
          }
        }
      }
    }
  }
}`,
          description: 'Angular CLI budget configuration to enforce performance limits during build',
          copyable: true,
        },
      ],
      interviewTips: [
        'Core Web Vitals (LCP, FID/INP, CLS) are Google ranking factors since 2021',
        'LCP measures perceived load speed - optimize images, fonts, and critical CSS',
        'CLS measures visual stability - always set dimensions on images and embeds',
        'FID/INP measures interactivity - minimize main thread blocking with code splitting',
        'Performance budgets catch regressions before they reach production',
        'Use Lighthouse CI in your pipeline to track performance over time',
      ],
    },
    {
      id: 221,
      title: 'Bundle Optimization & Code Splitting',
      content: `
        <h2>Bundle Optimization Strategies</h2>
        <p>Reducing JavaScript bundle size is one of the most impactful performance optimizations. Angular provides several built-in mechanisms for optimization.</p>

        <h3>AOT vs JIT Compilation</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>AOT (Ahead-of-Time)</th>
            <th>JIT (Just-in-Time)</th>
          </tr>
          <tr>
            <td>When compiled</td>
            <td>Build time</td>
            <td>Runtime (browser)</td>
          </tr>
          <tr>
            <td>Bundle size</td>
            <td>Smaller (no compiler)</td>
            <td>Larger (includes compiler)</td>
          </tr>
          <tr>
            <td>Startup time</td>
            <td>Faster</td>
            <td>Slower</td>
          </tr>
          <tr>
            <td>Template errors</td>
            <td>Caught at build</td>
            <td>Runtime errors</td>
          </tr>
          <tr>
            <td>Security</td>
            <td>Better (no eval)</td>
            <td>Less secure</td>
          </tr>
        </table>

        <h3>Tree Shaking</h3>
        <p>Tree shaking removes unused code from the final bundle. For it to work effectively:</p>
        <ul>
          <li>Use ES6 module imports (not CommonJS require)</li>
          <li>Import only what you need: <code>import { map } from 'rxjs/operators'</code></li>
          <li>Avoid side effects in modules</li>
          <li>Mark packages as side-effect-free in package.json</li>
        </ul>

        <h3>Code Splitting Strategies</h3>
        <ul>
          <li><strong>Route-based:</strong> Each route loads its own bundle</li>
          <li><strong>Component-based:</strong> Heavy components loaded on demand</li>
          <li><strong>Vendor splitting:</strong> Third-party code in separate chunks</li>
          <li><strong>Common chunks:</strong> Shared code extracted to common bundle</li>
        </ul>

        <h3>Bundle Size Impact</h3>
        <table>
          <tr>
            <th>Optimization</th>
            <th>Typical Savings</th>
          </tr>
          <tr>
            <td>AOT Compilation</td>
            <td>30-50% reduction</td>
          </tr>
          <tr>
            <td>Tree Shaking</td>
            <td>20-40% reduction</td>
          </tr>
          <tr>
            <td>Lazy Loading</td>
            <td>50-70% initial load reduction</td>
          </tr>
          <tr>
            <td>Minification</td>
            <td>40-60% reduction</td>
          </tr>
          <tr>
            <td>Gzip Compression</td>
            <td>60-80% transfer reduction</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 3,
          language: 'typescript',
          title: 'Route-Level Lazy Loading',
          code: `// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page')
      .then(m => m.HomePage)
  },
  {
    path: 'chapters',
    loadComponent: () => import('./pages/chapters/chapters.page')
      .then(m => m.ChaptersPage)
  },
  {
    path: 'chapters/:id',
    loadComponent: () => import('./pages/chapter-detail/chapter-detail.page')
      .then(m => m.ChapterDetailPage)
  },
  // Preload critical routes
  {
    path: 'demo/:chapterId',
    loadComponent: () => import('./pages/demo/demo.page')
      .then(m => m.DemoPage),
    data: { preload: true }
  },
  // Heavy features loaded only when needed
  {
    path: 'video-call',
    loadComponent: () => import('./pages/video-call/video-call.page')
      .then(m => m.VideoCallPage)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.page')
      .then(m => m.AnalyticsPage),
    // Load children lazily too
    children: [
      {
        path: 'charts',
        loadComponent: () => import('./pages/analytics/charts/charts.page')
          .then(m => m.ChartsPage)
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/analytics/reports/reports.page')
          .then(m => m.ReportsPage)
      }
    ]
  },
  // Wildcard route
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page')
      .then(m => m.NotFoundPage)
  }
];

// Custom preloading strategy
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload']) {
      // Delay preloading to not compete with initial load
      return timer(2000).pipe(
        mergeMap(() => {
          this.preloadedModules.push(route.path || '');
          console.log(\`Preloaded: \${route.path}\`);
          return load();
        })
      );
    }
    return of(null);
  }
}`,
          description: 'Route configuration with lazy loading and selective preloading strategy',
          copyable: true,
        },
        {
          id: 4,
          language: 'typescript',
          title: 'Dynamic Component Loading',
          code: `// src/app/services/dynamic-loader.service.ts
import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  Type,
  createComponent,
  EnvironmentInjector
} from '@angular/core';

interface ComponentLoader {
  load: () => Promise<Type<any>>;
  inputs?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicLoaderService {
  private loadedComponents = new Map<string, Type<any>>();

  constructor(private environmentInjector: EnvironmentInjector) {}

  /**
   * Dynamically load and render a component
   */
  async loadComponent<T>(
    container: ViewContainerRef,
    loader: ComponentLoader
  ): Promise<ComponentRef<T>> {
    // Load the component class
    const componentClass = await loader.load();

    // Clear the container
    container.clear();

    // Create the component
    const componentRef = container.createComponent(componentClass, {
      environmentInjector: this.environmentInjector
    });

    // Set inputs if provided
    if (loader.inputs) {
      Object.entries(loader.inputs).forEach(([key, value]) => {
        componentRef.setInput(key, value);
      });
    }

    return componentRef as ComponentRef<T>;
  }

  /**
   * Preload a component without rendering
   */
  async preloadComponent(key: string, loader: () => Promise<Type<any>>): Promise<void> {
    if (!this.loadedComponents.has(key)) {
      const component = await loader();
      this.loadedComponents.set(key, component);
    }
  }

  /**
   * Check if component is preloaded
   */
  isPreloaded(key: string): boolean {
    return this.loadedComponents.has(key);
  }
}

// Usage in component
@Component({
  selector: 'app-dashboard',
  template: \`
    <div class="widget-container">
      <ng-container #chartContainer></ng-container>
    </div>
    <ion-button (click)="loadChartWidget()">Load Chart</ion-button>
  \`
})
export class DashboardPage {
  @ViewChild('chartContainer', { read: ViewContainerRef })
  chartContainer!: ViewContainerRef;

  constructor(private dynamicLoader: DynamicLoaderService) {}

  async loadChartWidget(): Promise<void> {
    await this.dynamicLoader.loadComponent(this.chartContainer, {
      load: () => import('./widgets/chart-widget.component')
        .then(m => m.ChartWidgetComponent),
      inputs: {
        data: this.chartData,
        type: 'line'
      }
    });
  }
}`,
          description: 'Service for dynamically loading components on demand to reduce initial bundle size',
          copyable: true,
        },
        {
          id: 5,
          language: 'bash',
          title: 'Bundle Analysis Commands',
          code: `# Install webpack bundle analyzer
npm install --save-dev webpack-bundle-analyzer source-map-explorer

# Build with stats
ng build --configuration=production --stats-json

# Analyze with webpack-bundle-analyzer
npx webpack-bundle-analyzer www/stats.json

# Alternative: source-map-explorer (requires source maps)
ng build --configuration=production --source-map
npx source-map-explorer www/**/*.js

# Check bundle sizes
du -sh www/*.js | sort -h

# Gzip size check
gzip -c www/main.*.js | wc -c

# Build comparison
# Before optimization
ng build --configuration=production
ls -la www/*.js

# After optimization (record the difference)
# Initial bundle: 450kb -> 280kb (38% reduction)
# Lazy chunks: Created 12 separate chunks

# Lighthouse performance audit
npx lighthouse https://your-app.com --view --preset=desktop

# Bundle budget check
ng build --configuration=production 2>&1 | grep -i budget`,
          description: 'Commands for analyzing and optimizing bundle size',
          copyable: true,
        },
      ],
      interviewTips: [
        'AOT compilation runs at build time, removing the need for the Angular compiler in the browser',
        'Tree shaking only works with ES modules - avoid barrel files that re-export everything',
        'Lazy loading can reduce initial bundle by 50-70% in large applications',
        'Use webpack-bundle-analyzer to identify large dependencies for replacement or lazy loading',
        'Differential loading serves modern ES2015+ to new browsers, ES5 to legacy browsers',
        'Source maps should be disabled in production or uploaded to error tracking services only',
      ],
    },
    {
      id: 222,
      title: 'Lazy Loading Strategies',
      content: `
        <h2>Advanced Lazy Loading Patterns</h2>
        <p>Lazy loading delays the loading of resources until they are needed, significantly improving initial page load time.</p>

        <h3>Lazy Loading Types</h3>
        <ul>
          <li><strong>Route-level:</strong> Load page components when navigating</li>
          <li><strong>Module-level:</strong> Load feature modules on demand</li>
          <li><strong>Component-level:</strong> Load heavy components dynamically</li>
          <li><strong>Image lazy loading:</strong> Load images as they enter viewport</li>
          <li><strong>Third-party scripts:</strong> Defer non-critical scripts</li>
        </ul>

        <h3>Intersection Observer API</h3>
        <p>The Intersection Observer API enables efficient lazy loading by detecting when elements enter the viewport:</p>
        <ul>
          <li>No scroll event listeners (better performance)</li>
          <li>Configurable thresholds and margins</li>
          <li>Works with any DOM element</li>
          <li>Native browser support (97%+ coverage)</li>
        </ul>

        <h3>Preloading Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Description</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>NoPreloading</td>
            <td>Load only when navigated</td>
            <td>Low bandwidth users</td>
          </tr>
          <tr>
            <td>PreloadAllModules</td>
            <td>Preload all after initial load</td>
            <td>Small apps</td>
          </tr>
          <tr>
            <td>Custom Strategy</td>
            <td>Selective preloading</td>
            <td>Large apps with priorities</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 6,
          language: 'typescript',
          title: 'Intersection Observer Directive for Lazy Loading',
          code: `// src/app/directives/lazy-load.directive.ts
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input() threshold = 0.1; // 10% visibility triggers load
  @Input() rootMargin = '100px'; // Start loading 100px before visible

  @Output() visible = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();

  private observer: IntersectionObserver | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createObserver();
  }

  ngOnDestroy(): void {
    this.destroyObserver();
  }

  private createObserver(): void {
    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible.emit();
        } else {
          this.hidden.emit();
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  private destroyObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Usage example
@Component({
  selector: 'app-lazy-image',
  standalone: true,
  imports: [LazyLoadDirective, NgIf],
  template: \`
    <div
      appLazyLoad
      [threshold]="0.1"
      rootMargin="200px"
      (visible)="onVisible()"
    >
      <img
        *ngIf="isLoaded"
        [src]="src"
        [alt]="alt"
        (load)="onImageLoad()"
        (error)="onImageError()"
      />
      <div *ngIf="!isLoaded" class="placeholder">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
    </div>
  \`
})
export class LazyImageComponent {
  @Input() src!: string;
  @Input() alt = '';
  @Input() placeholder = '/assets/placeholder.png';

  isLoaded = false;
  hasError = false;

  onVisible(): void {
    this.isLoaded = true;
  }

  onImageLoad(): void {
    console.log('Image loaded:', this.src);
  }

  onImageError(): void {
    this.hasError = true;
    this.src = this.placeholder;
  }
}`,
          description: 'Reusable directive using Intersection Observer for lazy loading any content',
          copyable: true,
        },
        {
          id: 7,
          language: 'typescript',
          title: 'Third-Party Script Lazy Loading',
          code: `// src/app/services/script-loader.service.ts
import { Injectable, NgZone } from '@angular/core';

interface ScriptConfig {
  src: string;
  id: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private loadedScripts = new Set<string>();
  private loadingScripts = new Map<string, Promise<void>>();

  constructor(private ngZone: NgZone) {}

  /**
   * Load a script lazily
   */
  loadScript(config: ScriptConfig): Promise<void> {
    // Already loaded
    if (this.loadedScripts.has(config.id)) {
      return Promise.resolve();
    }

    // Currently loading
    if (this.loadingScripts.has(config.id)) {
      return this.loadingScripts.get(config.id)!;
    }

    // Start loading
    const loadPromise = new Promise<void>((resolve, reject) => {
      this.ngZone.runOutsideAngular(() => {
        const script = document.createElement('script');
        script.id = config.id;
        script.src = config.src;
        script.async = config.async ?? true;
        script.defer = config.defer ?? false;

        script.onload = () => {
          this.loadedScripts.add(config.id);
          this.loadingScripts.delete(config.id);
          config.onLoad?.();
          resolve();
        };

        script.onerror = () => {
          this.loadingScripts.delete(config.id);
          reject(new Error(\`Failed to load script: \${config.src}\`));
        };

        document.head.appendChild(script);
      });
    });

    this.loadingScripts.set(config.id, loadPromise);
    return loadPromise;
  }

  /**
   * Load Google Analytics lazily
   */
  async loadGoogleAnalytics(trackingId: string): Promise<void> {
    await this.loadScript({
      id: 'google-analytics',
      src: \`https://www.googletagmanager.com/gtag/js?id=\${trackingId}\`,
      async: true,
      onLoad: () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
          (window as any).dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', trackingId);
      }
    });
  }

  /**
   * Load Stripe lazily
   */
  async loadStripe(publishableKey: string): Promise<any> {
    await this.loadScript({
      id: 'stripe-js',
      src: 'https://js.stripe.com/v3/',
      async: true
    });
    return (window as any).Stripe(publishableKey);
  }

  /**
   * Load script on idle (when browser is not busy)
   */
  loadOnIdle(config: ScriptConfig): void {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        this.loadScript(config);
      });
    } else {
      // Fallback for Safari
      setTimeout(() => this.loadScript(config), 1000);
    }
  }

  /**
   * Preconnect to third-party origins
   */
  preconnect(url: string): void {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  }
}`,
          description: 'Service for lazy loading third-party scripts to improve initial page load',
          copyable: true,
        },
      ],
      interviewTips: [
        'Intersection Observer is more efficient than scroll event listeners for lazy loading',
        'Use rootMargin to start loading before elements are visible (better UX)',
        'Third-party scripts can significantly impact performance - load them lazily',
        'requestIdleCallback loads scripts when the browser is idle',
        'Preconnect hints help establish connections to third-party origins early',
        'Native lazy loading attribute (loading="lazy") works for images and iframes',
      ],
    },
    {
      id: 223,
      title: 'Change Detection Optimization',
      content: `
        <h2>Angular Change Detection</h2>
        <p>Angular's change detection system checks components for data changes and updates the DOM accordingly. Understanding and optimizing change detection is crucial for performance.</p>

        <h3>Change Detection Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Behavior</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Default</td>
            <td>Check component on any event</td>
            <td>Simple components, forms</td>
          </tr>
          <tr>
            <td>OnPush</td>
            <td>Check only when inputs change</td>
            <td>Presentational components, lists</td>
          </tr>
        </table>

        <h3>OnPush Triggers</h3>
        <p>With OnPush, change detection runs when:</p>
        <ul>
          <li>@Input() reference changes (not mutations)</li>
          <li>Event handler fires in the component</li>
          <li>Async pipe receives new value</li>
          <li>markForCheck() or detectChanges() called manually</li>
        </ul>

        <h3>Zone.js and NgZone</h3>
        <p>Zone.js patches async APIs to trigger change detection. Use NgZone.runOutsideAngular() for operations that don't need to update the view:</p>
        <ul>
          <li>Polling operations</li>
          <li>Performance monitoring</li>
          <li>Canvas/WebGL rendering</li>
          <li>RequestAnimationFrame loops</li>
        </ul>

        <h3>TrackBy Function</h3>
        <p>TrackBy helps Angular identify items in *ngFor, preventing unnecessary DOM operations when items are reordered or updated.</p>
      `,
      codeSnippets: [
        {
          id: 8,
          language: 'typescript',
          title: 'OnPush Change Detection Strategy',
          code: `// src/app/components/optimized-list/optimized-list.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ListItem {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
}

@Component({
  selector: 'app-optimized-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // Key optimization
  template: \`
    <ion-list>
      <ion-item *ngFor="let item of items; trackBy: trackById">
        <ion-label>
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <p>Render count: {{ renderCount }}</p>
  \`
})
export class OptimizedListComponent implements OnInit, OnDestroy {
  @Input() items: ListItem[] = [];

  renderCount = 0;
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Component will only re-render when items INPUT reference changes
    // Or when we manually trigger change detection
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TrackBy function for efficient list rendering
  trackById(index: number, item: ListItem): number {
    return item.id;
  }

  // Call this when you need to force update (rarely needed with OnPush)
  forceUpdate(): void {
    this.cdr.markForCheck();
  }

  // For debugging - counts how many times template is evaluated
  get renderCountDebug(): number {
    return ++this.renderCount;
  }
}

// Parent component example - CORRECT way to update OnPush child
@Component({
  selector: 'app-parent',
  template: \`
    <app-optimized-list [items]="items"></app-optimized-list>
    <ion-button (click)="addItem()">Add Item</ion-button>
    <ion-button (click)="wrongUpdate()">Wrong Update (mutation)</ion-button>
  \`
})
export class ParentComponent {
  items: ListItem[] = [];

  // CORRECT: Create new array reference
  addItem(): void {
    const newItem: ListItem = {
      id: Date.now(),
      title: 'New Item',
      description: 'Description',
      updatedAt: new Date()
    };
    // Create new array - triggers OnPush change detection
    this.items = [...this.items, newItem];
  }

  // WRONG: Mutating array won't trigger OnPush
  wrongUpdate(): void {
    this.items.push({
      id: Date.now(),
      title: 'Wont Show',
      description: 'This item wont appear with OnPush',
      updatedAt: new Date()
    });
    // Child component won't update because array reference is same!
  }
}`,
          description: 'Component using OnPush change detection with proper immutable updates',
          copyable: true,
        },
        {
          id: 9,
          language: 'typescript',
          title: 'NgZone Optimization',
          code: `// src/app/services/animation/animation.service.ts
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationFrameId: number | null = null;

  constructor(private ngZone: NgZone) {}

  /**
   * Run animation loop outside Angular zone
   * Prevents change detection on every frame (60fps = 60 checks/sec!)
   */
  startAnimation(callback: (timestamp: number) => boolean): void {
    // Run outside Angular to avoid triggering change detection
    this.ngZone.runOutsideAngular(() => {
      const animate = (timestamp: number) => {
        const shouldContinue = callback(timestamp);
        if (shouldContinue) {
          this.animationFrameId = requestAnimationFrame(animate);
        }
      };
      this.animationFrameId = requestAnimationFrame(animate);
    });
  }

  /**
   * Stop animation loop
   */
  stopAnimation(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Run code inside Angular zone (when you need to update the view)
   */
  updateView(callback: () => void): void {
    this.ngZone.run(callback);
  }
}

// Example: Polling service that doesn't trigger change detection
@Injectable({
  providedIn: 'root'
})
export class PollingService {
  private pollingInterval: any;

  constructor(private ngZone: NgZone) {}

  /**
   * Start polling without triggering change detection
   */
  startPolling(
    url: string,
    intervalMs: number,
    onData: (data: any) => void
  ): void {
    this.ngZone.runOutsideAngular(() => {
      this.pollingInterval = setInterval(async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          // Only enter Angular zone when we have data to display
          this.ngZone.run(() => onData(data));
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, intervalMs);
    });
  }

  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

// Component using NgZone optimization
@Component({
  selector: 'app-canvas-animation',
  template: \`<canvas #canvas width="800" height="600"></canvas>\`
})
export class CanvasAnimationComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.initParticles();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.animationService.stopAnimation();
  }

  private startAnimation(): void {
    this.animationService.startAnimation((timestamp) => {
      this.update(timestamp);
      this.render();
      return true; // Continue animation
    });
  }

  private update(timestamp: number): void {
    // Update particle positions
    this.particles.forEach(p => p.update(timestamp));
  }

  private render(): void {
    this.ctx.clearRect(0, 0, 800, 600);
    this.particles.forEach(p => p.render(this.ctx));
  }
}`,
          description: 'Using NgZone.runOutsideAngular for performance-critical operations',
          copyable: true,
        },
        {
          id: 10,
          language: 'typescript',
          title: 'Pure Pipes vs Impure Pipes',
          code: `// src/app/pipes/filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

// PURE PIPE - Only recalculates when input reference changes
// Default behavior, highly optimized
@Pipe({
  name: 'filterPure',
  standalone: true,
  pure: true // Default
})
export class FilterPurePipe implements PipeTransform {
  private callCount = 0;

  transform<T>(items: T[], filterFn: (item: T) => boolean): T[] {
    console.log(\`Pure pipe called: \${++this.callCount} times\`);
    if (!items || !filterFn) return items;
    return items.filter(filterFn);
  }
}

// IMPURE PIPE - Recalculates on EVERY change detection cycle
// Use sparingly! Can cause performance issues
@Pipe({
  name: 'filterImpure',
  standalone: true,
  pure: false // Impure - runs on every CD cycle
})
export class FilterImpurePipe implements PipeTransform {
  private callCount = 0;

  transform<T>(items: T[], filterFn: (item: T) => boolean): T[] {
    console.log(\`Impure pipe called: \${++this.callCount} times\`);
    if (!items || !filterFn) return items;
    return items.filter(filterFn);
  }
}

// MEMOIZED PIPE - Best of both worlds
// Pure pipe with internal caching for complex calculations
@Pipe({
  name: 'filterMemoized',
  standalone: true,
  pure: true
})
export class FilterMemoizedPipe implements PipeTransform {
  private cache = new Map<string, any[]>();

  transform<T>(items: T[], field: keyof T, searchTerm: string): T[] {
    if (!items || !searchTerm) return items;

    const cacheKey = \`\${JSON.stringify(items.map(i => i[field]))}-\${searchTerm}\`;

    if (this.cache.has(cacheKey)) {
      console.log('Cache hit!');
      return this.cache.get(cacheKey)!;
    }

    console.log('Computing filter...');
    const result = items.filter(item =>
      String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Limit cache size
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(cacheKey, result);
    return result;
  }
}

// Usage comparison
@Component({
  template: \`
    <!-- Pure pipe - only recalculates when items reference changes -->
    <div *ngFor="let item of items | filterPure:isActive">
      {{ item.name }}
    </div>

    <!-- Impure pipe - recalculates constantly (AVOID) -->
    <div *ngFor="let item of items | filterImpure:isActive">
      {{ item.name }}
    </div>

    <!-- Better approach: Filter in component with OnPush -->
    <div *ngFor="let item of filteredItems">
      {{ item.name }}
    </div>
  \`
})
export class PipeComparisonComponent {
  items: any[] = [];
  filteredItems: any[] = [];

  isActive = (item: any) => item.active;

  // Better: Compute filtered list once when data changes
  updateFilter(): void {
    this.filteredItems = this.items.filter(this.isActive);
  }
}`,
          description: 'Comparison of pure, impure, and memoized pipes with performance implications',
          copyable: true,
        },
      ],
      interviewTips: [
        'OnPush reduces change detection cycles dramatically - use for presentational components',
        'OnPush only checks when @Input reference changes, not when object properties mutate',
        'Always use immutable patterns (spread operator) with OnPush components',
        'TrackBy prevents DOM recreation when list items are reordered',
        'NgZone.runOutsideAngular prevents CD for operations that dont update the view',
        'Pure pipes are memoized and only recalculate when input reference changes',
        'Impure pipes run on every CD cycle - avoid them or use with OnPush',
      ],
    },
    {
      id: 224,
      title: 'Memory Management & Leak Prevention',
      content: `
        <h2>Memory Leak Patterns in Angular</h2>
        <p>Memory leaks occur when objects are no longer needed but cannot be garbage collected. In Angular, common causes include unsubscribed observables, event listeners, and circular references.</p>

        <h3>Common Memory Leak Patterns</h3>
        <ul>
          <li><strong>Unsubscribed Observables:</strong> Subscriptions that outlive components</li>
          <li><strong>Event Listeners:</strong> DOM listeners not removed on destroy</li>
          <li><strong>Closures:</strong> Functions holding references to large objects</li>
          <li><strong>Detached DOM:</strong> References to removed DOM elements</li>
          <li><strong>Timers:</strong> setInterval/setTimeout not cleared</li>
        </ul>

        <h3>Subscription Cleanup Patterns</h3>
        <table>
          <tr>
            <th>Pattern</th>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
          <tr>
            <td>takeUntilDestroyed()</td>
            <td>Cleanest, automatic</td>
            <td>Requires inject()</td>
          </tr>
          <tr>
            <td>Subject + takeUntil</td>
            <td>Works everywhere</td>
            <td>Boilerplate code</td>
          </tr>
          <tr>
            <td>Async Pipe</td>
            <td>Auto unsubscribe</td>
            <td>Template-only</td>
          </tr>
          <tr>
            <td>Subscription array</td>
            <td>Simple</td>
            <td>Manual management</td>
          </tr>
        </table>

        <h3>Memory Profiling Tools</h3>
        <ul>
          <li>Chrome DevTools Memory tab</li>
          <li>Heap snapshots comparison</li>
          <li>Allocation timeline</li>
          <li>Performance monitor</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 11,
          language: 'typescript',
          title: 'Subscription Cleanup Patterns',
          code: `// src/app/components/subscription-demo/subscription-demo.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  DestroyRef,
  inject
} from '@angular/core';
import { Subject, Subscription, interval, fromEvent } from 'rxjs';
import { takeUntil, takeUntilDestroyed } from 'rxjs/operators';

// Pattern 1: takeUntilDestroyed() - RECOMMENDED (Angular 16+)
@Component({
  selector: 'app-modern-cleanup',
  template: \`<p>Count: {{ count }}</p>\`
})
export class ModernCleanupComponent implements OnInit {
  count = 0;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Automatically unsubscribes when component is destroyed
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(n => {
      this.count = n;
    });
  }
}

// Pattern 2: Subject + takeUntil - Classic pattern
@Component({
  selector: 'app-classic-cleanup',
  template: \`<p>Count: {{ count }}</p>\`
})
export class ClassicCleanupComponent implements OnInit, OnDestroy {
  count = 0;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(n => {
      this.count = n;
    });

    // Multiple subscriptions all cleaned up by same subject
    fromEvent(window, 'resize').pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      console.log('Window resized');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Pattern 3: Subscription array
@Component({
  selector: 'app-array-cleanup',
  template: \`<p>Count: {{ count }}</p>\`
})
export class ArrayCleanupComponent implements OnInit, OnDestroy {
  count = 0;
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      interval(1000).subscribe(n => this.count = n)
    );

    this.subscriptions.push(
      fromEvent(window, 'scroll').subscribe(() => {
        console.log('Scrolled');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

// Pattern 4: Async pipe in template - Best for display-only
@Component({
  selector: 'app-async-pipe',
  template: \`
    <!-- Async pipe automatically subscribes and unsubscribes -->
    <p>Count: {{ count$ | async }}</p>

    <ion-list>
      <ion-item *ngFor="let item of items$ | async">
        {{ item.name }}
      </ion-item>
    </ion-list>
  \`
})
export class AsyncPipeComponent {
  count$ = interval(1000);
  items$ = this.dataService.getItems();

  constructor(private dataService: DataService) {}
}

// Anti-pattern: Memory leak example
@Component({
  selector: 'app-leaky',
  template: \`<p>LEAKY: {{ count }}</p>\`
})
export class LeakyComponent implements OnInit {
  count = 0;

  ngOnInit(): void {
    // BUG: This subscription is never cleaned up!
    // It will keep running even after component is destroyed
    interval(1000).subscribe(n => {
      this.count = n;
      console.log('Still running after destroy!');
    });
  }
  // Missing ngOnDestroy - MEMORY LEAK!
}`,
          description: 'Various patterns for properly cleaning up subscriptions to prevent memory leaks',
          copyable: true,
        },
        {
          id: 12,
          language: 'typescript',
          title: 'MemoryLeakDetectorService',
          code: `// src/app/services/debug/memory-leak-detector.service.ts
import { Injectable, NgZone } from '@angular/core';

interface LeakReport {
  timestamp: number;
  heapUsed: number;
  heapTotal: number;
  detachedNodes: number;
  eventListeners: number;
  warnings: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MemoryLeakDetectorService {
  private snapshots: LeakReport[] = [];
  private monitoringInterval: any;

  constructor(private ngZone: NgZone) {}

  /**
   * Start monitoring memory usage
   */
  startMonitoring(intervalMs = 5000): void {
    this.ngZone.runOutsideAngular(() => {
      this.monitoringInterval = setInterval(() => {
        this.takeSnapshot();
      }, intervalMs);
    });
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  /**
   * Take a memory snapshot
   */
  takeSnapshot(): LeakReport {
    const warnings: string[] = [];

    // Get memory info (Chrome only)
    const memory = (performance as any).memory;
    const heapUsed = memory?.usedJSHeapSize || 0;
    const heapTotal = memory?.totalJSHeapSize || 0;

    // Count detached DOM nodes (approximate)
    const detachedNodes = this.countDetachedNodes();
    if (detachedNodes > 100) {
      warnings.push(\`High detached node count: \${detachedNodes}\`);
    }

    // Count event listeners
    const eventListeners = this.countEventListeners();
    if (eventListeners > 500) {
      warnings.push(\`High event listener count: \${eventListeners}\`);
    }

    // Check for memory growth
    if (this.snapshots.length > 0) {
      const lastSnapshot = this.snapshots[this.snapshots.length - 1];
      const heapGrowth = heapUsed - lastSnapshot.heapUsed;
      const growthPercent = (heapGrowth / lastSnapshot.heapUsed) * 100;

      if (growthPercent > 10) {
        warnings.push(\`Memory grew by \${growthPercent.toFixed(1)}%\`);
      }
    }

    const report: LeakReport = {
      timestamp: Date.now(),
      heapUsed,
      heapTotal,
      detachedNodes,
      eventListeners,
      warnings
    };

    this.snapshots.push(report);

    // Keep only last 100 snapshots
    if (this.snapshots.length > 100) {
      this.snapshots.shift();
    }

    // Log warnings
    if (warnings.length > 0) {
      console.warn('[MemoryLeakDetector]', warnings.join(', '));
    }

    return report;
  }

  /**
   * Approximate count of detached DOM nodes
   */
  private countDetachedNodes(): number {
    // This is a simplified approximation
    // Real detection requires heap snapshots
    const allElements = document.querySelectorAll('*');
    let detachedCount = 0;

    allElements.forEach(el => {
      if (!document.body.contains(el)) {
        detachedCount++;
      }
    });

    return detachedCount;
  }

  /**
   * Count event listeners (Chrome only)
   */
  private countEventListeners(): number {
    // Use getEventListeners in DevTools or approximate
    let count = 0;

    // Count common elements with potential listeners
    const interactiveElements = document.querySelectorAll(
      'button, a, input, [onclick], [onchange]'
    );
    count += interactiveElements.length;

    return count;
  }

  /**
   * Get memory trend analysis
   */
  analyzetrend(): {
    trend: 'stable' | 'growing' | 'shrinking';
    averageGrowth: number;
    recommendations: string[];
  } {
    if (this.snapshots.length < 5) {
      return {
        trend: 'stable',
        averageGrowth: 0,
        recommendations: ['Need more data points']
      };
    }

    const recent = this.snapshots.slice(-10);
    const growthRates: number[] = [];

    for (let i = 1; i < recent.length; i++) {
      const growth = recent[i].heapUsed - recent[i - 1].heapUsed;
      growthRates.push(growth);
    }

    const averageGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;
    const recommendations: string[] = [];

    let trend: 'stable' | 'growing' | 'shrinking';
    if (averageGrowth > 100000) {
      trend = 'growing';
      recommendations.push('Check for unsubscribed observables');
      recommendations.push('Look for event listener leaks');
      recommendations.push('Review detached DOM references');
    } else if (averageGrowth < -50000) {
      trend = 'shrinking';
    } else {
      trend = 'stable';
    }

    return { trend, averageGrowth, recommendations };
  }

  /**
   * Force garbage collection (DevTools must be open)
   */
  forceGC(): void {
    if ((window as any).gc) {
      (window as any).gc();
      console.log('[MemoryLeakDetector] Forced GC');
    } else {
      console.warn('GC not available. Run Chrome with --expose-gc flag');
    }
  }

  /**
   * Get all snapshots
   */
  getSnapshots(): LeakReport[] {
    return [...this.snapshots];
  }
}`,
          description: 'Development service for detecting and monitoring memory leaks',
          copyable: true,
        },
      ],
      interviewTips: [
        'takeUntilDestroyed() is the modern way to handle subscriptions in Angular 16+',
        'Async pipe is the safest approach - automatically subscribes and unsubscribes',
        'Always clean up in ngOnDestroy: subscriptions, event listeners, timers',
        'Use Chrome DevTools Memory tab to take heap snapshots and compare',
        'Detached DOM nodes are a common source of memory leaks',
        'Closures can prevent garbage collection if they reference large objects',
      ],
    },
    {
      id: 225,
      title: 'Image & Media Optimization',
      content: `
        <h2>Optimizing Images and Media</h2>
        <p>Images typically account for 50-70% of page weight. Proper optimization can dramatically improve load times and Core Web Vitals.</p>

        <h3>Image Format Comparison</h3>
        <table>
          <tr>
            <th>Format</th>
            <th>Best For</th>
            <th>Compression</th>
            <th>Support</th>
          </tr>
          <tr>
            <td>WebP</td>
            <td>Photos, graphics</td>
            <td>25-35% smaller than JPEG</td>
            <td>97%</td>
          </tr>
          <tr>
            <td>AVIF</td>
            <td>Photos</td>
            <td>50% smaller than JPEG</td>
            <td>85%</td>
          </tr>
          <tr>
            <td>JPEG</td>
            <td>Photos (fallback)</td>
            <td>Good</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>PNG</td>
            <td>Transparency, icons</td>
            <td>Lossless</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>SVG</td>
            <td>Icons, logos</td>
            <td>Vector (scalable)</td>
            <td>100%</td>
          </tr>
        </table>

        <h3>Responsive Images Best Practices</h3>
        <ul>
          <li>Use srcset for different resolutions</li>
          <li>Use sizes attribute to hint layout width</li>
          <li>Serve appropriately sized images (dont scale down large images)</li>
          <li>Use image CDNs for automatic optimization</li>
        </ul>

        <h3>Optimization Targets</h3>
        <ul>
          <li><strong>Hero images:</strong> &lt; 200KB, LCP optimized</li>
          <li><strong>Thumbnails:</strong> &lt; 20KB each</li>
          <li><strong>Icons:</strong> Use SVG sprites or icon fonts</li>
          <li><strong>Background images:</strong> Consider CSS gradients</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 13,
          language: 'typescript',
          title: 'ImageOptimizationService',
          code: `// src/app/services/image/image-optimization.service.ts
import { Injectable } from '@angular/core';

export interface OptimizedImageSrc {
  src: string;
  srcset: string;
  sizes: string;
  webpSrcset?: string;
  avifSrcset?: string;
}

export interface ImageConfig {
  baseUrl: string;
  widths: number[];
  quality: number;
  format: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private readonly CDN_URL = 'https://images.yourcdn.com';

  private readonly DEFAULT_WIDTHS = [320, 480, 768, 1024, 1280, 1920];
  private readonly DEFAULT_QUALITY = 80;

  /**
   * Generate optimized image sources for responsive images
   */
  getOptimizedSrc(
    imagePath: string,
    config: Partial<ImageConfig> = {}
  ): OptimizedImageSrc {
    const widths = config.widths || this.DEFAULT_WIDTHS;
    const quality = config.quality || this.DEFAULT_QUALITY;

    // Generate srcset for different widths
    const srcset = widths
      .map(w => \`\${this.buildUrl(imagePath, w, quality, 'auto')} \${w}w\`)
      .join(', ');

    // WebP srcset
    const webpSrcset = widths
      .map(w => \`\${this.buildUrl(imagePath, w, quality, 'webp')} \${w}w\`)
      .join(', ');

    // AVIF srcset (best compression)
    const avifSrcset = widths
      .map(w => \`\${this.buildUrl(imagePath, w, quality, 'avif')} \${w}w\`)
      .join(', ');

    return {
      src: this.buildUrl(imagePath, widths[2], quality, 'auto'),
      srcset,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      webpSrcset,
      avifSrcset
    };
  }

  /**
   * Build CDN URL with transformations
   */
  private buildUrl(
    path: string,
    width: number,
    quality: number,
    format: string
  ): string {
    // Example using Cloudinary-style URL structure
    // Adjust based on your CDN provider
    return \`\${this.CDN_URL}/w_\${width},q_\${quality},f_\${format}/\${path}\`;
  }

  /**
   * Generate blur placeholder (LQIP - Low Quality Image Placeholder)
   */
  getPlaceholder(imagePath: string): string {
    return this.buildUrl(imagePath, 20, 30, 'auto');
  }

  /**
   * Preload critical images
   */
  preloadImage(imagePath: string, width = 1200): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = this.buildUrl(imagePath, width, this.DEFAULT_QUALITY, 'auto');
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
  }

  /**
   * Calculate aspect ratio padding for CLS prevention
   */
  getAspectRatioPadding(width: number, height: number): string {
    return \`\${(height / width) * 100}%\`;
  }
}`,
          description: 'Service for generating optimized responsive image sources with CDN integration',
          copyable: true,
        },
        {
          id: 14,
          language: 'typescript',
          title: 'Responsive Image Component',
          code: `// src/app/components/optimized-image/optimized-image.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { ImageOptimizationService, OptimizedImageSrc } from '@services/image-optimization.service';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- Aspect ratio container prevents CLS -->
    <div
      class="image-container"
      [style.paddingBottom]="aspectRatioPadding"
    >
      <!-- Blur placeholder for perceived performance -->
      <img
        *ngIf="showPlaceholder && !isLoaded"
        [src]="placeholderSrc"
        class="placeholder"
        aria-hidden="true"
      />

      <!-- Modern format with fallbacks -->
      <picture>
        <!-- AVIF (best compression) -->
        <source
          *ngIf="imageSrc?.avifSrcset"
          type="image/avif"
          [srcset]="imageSrc.avifSrcset"
          [sizes]="imageSrc.sizes"
        />

        <!-- WebP (good compression, wide support) -->
        <source
          *ngIf="imageSrc?.webpSrcset"
          type="image/webp"
          [srcset]="imageSrc.webpSrcset"
          [sizes]="imageSrc.sizes"
        />

        <!-- Fallback for older browsers -->
        <img
          [src]="imageSrc?.src"
          [srcset]="imageSrc?.srcset"
          [sizes]="imageSrc?.sizes"
          [alt]="alt"
          [loading]="loading"
          [decoding]="decoding"
          [fetchpriority]="priority"
          (load)="onLoad()"
          (error)="onError()"
          [class.loaded]="isLoaded"
        />
      </picture>
    </div>
  \`,
  styles: [\`
    .image-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: #f0f0f0;
    }

    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(20px);
      transform: scale(1.1);
    }

    picture img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    picture img.loaded {
      opacity: 1;
    }
  \`]
})
export class OptimizedImageComponent implements OnInit {
  @Input({ required: true }) src!: string;
  @Input() alt = '';
  @Input() width = 800;
  @Input() height = 600;
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() decoding: 'async' | 'sync' | 'auto' = 'async';
  @Input() priority: 'high' | 'low' | 'auto' = 'auto';
  @Input() showPlaceholder = true;

  imageSrc: OptimizedImageSrc | null = null;
  placeholderSrc = '';
  aspectRatioPadding = '56.25%'; // 16:9 default
  isLoaded = false;

  constructor(private imageService: ImageOptimizationService) {}

  ngOnInit(): void {
    this.imageSrc = this.imageService.getOptimizedSrc(this.src);
    this.placeholderSrc = this.imageService.getPlaceholder(this.src);
    this.aspectRatioPadding = this.imageService.getAspectRatioPadding(
      this.width,
      this.height
    );

    // Preload high priority images
    if (this.priority === 'high') {
      this.imageService.preloadImage(this.src);
    }
  }

  onLoad(): void {
    this.isLoaded = true;
  }

  onError(): void {
    console.error(\`Failed to load image: \${this.src}\`);
    // Could set fallback image here
  }
}`,
          description: 'Complete optimized image component with modern formats, lazy loading, and CLS prevention',
          copyable: true,
        },
      ],
      interviewTips: [
        'WebP provides 25-35% smaller files than JPEG with same quality',
        'AVIF offers 50% savings but has limited browser support - always provide fallbacks',
        'Use srcset and sizes attributes for truly responsive images',
        'Setting explicit width/height prevents Cumulative Layout Shift (CLS)',
        'Image CDNs like Cloudinary or imgix can transform images on-the-fly',
        'loading="lazy" is native browser lazy loading - no JS needed',
      ],
    },
    {
      id: 226,
      title: 'Network Optimization',
      content: `
        <h2>Network Performance Optimization</h2>
        <p>Optimizing network requests reduces latency and improves perceived performance. This includes caching, compression, and connection management.</p>

        <h3>HTTP Caching Headers</h3>
        <table>
          <tr>
            <th>Header</th>
            <th>Purpose</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Cache-Control</td>
            <td>Caching directives</td>
            <td>max-age=31536000, immutable</td>
          </tr>
          <tr>
            <td>ETag</td>
            <td>Resource version</td>
            <td>"33a64df551425fcc55e"</td>
          </tr>
          <tr>
            <td>Last-Modified</td>
            <td>Last change time</td>
            <td>Tue, 15 Nov 2024 12:45:26 GMT</td>
          </tr>
        </table>

        <h3>Resource Hints</h3>
        <ul>
          <li><strong>preconnect:</strong> Establish early connection to origin</li>
          <li><strong>prefetch:</strong> Fetch resources for future navigation</li>
          <li><strong>preload:</strong> Fetch critical resources for current page</li>
          <li><strong>dns-prefetch:</strong> Resolve DNS for external domain</li>
        </ul>

        <h3>HTTP/2 and HTTP/3 Benefits</h3>
        <ul>
          <li>Multiplexing: Multiple requests over single connection</li>
          <li>Header compression: Reduced overhead</li>
          <li>Server push: Proactively send resources</li>
          <li>HTTP/3 (QUIC): Faster connection establishment</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 15,
          language: 'typescript',
          title: 'HTTP Cache Interceptor',
          code: `// src/app/interceptors/cache.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

interface CacheEntry {
  response: HttpResponse<any>;
  timestamp: number;
  expiresAt: number;
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, CacheEntry>();
  private inFlightRequests = new Map<string, Observable<HttpEvent<any>>>();

  // Default TTL: 5 minutes
  private readonly DEFAULT_TTL = 5 * 60 * 1000;

  // Cacheable URL patterns
  private readonly CACHEABLE_PATTERNS = [
    /\\/api\\/chapters/,
    /\\/api\\/config/,
    /\\/api\\/static/
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check if URL is cacheable
    if (!this.isCacheable(req.url)) {
      return next.handle(req);
    }

    const cacheKey = this.getCacheKey(req);

    // Check for valid cached response
    const cachedEntry = this.cache.get(cacheKey);
    if (cachedEntry && !this.isExpired(cachedEntry)) {
      console.log(\`[Cache] HIT: \${req.url}\`);
      return of(cachedEntry.response.clone());
    }

    // Check for in-flight request (prevent duplicate requests)
    if (this.inFlightRequests.has(cacheKey)) {
      console.log(\`[Cache] In-flight: \${req.url}\`);
      return this.inFlightRequests.get(cacheKey)!;
    }

    // Make the request and cache the response
    console.log(\`[Cache] MISS: \${req.url}\`);
    const request$ = next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheResponse(cacheKey, event, req);
        }
      }),
      shareReplay(1)
    );

    this.inFlightRequests.set(cacheKey, request$);

    return request$;
  }

  private isCacheable(url: string): boolean {
    return this.CACHEABLE_PATTERNS.some(pattern => pattern.test(url));
  }

  private getCacheKey(req: HttpRequest<any>): string {
    // Include query params in cache key
    return req.urlWithParams;
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.expiresAt;
  }

  private cacheResponse(
    key: string,
    response: HttpResponse<any>,
    req: HttpRequest<any>
  ): void {
    // Parse Cache-Control header if present
    const ttl = this.parseCacheControl(response.headers.get('Cache-Control'));

    const entry: CacheEntry = {
      response: response.clone(),
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl
    };

    this.cache.set(key, entry);
    this.inFlightRequests.delete(key);

    // Clean up old entries periodically
    this.cleanupCache();
  }

  private parseCacheControl(header: string | null): number {
    if (!header) return this.DEFAULT_TTL;

    const maxAgeMatch = header.match(/max-age=(\\d+)/);
    if (maxAgeMatch) {
      return parseInt(maxAgeMatch[1], 10) * 1000;
    }

    return this.DEFAULT_TTL;
  }

  private cleanupCache(): void {
    const now = Date.now();
    this.cache.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    });
  }

  /**
   * Manually invalidate cache for a URL pattern
   */
  invalidate(pattern: RegExp): void {
    this.cache.forEach((_, key) => {
      if (pattern.test(key)) {
        this.cache.delete(key);
      }
    });
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear();
    this.inFlightRequests.clear();
  }
}`,
          description: 'HTTP interceptor for intelligent caching with TTL and deduplication',
          copyable: true,
        },
        {
          id: 16,
          language: 'typescript',
          title: 'API Optimization with Debouncing and Batching',
          code: `// src/app/services/api/optimized-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Subject,
  Observable,
  BehaviorSubject,
  merge
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  bufferTime,
  filter,
  map,
  shareReplay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptimizedApiService {
  private readonly API_URL = '/api';

  // Debounced search
  private searchSubject = new Subject<string>();
  public searchResults$: Observable<any[]>;

  // Request batching
  private batchQueue = new Subject<{ id: string; resolve: (data: any) => void }>();

  constructor(private http: HttpClient) {
    this.initSearch();
    this.initBatching();
  }

  /**
   * Initialize debounced search
   */
  private initSearch(): void {
    this.searchResults$ = this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after last keystroke
      distinctUntilChanged(), // Only if value changed
      filter(term => term.length >= 2), // Minimum 2 characters
      switchMap(term => this.http.get<any[]>(
        \`\${this.API_URL}/search?q=\${encodeURIComponent(term)}\`
      )),
      shareReplay(1)
    );
  }

  /**
   * Trigger search (debounced)
   */
  search(term: string): void {
    this.searchSubject.next(term);
  }

  /**
   * Initialize request batching
   */
  private initBatching(): void {
    this.batchQueue.pipe(
      bufferTime(50), // Collect requests for 50ms
      filter(batch => batch.length > 0),
      switchMap(batch => {
        const ids = batch.map(b => b.id);
        console.log(\`[Batch] Fetching \${ids.length} items\`);

        return this.http.post<Record<string, any>>(
          \`\${this.API_URL}/batch\`,
          { ids }
        ).pipe(
          map(response => ({ batch, response }))
        );
      })
    ).subscribe(({ batch, response }) => {
      // Resolve individual promises
      batch.forEach(item => {
        item.resolve(response[item.id]);
      });
    });
  }

  /**
   * Get item by ID (batched)
   */
  getItemBatched(id: string): Promise<any> {
    return new Promise(resolve => {
      this.batchQueue.next({ id, resolve });
    });
  }

  /**
   * Prefetch data for anticipated navigation
   */
  prefetch(urls: string[]): void {
    urls.forEach(url => {
      // Use requestIdleCallback to prefetch when browser is idle
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          this.http.get(url).subscribe({
            next: () => console.log(\`[Prefetch] Loaded: \${url}\`),
            error: () => {} // Silently fail prefetch
          });
        });
      }
    });
  }

  /**
   * Stale-while-revalidate pattern
   */
  getWithSWR<T>(
    url: string,
    cacheKey: string
  ): Observable<T> {
    const cache$ = new BehaviorSubject<T | null>(this.getFromLocalCache(cacheKey));

    // Return cached data immediately
    const cached$ = cache$.pipe(filter(data => data !== null)) as Observable<T>;

    // Fetch fresh data in background
    const fresh$ = this.http.get<T>(url).pipe(
      tap(data => {
        this.saveToLocalCache(cacheKey, data);
        cache$.next(data);
      })
    );

    // Merge: cached first, then fresh
    return merge(cached$, fresh$);
  }

  private getFromLocalCache(key: string): any {
    try {
      const cached = localStorage.getItem(\`cache_\${key}\`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private saveToLocalCache(key: string, data: any): void {
    try {
      localStorage.setItem(\`cache_\${key}\`, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to cache:', e);
    }
  }
}`,
          description: 'Optimized API service with debouncing, batching, and stale-while-revalidate patterns',
          copyable: true,
        },
      ],
      interviewTips: [
        'Cache-Control: immutable tells browsers the resource will never change',
        'ETag allows conditional requests - 304 Not Modified saves bandwidth',
        'preconnect should be used for origins you will definitely use',
        'Debouncing search prevents excessive API calls during typing',
        'Request batching combines multiple requests into one, reducing overhead',
        'Stale-while-revalidate shows cached data immediately while fetching fresh data',
      ],
    },
    {
      id: 227,
      title: 'Runtime Performance & Virtual Scrolling',
      content: `
        <h2>Runtime Performance Optimization</h2>
        <p>Runtime performance affects how responsive your app feels during interaction. Key areas include rendering large lists, heavy computations, and smooth animations.</p>

        <h3>Virtual Scrolling Benefits</h3>
        <ul>
          <li>Only renders visible items (DOM size stays constant)</li>
          <li>Handles lists of 100,000+ items smoothly</li>
          <li>Reduces memory usage significantly</li>
          <li>Maintains 60fps scrolling</li>
        </ul>

        <h3>Web Workers Use Cases</h3>
        <ul>
          <li>Heavy data processing</li>
          <li>Image manipulation</li>
          <li>Complex calculations</li>
          <li>Data parsing (CSV, JSON)</li>
          <li>Encryption/decryption</li>
        </ul>

        <h3>CSS Performance</h3>
        <ul>
          <li><strong>contain:</strong> Isolate element from rest of page</li>
          <li><strong>will-change:</strong> Hint upcoming changes to browser</li>
          <li><strong>transform/opacity:</strong> GPU-accelerated properties</li>
          <li>Avoid: layout thrashing, forced reflows</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 17,
          language: 'typescript',
          title: 'Virtual Scrolling with CDK',
          code: `// src/app/components/virtual-list/virtual-list.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  TrackByFunction
} from '@angular/core';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

interface ListItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-virtual-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <cdk-virtual-scroll-viewport
      [itemSize]="itemHeight"
      [minBufferPx]="400"
      [maxBufferPx]="800"
      class="viewport"
    >
      <div
        *cdkVirtualFor="let item of items; trackBy: trackById"
        class="item"
        [style.height.px]="itemHeight"
      >
        <img
          [src]="item.imageUrl"
          [alt]="item.title"
          loading="lazy"
          width="60"
          height="60"
        />
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </cdk-virtual-scroll-viewport>

    <div class="stats">
      Showing {{ renderedRange.start }} - {{ renderedRange.end }}
      of {{ items.length }} items
    </div>
  \`,
  styles: [\`
    .viewport {
      height: 500px;
      width: 100%;
      contain: strict; /* CSS containment for better performance */
    }

    .item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #eee;
      contain: layout style; /* Isolate item layout */
    }

    .item img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      margin-right: 12px;
    }

    .content h3 {
      margin: 0 0 4px;
    }

    .content p {
      margin: 0;
      color: #666;
    }
  \`]
})
export class VirtualListComponent {
  @Input() items: ListItem[] = [];
  @Input() itemHeight = 80;

  renderedRange = { start: 0, end: 0 };

  trackById: TrackByFunction<ListItem> = (index, item) => item.id;

  onScrolledIndexChange(index: number): void {
    console.log('Scrolled to index:', index);
  }
}

// Usage example with 100,000 items
@Component({
  template: \`
    <app-virtual-list [items]="hugeList"></app-virtual-list>
  \`
})
export class DemoPageComponent {
  hugeList: ListItem[] = [];

  ngOnInit(): void {
    // Generate 100,000 items - virtual scroll handles this easily
    this.hugeList = Array.from({ length: 100000 }, (_, i) => ({
      id: i,
      title: \`Item \${i + 1}\`,
      description: \`Description for item \${i + 1}\`,
      imageUrl: \`https://picsum.photos/60/60?random=\${i}\`
    }));
  }
}`,
          description: 'Virtual scrolling implementation using Angular CDK for handling large lists',
          copyable: true,
        },
        {
          id: 18,
          language: 'typescript',
          title: 'Web Worker for Heavy Computation',
          code: `// src/app/workers/data-processor.worker.ts
/// <reference lib="webworker" />

interface ProcessingTask {
  type: 'sort' | 'filter' | 'aggregate' | 'parse';
  data: any;
  options?: any;
}

interface ProcessingResult {
  success: boolean;
  data?: any;
  error?: string;
  duration: number;
}

addEventListener('message', ({ data }: MessageEvent<ProcessingTask>) => {
  const startTime = performance.now();

  try {
    let result: any;

    switch (data.type) {
      case 'sort':
        result = sortLargeDataset(data.data, data.options);
        break;
      case 'filter':
        result = filterLargeDataset(data.data, data.options);
        break;
      case 'aggregate':
        result = aggregateData(data.data, data.options);
        break;
      case 'parse':
        result = parseCSV(data.data);
        break;
      default:
        throw new Error(\`Unknown task type: \${data.type}\`);
    }

    const response: ProcessingResult = {
      success: true,
      data: result,
      duration: performance.now() - startTime
    };

    postMessage(response);
  } catch (error) {
    const response: ProcessingResult = {
      success: false,
      error: (error as Error).message,
      duration: performance.now() - startTime
    };
    postMessage(response);
  }
});

function sortLargeDataset(data: any[], options: { field: string; direction: 'asc' | 'desc' }): any[] {
  return [...data].sort((a, b) => {
    const valueA = a[options.field];
    const valueB = b[options.field];
    const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    return options.direction === 'asc' ? comparison : -comparison;
  });
}

function filterLargeDataset(data: any[], options: { field: string; value: any }): any[] {
  return data.filter(item => item[options.field] === options.value);
}

function aggregateData(data: any[], options: { groupBy: string; sum: string }): Record<string, number> {
  return data.reduce((acc, item) => {
    const key = item[options.groupBy];
    acc[key] = (acc[key] || 0) + item[options.sum];
    return acc;
  }, {});
}

function parseCSV(csvString: string): any[] {
  const lines = csvString.split('\\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i]?.trim();
      return obj;
    }, {} as Record<string, string>);
  });
}

// src/app/services/worker/data-processor.service.ts
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProcessorService {
  private worker: Worker | null = null;
  private pendingTasks = new Map<number, {
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }>();
  private taskId = 0;

  constructor(private ngZone: NgZone) {
    this.initWorker();
  }

  private initWorker(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('../workers/data-processor.worker', import.meta.url)
      );

      this.worker.onmessage = ({ data }) => {
        // Re-enter Angular zone when receiving results
        this.ngZone.run(() => {
          const task = this.pendingTasks.get(data.taskId);
          if (task) {
            if (data.success) {
              task.resolve(data.data);
            } else {
              task.reject(new Error(data.error));
            }
            this.pendingTasks.delete(data.taskId);
          }
        });
      };
    }
  }

  /**
   * Sort large dataset in worker thread
   */
  sortData<T>(data: T[], field: keyof T, direction: 'asc' | 'desc' = 'asc'): Promise<T[]> {
    return this.runTask({
      type: 'sort',
      data,
      options: { field, direction }
    });
  }

  /**
   * Filter large dataset in worker thread
   */
  filterData<T>(data: T[], field: keyof T, value: any): Promise<T[]> {
    return this.runTask({
      type: 'filter',
      data,
      options: { field, value }
    });
  }

  /**
   * Parse CSV in worker thread
   */
  parseCSV(csvString: string): Promise<any[]> {
    return this.runTask({
      type: 'parse',
      data: csvString
    });
  }

  private runTask(task: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        // Fallback to main thread if workers not supported
        console.warn('Web Workers not supported, running on main thread');
        resolve(task.data);
        return;
      }

      const id = ++this.taskId;
      this.pendingTasks.set(id, { resolve, reject });
      this.worker.postMessage({ ...task, taskId: id });
    });
  }

  terminate(): void {
    this.worker?.terminate();
    this.worker = null;
  }
}`,
          description: 'Web Worker implementation for offloading heavy computations from the main thread',
          copyable: true,
        },
      ],
      interviewTips: [
        'Virtual scrolling keeps DOM size constant regardless of data size',
        'CDK Virtual Scroll uses itemSize to calculate positions without rendering',
        'Web Workers run in separate threads - cannot access DOM or Angular',
        'Use CSS contain property to isolate elements and improve rendering',
        'will-change should be used sparingly - it consumes resources',
        'Avoid layout thrashing by batching DOM reads before writes',
      ],
    },
    {
      id: 228,
      title: 'Performance Monitoring & CI Integration',
      content: `
        <h2>Continuous Performance Monitoring</h2>
        <p>Monitoring performance in production helps catch regressions and understand real user experience. Combine synthetic monitoring (Lighthouse) with Real User Monitoring (RUM).</p>

        <h3>Monitoring Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Tools</th>
          </tr>
          <tr>
            <td>Synthetic</td>
            <td>Lab tests in controlled environment</td>
            <td>Lighthouse, WebPageTest</td>
          </tr>
          <tr>
            <td>RUM</td>
            <td>Real user data from production</td>
            <td>web-vitals, Datadog</td>
          </tr>
          <tr>
            <td>APM</td>
            <td>Application performance monitoring</td>
            <td>New Relic, Sentry</td>
          </tr>
        </table>

        <h3>Lighthouse CI Integration</h3>
        <p>Lighthouse CI runs performance audits in your CI/CD pipeline to catch regressions before deployment.</p>

        <h3>Performance Budgets in CI</h3>
        <ul>
          <li>Block PRs that exceed budgets</li>
          <li>Track performance trends over time</li>
          <li>Alert on significant regressions</li>
          <li>Generate performance reports</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 19,
          language: 'yaml',
          title: 'Lighthouse CI GitHub Action',
          code: `# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build production app
        run: npm run build -- --configuration=production

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Upload Lighthouse Report
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: '.lighthouseci'

# lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:4200"],
      "startServerCommand": "npx serve www -l 4200",
      "startServerReadyPattern": "Accepting connections",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }],
        "interactive": ["warn", { "maxNumericValue": 3800 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}`,
          description: 'GitHub Actions workflow for automated Lighthouse CI testing with performance budgets',
          copyable: true,
        },
        {
          id: 20,
          language: 'typescript',
          title: 'Real User Monitoring Service',
          code: `// src/app/services/monitoring/rum.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { onLCP, onFID, onCLS, onINP, onTTFB, Metric } from 'web-vitals';

interface RUMEvent {
  type: 'page_view' | 'web_vital' | 'error' | 'custom';
  timestamp: number;
  url: string;
  sessionId: string;
  data: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class RealUserMonitoringService {
  private readonly ENDPOINT = '/api/rum';
  private sessionId: string;
  private eventQueue: RUMEvent[] = [];
  private flushInterval: any;

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {
    this.sessionId = this.generateSessionId();
    this.init();
  }

  private init(): void {
    // Track page views
    this.trackPageViews();

    // Track Core Web Vitals
    this.trackWebVitals();

    // Track JavaScript errors
    this.trackErrors();

    // Flush events periodically and on page unload
    this.setupFlushMechanism();
  }

  /**
   * Track page view events
   */
  private trackPageViews(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.trackEvent({
        type: 'page_view',
        timestamp: Date.now(),
        url: event.urlAfterRedirects,
        sessionId: this.sessionId,
        data: {
          referrer: document.referrer,
          title: document.title
        }
      });
    });
  }

  /**
   * Track Core Web Vitals
   */
  private trackWebVitals(): void {
    this.ngZone.runOutsideAngular(() => {
      const sendVital = (metric: Metric) => {
        this.trackEvent({
          type: 'web_vital',
          timestamp: Date.now(),
          url: window.location.href,
          sessionId: this.sessionId,
          data: {
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType
          }
        });
      };

      onLCP(sendVital);
      onFID(sendVital);
      onCLS(sendVital);
      onINP(sendVital);
      onTTFB(sendVital);
    });
  }

  /**
   * Track JavaScript errors
   */
  private trackErrors(): void {
    window.addEventListener('error', (event) => {
      this.trackEvent({
        type: 'error',
        timestamp: Date.now(),
        url: window.location.href,
        sessionId: this.sessionId,
        data: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        }
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent({
        type: 'error',
        timestamp: Date.now(),
        url: window.location.href,
        sessionId: this.sessionId,
        data: {
          message: 'Unhandled Promise Rejection',
          reason: String(event.reason)
        }
      });
    });
  }

  /**
   * Track custom event
   */
  trackCustomEvent(name: string, data: Record<string, any>): void {
    this.trackEvent({
      type: 'custom',
      timestamp: Date.now(),
      url: window.location.href,
      sessionId: this.sessionId,
      data: { name, ...data }
    });
  }

  /**
   * Add event to queue
   */
  private trackEvent(event: RUMEvent): void {
    this.eventQueue.push(event);

    // Flush immediately if queue is large
    if (this.eventQueue.length >= 10) {
      this.flush();
    }
  }

  /**
   * Setup periodic flushing and page unload handling
   */
  private setupFlushMechanism(): void {
    // Flush every 30 seconds
    this.flushInterval = setInterval(() => this.flush(), 30000);

    // Flush on page unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });

    window.addEventListener('pagehide', () => {
      this.flush();
    });
  }

  /**
   * Send queued events to server
   */
  private flush(): void {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    // Use sendBeacon for reliability during page unload
    const payload = JSON.stringify({ events });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.ENDPOINT, payload);
    } else {
      fetch(this.ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      }).catch(err => {
        console.error('Failed to send RUM data:', err);
        // Re-queue failed events
        this.eventQueue = [...events, ...this.eventQueue];
      });
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  /**
   * Cleanup on destroy
   */
  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }
}`,
          description: 'Complete Real User Monitoring service for production performance tracking',
          copyable: true,
        },
      ],
      interviewTips: [
        'Synthetic monitoring tests in controlled conditions - good for benchmarking',
        'RUM captures real user experience - accounts for diverse devices and networks',
        'Lighthouse CI prevents performance regressions from being deployed',
        'Use sendBeacon for reliable data transmission during page unload',
        'Performance budgets should be based on business requirements and competitor analysis',
        'Track performance trends over time, not just point-in-time measurements',
      ],
    },
  ],
};
