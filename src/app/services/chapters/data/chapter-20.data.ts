// src/app/services/chapters/data/chapter-20.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_20_DATA: Chapter = {
  id: 20,
  title: 'Styling, Branding & Theming',
  description: 'Master advanced styling with Ionic theming, CSS variables, dark mode, custom branding, responsive design, and animation patterns',
  icon: 'brush-outline',
  category: 'intermediate',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 200,
      title: 'Ionic Theming System',
      content: `
        <h2>Ionic Theming with CSS Variables</h2>
        <p>Ionic uses CSS Variables (Custom Properties) for theming, which allows dynamic runtime theme changes without recompiling. This is more powerful than traditional SCSS variables which are compile-time only.</p>

        <h3>Why CSS Variables?</h3>
        <ul>
          <li><strong>Runtime Changes:</strong> Change themes dynamically without rebuilding</li>
          <li><strong>Cascade Support:</strong> Variables inherit through the DOM tree</li>
          <li><strong>JavaScript Access:</strong> Read and modify from TypeScript code</li>
          <li><strong>Shadow DOM Compatible:</strong> Penetrate Shadow DOM boundaries</li>
          <li><strong>Browser Support:</strong> Supported in all modern browsers</li>
        </ul>

        <h3>Ionic's Color System</h3>
        <table>
          <tr>
            <th>Color</th>
            <th>Purpose</th>
            <th>Example Use</th>
          </tr>
          <tr>
            <td>primary</td>
            <td>Main brand color</td>
            <td>Buttons, headers, active states</td>
          </tr>
          <tr>
            <td>secondary</td>
            <td>Secondary brand color</td>
            <td>FABs, secondary actions</td>
          </tr>
          <tr>
            <td>tertiary</td>
            <td>Tertiary accent</td>
            <td>Highlights, badges</td>
          </tr>
          <tr>
            <td>success</td>
            <td>Positive actions</td>
            <td>Confirmations, completed states</td>
          </tr>
          <tr>
            <td>warning</td>
            <td>Caution states</td>
            <td>Alerts, pending actions</td>
          </tr>
          <tr>
            <td>danger</td>
            <td>Destructive actions</td>
            <td>Delete buttons, errors</td>
          </tr>
          <tr>
            <td>light</td>
            <td>Light backgrounds</td>
            <td>Cards, modals in light mode</td>
          </tr>
          <tr>
            <td>medium</td>
            <td>Medium contrast</td>
            <td>Borders, disabled states</td>
          </tr>
          <tr>
            <td>dark</td>
            <td>Dark text/backgrounds</td>
            <td>Text, dark mode backgrounds</td>
          </tr>
        </table>

        <h3>Stepped Colors</h3>
        <p>Each color has variants for depth and hierarchy:</p>
        <ul>
          <li><strong>base:</strong> The main color value</li>
          <li><strong>shade:</strong> Darker variant (-12% lightness)</li>
          <li><strong>tint:</strong> Lighter variant (+10% lightness)</li>
          <li><strong>contrast:</strong> Contrasting text color (for accessibility)</li>
          <li><strong>contrast-rgb:</strong> RGB values for opacity effects</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'scss',
          title: 'variables.scss - Complete Ionic Theme Variables',
          code: `// src/theme/variables.scss

// ============================================
// PRIMARY BRAND COLOR
// ============================================
:root {
  --ion-color-primary: #6366f1;
  --ion-color-primary-rgb: 99, 102, 241;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #5558d4;
  --ion-color-primary-tint: #7477f2;

  --ion-color-secondary: #3dc2ff;
  --ion-color-secondary-rgb: 61, 194, 255;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #36abe0;
  --ion-color-secondary-tint: #50c8ff;

  --ion-color-tertiary: #5260ff;
  --ion-color-tertiary-rgb: 82, 96, 255;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb: 255, 255, 255;
  --ion-color-tertiary-shade: #4854e0;
  --ion-color-tertiary-tint: #6370ff;

  --ion-color-success: #2dd36f;
  --ion-color-success-rgb: 45, 211, 111;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb: 255, 255, 255;
  --ion-color-success-shade: #28ba62;
  --ion-color-success-tint: #42d77d;

  --ion-color-warning: #ffc409;
  --ion-color-warning-rgb: 255, 196, 9;
  --ion-color-warning-contrast: #000000;
  --ion-color-warning-contrast-rgb: 0, 0, 0;
  --ion-color-warning-shade: #e0ac08;
  --ion-color-warning-tint: #ffca22;

  --ion-color-danger: #eb445a;
  --ion-color-danger-rgb: 235, 68, 90;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255, 255, 255;
  --ion-color-danger-shade: #cf3c4f;
  --ion-color-danger-tint: #ed576b;

  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb: 244, 245, 248;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0, 0, 0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;

  --ion-color-medium: #92949c;
  --ion-color-medium-rgb: 146, 148, 156;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb: 255, 255, 255;
  --ion-color-medium-shade: #808289;
  --ion-color-medium-tint: #9d9fa6;

  --ion-color-dark: #222428;
  --ion-color-dark-rgb: 34, 36, 40;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255, 255, 255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;

  // Custom brand color
  --ion-color-brand: #ff6b6b;
  --ion-color-brand-rgb: 255, 107, 107;
  --ion-color-brand-contrast: #ffffff;
  --ion-color-brand-contrast-rgb: 255, 255, 255;
  --ion-color-brand-shade: #e05e5e;
  --ion-color-brand-tint: #ff7a7a;
}

// ============================================
// CUSTOM COLOR CLASS
// ============================================
.ion-color-brand {
  --ion-color-base: var(--ion-color-brand);
  --ion-color-base-rgb: var(--ion-color-brand-rgb);
  --ion-color-contrast: var(--ion-color-brand-contrast);
  --ion-color-contrast-rgb: var(--ion-color-brand-contrast-rgb);
  --ion-color-shade: var(--ion-color-brand-shade);
  --ion-color-tint: var(--ion-color-brand-tint);
}`,
          description: 'Complete Ionic theme with all default colors and custom brand color',
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Color Generator Utility',
          code: `// src/app/utils/color-generator.util.ts

/**
 * Generate Ionic color variants from a base color
 * Automatically creates shade, tint, and contrast colors
 */
export class ColorGenerator {
  /**
   * Convert hex to RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  /**
   * Convert RGB to hex
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * Generate shade (darker variant)
   */
  static generateShade(hex: string, percent: number = 12): string {
    const rgb = this.hexToRgb(hex);
    const shade = {
      r: Math.max(0, Math.floor(rgb.r * (1 - percent / 100))),
      g: Math.max(0, Math.floor(rgb.g * (1 - percent / 100))),
      b: Math.max(0, Math.floor(rgb.b * (1 - percent / 100))),
    };
    return this.rgbToHex(shade.r, shade.g, shade.b);
  }

  /**
   * Generate tint (lighter variant)
   */
  static generateTint(hex: string, percent: number = 10): string {
    const rgb = this.hexToRgb(hex);
    const tint = {
      r: Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * (percent / 100))),
      g: Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * (percent / 100))),
      b: Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * (percent / 100))),
    };
    return this.rgbToHex(tint.r, tint.g, tint.b);
  }

  /**
   * Generate contrast color (black or white for accessibility)
   */
  static generateContrast(hex: string): string {
    const rgb = this.hexToRgb(hex);
    // Calculate relative luminance (WCAG formula)
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  /**
   * Generate complete Ionic color palette
   */
  static generatePalette(baseColor: string) {
    const rgb = this.hexToRgb(baseColor);
    const shade = this.generateShade(baseColor);
    const tint = this.generateTint(baseColor);
    const contrast = this.generateContrast(baseColor);
    const contrastRgb = this.hexToRgb(contrast);

    return {
      base: baseColor,
      rgb: \`\${rgb.r}, \${rgb.g}, \${rgb.b}\`,
      contrast,
      contrastRgb: \`\${contrastRgb.r}, \${contrastRgb.g}, \${contrastRgb.b}\`,
      shade,
      tint,
    };
  }

  /**
   * Generate CSS variables string for a color
   */
  static generateCssVariables(colorName: string, baseColor: string): string {
    const palette = this.generatePalette(baseColor);
    return \`
--ion-color-\${colorName}: \${palette.base};
--ion-color-\${colorName}-rgb: \${palette.rgb};
--ion-color-\${colorName}-contrast: \${palette.contrast};
--ion-color-\${colorName}-contrast-rgb: \${palette.contrastRgb};
--ion-color-\${colorName}-shade: \${palette.shade};
--ion-color-\${colorName}-tint: \${palette.tint};
    \`.trim();
  }
}

// Usage:
// const brandPalette = ColorGenerator.generatePalette('#FF6B6B');
// const cssVars = ColorGenerator.generateCssVariables('brand', '#FF6B6B');`,
          description: 'Utility to generate Ionic color palettes from base colors',
          copyable: true,
        },
      ],
      interviewTips: [
        'CSS Variables are scoped to the DOM element and cascade down, unlike SCSS variables',
        'Ionic uses --ion-color-base internally, so custom colors need wrapper classes',
        'Stepped colors (shade/tint) should maintain WCAG contrast ratios',
        'RGB variants are for opacity effects: rgba(var(--ion-color-primary-rgb), 0.5)',
        'Use prefers-color-scheme media query for automatic dark mode detection',
      ],
    },
    {
      id: 201,
      title: 'Dark Mode Implementation',
      content: `
        <h2>Dark Mode with Theme Service</h2>
        <p>Dark mode is essential for modern apps. Users expect system-level theme detection and the ability to override it. We'll build a complete theme system with persistence, smooth transitions, and TypeScript type safety.</p>

        <h3>Dark Mode Requirements</h3>
        <ul>
          <li><strong>System Preference Detection:</strong> Respect OS dark mode setting</li>
          <li><strong>Manual Override:</strong> Allow users to choose light/dark/auto</li>
          <li><strong>Persistent Storage:</strong> Remember user's theme choice</li>
          <li><strong>Smooth Transitions:</strong> Animate theme changes</li>
          <li><strong>Component Overrides:</strong> Some components need special dark mode styles</li>
          <li><strong>Image Variants:</strong> Show different images in dark mode</li>
        </ul>

        <h3>Theme Architecture</h3>
        <p>We'll use a service-based architecture with RxJS for reactive theme management:</p>
        <ul>
          <li><strong>ThemeService:</strong> Core theme logic and state management</li>
          <li><strong>ThemeStorageService:</strong> Persist theme to device storage</li>
          <li><strong>Theme Models:</strong> TypeScript interfaces for type safety</li>
          <li><strong>Theme Directive:</strong> Apply theme classes to components</li>
        </ul>

        <h3>Color Palette Strategy</h3>
        <table>
          <tr>
            <th>Element</th>
            <th>Light Mode</th>
            <th>Dark Mode</th>
          </tr>
          <tr>
            <td>Background</td>
            <td>#ffffff</td>
            <td>#121212</td>
          </tr>
          <tr>
            <td>Surface</td>
            <td>#f5f5f5</td>
            <td>#1e1e1e</td>
          </tr>
          <tr>
            <td>Primary Text</td>
            <td>#000000</td>
            <td>#ffffff</td>
          </tr>
          <tr>
            <td>Secondary Text</td>
            <td>#666666</td>
            <td>#b3b3b3</td>
          </tr>
          <tr>
            <td>Border</td>
            <td>#e0e0e0</td>
            <td>#2c2c2c</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 3,
          language: 'typescript',
          title: 'theme.model.ts - Theme Types',
          code: `// src/app/models/theme.model.ts

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: ThemeMode;
  systemPreference: 'light' | 'dark';
  activeTheme: 'light' | 'dark';
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  success: string;
  warning: string;
  danger: string;
  light: string;
  medium: string;
  dark: string;
}

export const THEME_STORAGE_KEY = 'app-theme-preference';`,
          description: 'TypeScript models for theme system',
          copyable: true,
        },
        {
          id: 4,
          language: 'typescript',
          title: 'theme.service.ts - Complete Theme Service',
          code: `// src/app/services/theme/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ThemeMode, ThemeConfig } from '@app/models/theme.model';
import { ThemeStorageService } from './theme-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  private themeConfig$ = new BehaviorSubject<ThemeConfig>({
    mode: 'auto',
    systemPreference: this.darkModeMediaQuery.matches ? 'dark' : 'light',
    activeTheme: this.darkModeMediaQuery.matches ? 'dark' : 'light',
  });

  // Public observables
  public readonly config$: Observable<ThemeConfig> = this.themeConfig$.asObservable();
  public readonly activeTheme$: Observable<'light' | 'dark'> = this.config$.pipe(
    map(config => config.activeTheme),
    distinctUntilChanged()
  );
  public readonly isDark$: Observable<boolean> = this.activeTheme$.pipe(
    map(theme => theme === 'dark')
  );

  constructor(private storageService: ThemeStorageService) {
    this.initializeTheme();
    this.watchSystemPreference();
  }

  /**
   * Initialize theme from storage or system preference
   */
  private async initializeTheme(): Promise<void> {
    const savedMode = await this.storageService.getThemeMode();
    if (savedMode) {
      this.setTheme(savedMode);
    } else {
      // Use system preference on first launch
      this.applyTheme();
    }
  }

  /**
   * Watch for system preference changes
   */
  private watchSystemPreference(): void {
    fromEvent<MediaQueryListEvent>(this.darkModeMediaQuery, 'change')
      .pipe(map(event => event.matches ? 'dark' : 'light'))
      .subscribe((systemPreference: 'light' | 'dark') => {
        const current = this.themeConfig$.value;
        const newConfig: ThemeConfig = {
          ...current,
          systemPreference,
          activeTheme: current.mode === 'auto' ? systemPreference : current.activeTheme,
        };
        this.themeConfig$.next(newConfig);
        this.applyTheme();
      });
  }

  /**
   * Set theme mode (light, dark, or auto)
   */
  public setTheme(mode: ThemeMode): void {
    const systemPreference = this.darkModeMediaQuery.matches ? 'dark' : 'light';
    const activeTheme = mode === 'auto' ? systemPreference : mode;

    const newConfig: ThemeConfig = {
      mode,
      systemPreference,
      activeTheme,
    };

    this.themeConfig$.next(newConfig);
    this.storageService.saveThemeMode(mode);
    this.applyTheme();
  }

  /**
   * Toggle between light and dark (skips auto)
   */
  public toggleTheme(): void {
    const current = this.themeConfig$.value;
    const newMode: ThemeMode = current.activeTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newMode);
  }

  /**
   * Apply theme to DOM
   */
  private applyTheme(): void {
    const theme = this.themeConfig$.value.activeTheme;
    const body = document.body;

    // Add transition class for smooth theme change
    body.classList.add('theme-transition');

    // Toggle dark mode class
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }

    // Remove transition class after animation
    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 300);
  }

  /**
   * Get current theme mode
   */
  public getThemeMode(): ThemeMode {
    return this.themeConfig$.value.mode;
  }

  /**
   * Get current active theme
   */
  public getActiveTheme(): 'light' | 'dark' {
    return this.themeConfig$.value.activeTheme;
  }

  /**
   * Check if dark mode is active
   */
  public isDarkMode(): boolean {
    return this.getActiveTheme() === 'dark';
  }
}`,
          description: 'Complete theme service with RxJS observables and system preference detection',
          copyable: true,
        },
        {
          id: 5,
          language: 'typescript',
          title: 'theme-storage.service.ts - Theme Persistence',
          code: `// src/app/services/theme/theme-storage.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ThemeMode, THEME_STORAGE_KEY } from '@app/models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeStorageService {
  /**
   * Save theme mode to device storage
   */
  async saveThemeMode(mode: ThemeMode): Promise<void> {
    try {
      await Preferences.set({
        key: THEME_STORAGE_KEY,
        value: mode,
      });
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }

  /**
   * Get saved theme mode from storage
   */
  async getThemeMode(): Promise<ThemeMode | null> {
    try {
      const { value } = await Preferences.get({ key: THEME_STORAGE_KEY });
      return value as ThemeMode || null;
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      return null;
    }
  }

  /**
   * Clear theme preference
   */
  async clearThemeMode(): Promise<void> {
    try {
      await Preferences.remove({ key: THEME_STORAGE_KEY });
    } catch (error) {
      console.error('Failed to clear theme preference:', error);
    }
  }
}`,
          description: 'Service to persist theme preference using Capacitor Preferences',
          copyable: true,
        },
        {
          id: 6,
          language: 'scss',
          title: 'Dark Mode CSS Variables',
          code: `// src/theme/variables.scss - Dark mode overrides

// ============================================
// DARK MODE THEME
// ============================================
body.dark {
  // Background colors
  --ion-background-color: #121212;
  --ion-background-color-rgb: 18, 18, 18;

  --ion-text-color: #ffffff;
  --ion-text-color-rgb: 255, 255, 255;

  // Toolbar
  --ion-toolbar-background: #1f1f1f;
  --ion-toolbar-border-color: #2c2c2c;

  // Item backgrounds
  --ion-item-background: #1e1e1e;
  --ion-item-border-color: #2c2c2c;

  // Card
  --ion-card-background: #1e1e1e;

  // Tab bar
  --ion-tab-bar-background: #1f1f1f;
  --ion-tab-bar-border-color: #2c2c2c;

  // Stepped colors for surfaces (Material Design elevation)
  --ion-background-color-step-50: #1e1e1e;
  --ion-background-color-step-100: #2a2a2a;
  --ion-background-color-step-150: #363636;
  --ion-background-color-step-200: #414141;
  --ion-background-color-step-250: #4d4d4d;
  --ion-background-color-step-300: #595959;
  --ion-background-color-step-350: #656565;
  --ion-background-color-step-400: #717171;
  --ion-background-color-step-450: #7d7d7d;
  --ion-background-color-step-500: #898989;
  --ion-background-color-step-550: #949494;
  --ion-background-color-step-600: #a0a0a0;
  --ion-background-color-step-650: #acacac;
  --ion-background-color-step-700: #b8b8b8;
  --ion-background-color-step-750: #c4c4c4;
  --ion-background-color-step-800: #d0d0d0;
  --ion-background-color-step-850: #dbdbdb;
  --ion-background-color-step-900: #e7e7e7;
  --ion-background-color-step-950: #f3f3f3;

  // Adjust colors for better dark mode visibility
  --ion-color-primary: #7477f2;
  --ion-color-primary-shade: #6366f1;
  --ion-color-primary-tint: #8487f3;

  --ion-color-secondary: #50c8ff;
  --ion-color-secondary-shade: #3dc2ff;
  --ion-color-secondary-tint: #62ceff;

  --ion-color-success: #42d77d;
  --ion-color-success-shade: #2dd36f;
  --ion-color-success-tint: #57db8a;

  --ion-color-warning: #ffca22;
  --ion-color-warning-shade: #ffc409;
  --ion-color-warning-tint: #ffd038;

  --ion-color-danger: #ed576b;
  --ion-color-danger-shade: #eb445a;
  --ion-color-danger-tint: #ef697a;
}

// ============================================
// SMOOTH THEME TRANSITIONS
// ============================================
body.theme-transition,
body.theme-transition * {
  transition: background-color 300ms ease-in-out,
              color 300ms ease-in-out,
              border-color 300ms ease-in-out !important;
  transition-delay: 0 !important;
}`,
          description: 'Complete dark mode CSS variable overrides with smooth transitions',
          copyable: true,
        },
      ],
      interviewTips: [
        'prefers-color-scheme is a CSS media query that detects OS-level dark mode',
        'Use BehaviorSubject for theme state so late subscribers get current value',
        'Stepped colors create depth in dark mode (Material Design elevation levels)',
        'Transition class prevents flash when theme changes - add temporarily',
        'Store theme preference in Capacitor Preferences for cross-platform persistence',
      ],
    },
    {
      id: 202,
      title: 'Typography System',
      content: `
        <h2>Typography & Font Management</h2>
        <p>Typography is crucial for readability, hierarchy, and brand identity. A well-designed typography system provides consistency and makes your app feel professional.</p>

        <h3>Typography Fundamentals</h3>
        <ul>
          <li><strong>Font Family:</strong> Brand fonts (Roboto, Inter, Poppins, etc.)</li>
          <li><strong>Font Size Scale:</strong> Consistent sizing (12px, 14px, 16px, 20px, 24px, 32px, 48px)</li>
          <li><strong>Font Weight:</strong> Regular (400), Medium (500), Semi-bold (600), Bold (700)</li>
          <li><strong>Line Height:</strong> 1.5 for body text, 1.2 for headings</li>
          <li><strong>Letter Spacing:</strong> Subtle tracking for headings</li>
        </ul>

        <h3>Responsive Typography</h3>
        <p>Use clamp() function for fluid typography that scales with viewport:</p>
        <pre><code>font-size: clamp(1rem, 2vw + 1rem, 2rem);</code></pre>
        <p>This creates typography that adapts smoothly between mobile and desktop without breakpoints.</p>

        <h3>Font Loading Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
          <tr>
            <td>Google Fonts CDN</td>
            <td>Easy, cached, fast</td>
            <td>External dependency, privacy concerns</td>
          </tr>
          <tr>
            <td>Self-hosted fonts</td>
            <td>Full control, privacy</td>
            <td>Larger bundle, setup required</td>
          </tr>
          <tr>
            <td>Variable fonts</td>
            <td>One file, all weights</td>
            <td>Larger file, limited browser support</td>
          </tr>
          <tr>
            <td>System fonts</td>
            <td>Zero load time, native feel</td>
            <td>Inconsistent across platforms</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 7,
          language: 'scss',
          title: 'Typography System with SCSS',
          code: `// src/theme/typography.scss

// ============================================
// FONT FAMILIES
// ============================================
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-heading: 'Poppins', $font-family-base;
$font-family-mono: 'Fira Code', 'Courier New', monospace;

// ============================================
// FONT WEIGHTS
// ============================================
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// ============================================
// FONT SIZE SCALE
// ============================================
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-lg: 1.125rem;  // 18px
$font-size-xl: 1.25rem;   // 20px
$font-size-2xl: 1.5rem;   // 24px
$font-size-3xl: 1.875rem; // 30px
$font-size-4xl: 2.25rem;  // 36px
$font-size-5xl: 3rem;     // 48px

// ============================================
// LINE HEIGHTS
// ============================================
$line-height-tight: 1.2;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

// ============================================
// LETTER SPACING
// ============================================
$letter-spacing-tight: -0.025em;
$letter-spacing-normal: 0;
$letter-spacing-wide: 0.025em;

// ============================================
// TYPOGRAPHY MIXINS
// ============================================
@mixin heading-base {
  font-family: $font-family-heading;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  letter-spacing: $letter-spacing-tight;
  color: var(--ion-text-color);
}

@mixin body-text {
  font-family: $font-family-base;
  font-weight: $font-weight-regular;
  line-height: $line-height-normal;
  letter-spacing: $letter-spacing-normal;
  color: var(--ion-text-color);
}

// Responsive typography using clamp()
@mixin fluid-type($min-size, $max-size, $min-width: 320px, $max-width: 1200px) {
  $min-rem: calc($min-size / 16);
  $max-rem: calc($max-size / 16);
  font-size: clamp(#{$min-rem}rem, calc(#{$min-rem}rem + (#{$max-rem} - #{$min-rem}) * ((100vw - #{$min-width}) / (#{$max-width} - #{$min-width}))), #{$max-rem}rem);
}

// ============================================
// TYPOGRAPHY CLASSES
// ============================================
h1, .h1 {
  @include heading-base;
  @include fluid-type(32, 48);
  margin-bottom: 1rem;
}

h2, .h2 {
  @include heading-base;
  @include fluid-type(28, 36);
  margin-bottom: 0.875rem;
}

h3, .h3 {
  @include heading-base;
  @include fluid-type(24, 30);
  margin-bottom: 0.75rem;
}

h4, .h4 {
  @include heading-base;
  font-size: $font-size-2xl;
  margin-bottom: 0.625rem;
}

h5, .h5 {
  @include heading-base;
  font-size: $font-size-xl;
  margin-bottom: 0.5rem;
}

h6, .h6 {
  @include heading-base;
  font-size: $font-size-lg;
  margin-bottom: 0.5rem;
}

p, .body-text {
  @include body-text;
  font-size: $font-size-base;
  margin-bottom: 1rem;
}

.text-small {
  @include body-text;
  font-size: $font-size-sm;
}

.text-large {
  @include body-text;
  font-size: $font-size-lg;
}

.text-mono {
  font-family: $font-family-mono;
  font-size: $font-size-sm;
}

// ============================================
// FONT WEIGHT UTILITIES
// ============================================
.font-light { font-weight: $font-weight-light; }
.font-regular { font-weight: $font-weight-regular; }
.font-medium { font-weight: $font-weight-medium; }
.font-semibold { font-weight: $font-weight-semibold; }
.font-bold { font-weight: $font-weight-bold; }`,
          description: 'Complete typography system with responsive fluid type',
          copyable: true,
        },
        {
          id: 8,
          language: 'html',
          title: 'Font Loading in index.html',
          code: `<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Ionic Workflow</title>

  <base href="/" />

  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="msapplication-tap-highlight" content="no" />

  <!-- Preconnect to Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Load fonts with display=swap for better performance -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">

  <!-- Ionic icons -->
  <link rel="icon" type="image/png" href="assets/icon/favicon.png" />

  <!-- Ionic manifest -->
  <link rel="manifest" href="manifest.webmanifest" />

  <!-- iOS meta tags -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
</head>

<body>
  <app-root></app-root>
</body>
</html>`,
          description: 'Font loading with preconnect for performance optimization',
          copyable: true,
        },
      ],
      interviewTips: [
        'clamp() creates fluid typography without media queries: clamp(min, preferred, max)',
        'display=swap in Google Fonts prevents FOIT (Flash of Invisible Text)',
        'Variable fonts combine multiple weights in one file, reducing HTTP requests',
        'System fonts (-apple-system, BlinkMacSystemFont) provide native look with zero load',
        'Line height 1.5 is optimal for body text readability (WCAG recommendation)',
      ],
    },
    {
      id: 203,
      title: 'Responsive Design',
      content: `
        <h2>Responsive Design Patterns</h2>
        <p>Mobile-first responsive design ensures your app works beautifully on all screen sizes from phones to tablets to desktops.</p>

        <h3>Ionic Breakpoints</h3>
        <table>
          <tr>
            <th>Breakpoint</th>
            <th>Width</th>
            <th>Device</th>
          </tr>
          <tr>
            <td>xs</td>
            <td>0 - 575px</td>
            <td>Small phones</td>
          </tr>
          <tr>
            <td>sm</td>
            <td>576px - 767px</td>
            <td>Large phones</td>
          </tr>
          <tr>
            <td>md</td>
            <td>768px - 991px</td>
            <td>Tablets (portrait)</td>
          </tr>
          <tr>
            <td>lg</td>
            <td>992px - 1199px</td>
            <td>Tablets (landscape), small desktops</td>
          </tr>
          <tr>
            <td>xl</td>
            <td>1200px+</td>
            <td>Large desktops</td>
          </tr>
        </table>

        <h3>Responsive Strategies</h3>
        <ul>
          <li><strong>CSS Grid:</strong> Two-dimensional layouts (rows and columns)</li>
          <li><strong>Flexbox:</strong> One-dimensional layouts (row or column)</li>
          <li><strong>Ion-grid:</strong> Ionic's 12-column responsive grid</li>
          <li><strong>Ion-split-pane:</strong> Sidebar on desktop, menu on mobile</li>
          <li><strong>Media Queries:</strong> Conditional styling based on viewport</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 9,
          language: 'scss',
          title: 'Responsive SCSS Mixins',
          code: `// src/theme/mixins/responsive.scss

// ============================================
// BREAKPOINTS
// ============================================
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// ============================================
// MEDIA QUERY MIXINS
// ============================================

// Mobile-first: min-width
@mixin respond-above($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $value: map-get($breakpoints, $breakpoint);
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// Desktop-first: max-width
@mixin respond-below($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $value: map-get($breakpoints, $breakpoint);
    @media (max-width: ($value - 1)) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// Between two breakpoints
@mixin respond-between($lower, $upper) {
  $lower-value: map-get($breakpoints, $lower);
  $upper-value: map-get($breakpoints, $upper);

  @media (min-width: $lower-value) and (max-width: ($upper-value - 1)) {
    @content;
  }
}

// Specific orientation
@mixin respond-orientation($orientation) {
  @media (orientation: $orientation) {
    @content;
  }
}

// High DPI screens (retina)
@mixin respond-retina {
  @media (-webkit-min-device-pixel-ratio: 2),
         (min-resolution: 192dpi) {
    @content;
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

// Mobile-first approach (recommended)
.my-component {
  padding: 1rem;

  @include respond-above(md) {
    padding: 2rem; // Tablets and up
  }

  @include respond-above(lg) {
    padding: 3rem; // Desktops and up
  }
}

// Hide on mobile, show on desktop
.desktop-only {
  display: none;

  @include respond-above(lg) {
    display: block;
  }
}

// Show on mobile, hide on desktop
.mobile-only {
  display: block;

  @include respond-above(lg) {
    display: none;
  }
}

// Between specific breakpoints
.tablet-only {
  display: none;

  @include respond-between(md, lg) {
    display: block;
  }
}

// Orientation-specific
.landscape-layout {
  @include respond-orientation(landscape) {
    flex-direction: row;
  }

  @include respond-orientation(portrait) {
    flex-direction: column;
  }
}`,
          description: 'Comprehensive responsive SCSS mixins for mobile-first development',
          copyable: true,
        },
        {
          id: 10,
          language: 'scss',
          title: 'CSS Grid Responsive Layouts',
          code: `// Responsive grid layouts using CSS Grid

// ============================================
// AUTO-FIT GRID (responsive without media queries)
// ============================================
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  // Items automatically wrap to new rows when space is limited
  // No media queries needed!
}

// ============================================
// EXPLICIT RESPONSIVE GRID
// ============================================
.responsive-grid {
  display: grid;
  gap: 1rem;

  // Mobile: 1 column
  grid-template-columns: 1fr;

  // Tablet: 2 columns
  @include respond-above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  // Desktop: 3 columns
  @include respond-above(lg) {
    grid-template-columns: repeat(3, 1fr);
  }

  // Large desktop: 4 columns
  @include respond-above(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

// ============================================
// DASHBOARD LAYOUT
// ============================================
.dashboard-layout {
  display: grid;
  gap: 1rem;

  // Mobile: stacked
  grid-template-areas:
    "header"
    "sidebar"
    "main"
    "footer";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;

  // Desktop: sidebar + content
  @include respond-above(lg) {
    grid-template-areas:
      "header header"
      "sidebar main"
      "sidebar footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
  }

  .dashboard-header { grid-area: header; }
  .dashboard-sidebar { grid-area: sidebar; }
  .dashboard-main { grid-area: main; }
  .dashboard-footer { grid-area: footer; }
}

// ============================================
// MASONRY-LIKE LAYOUT
// ============================================
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 10px; // Small row height for fine control
  gap: 1rem;

  .masonry-item {
    // Items span multiple rows based on content height
    // Use data attribute to set span
    &[data-span="small"] { grid-row: span 20; }
    &[data-span="medium"] { grid-row: span 30; }
    &[data-span="large"] { grid-row: span 40; }
  }
}`,
          description: 'CSS Grid patterns for responsive layouts without complex media queries',
          copyable: true,
        },
      ],
      interviewTips: [
        'Mobile-first (min-width) is preferred over desktop-first (max-width) for progressive enhancement',
        'auto-fit vs auto-fill: auto-fit collapses empty tracks, auto-fill keeps them',
        'CSS Grid is best for 2D layouts (rows and columns), Flexbox for 1D (row or column)',
        'ion-split-pane automatically shows/hides based on --ion-split-pane-min-width (992px default)',
        'Use clamp() for container widths: width: clamp(300px, 90%, 1200px)',
      ],
    },
    {
      id: 204,
      title: 'Component Styling',
      content: `
        <h2>Styling Ionic Components</h2>
        <p>Ionic components use Shadow DOM, which provides encapsulation but requires special styling techniques. Understanding how to properly style Ionic components is essential.</p>

        <h3>Shadow DOM Styling Challenges</h3>
        <ul>
          <li><strong>Encapsulation:</strong> Styles don't penetrate Shadow DOM by default</li>
          <li><strong>CSS Variables:</strong> The only way to style across Shadow DOM boundaries</li>
          <li><strong>::part Selectors:</strong> Target specific parts of Shadow DOM components</li>
          <li><strong>Slots:</strong> Style slotted content from the parent component</li>
        </ul>

        <h3>Ionic CSS Utilities</h3>
        <table>
          <tr>
            <th>Category</th>
            <th>Classes</th>
          </tr>
          <tr>
            <td>Text Alignment</td>
            <td>ion-text-start, ion-text-center, ion-text-end</td>
          </tr>
          <tr>
            <td>Text Transform</td>
            <td>ion-text-uppercase, ion-text-lowercase, ion-text-capitalize</td>
          </tr>
          <tr>
            <td>Padding</td>
            <td>ion-padding, ion-padding-top, ion-padding-bottom, etc.</td>
          </tr>
          <tr>
            <td>Margin</td>
            <td>ion-margin, ion-margin-top, ion-margin-bottom, etc.</td>
          </tr>
          <tr>
            <td>Float</td>
            <td>ion-float-start, ion-float-end</td>
          </tr>
          <tr>
            <td>Display</td>
            <td>ion-hide, ion-hide-sm-down, ion-hide-md-up</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 11,
          language: 'scss',
          title: 'Styling Ionic Components with CSS Variables',
          code: `// Component-specific styling using CSS variables

// ============================================
// ION-BUTTON CUSTOMIZATION
// ============================================
ion-button {
  // Size
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 24px;
  --padding-end: 24px;

  // Border
  --border-radius: 8px;
  --border-width: 2px;
  --border-style: solid;

  // Shadows
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  // Transitions
  --transition: all 0.3s ease;
}

// Custom button variant
.button-rounded {
  --border-radius: 24px;
}

// ============================================
// ION-CARD CUSTOMIZATION
// ============================================
ion-card {
  --background: var(--ion-card-background);
  --color: var(--ion-text-color);

  // Spacing
  margin: 16px;

  // Border
  border-radius: 12px;

  // Shadow for depth
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
}

// ============================================
// ION-LIST CUSTOMIZATION
// ============================================
ion-list {
  background: transparent;

  ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    --inner-padding-end: 16px;
    --border-color: var(--ion-color-light-shade);
    --background: var(--ion-item-background);
    --min-height: 60px;

    // Hover effect
    &:hover {
      --background: var(--ion-color-light);
    }
  }

  ion-item-divider {
    --padding-start: 16px;
    --background: var(--ion-background-color-step-100);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }
}

// ============================================
// ION-TOOLBAR CUSTOMIZATION
// ============================================
ion-toolbar {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
  --border-width: 0;
  --min-height: 56px;
  --padding-top: 4px;
  --padding-bottom: 4px;
  --padding-start: 16px;
  --padding-end: 16px;
}

// ============================================
// ION-SEGMENT CUSTOMIZATION
// ============================================
ion-segment {
  --background: var(--ion-color-light);
  border-radius: 8px;
  padding: 4px;

  ion-segment-button {
    --color: var(--ion-color-medium);
    --color-checked: var(--ion-color-primary);
    --indicator-color: var(--ion-color-primary);
    --indicator-height: 2px;

    // Custom indicator
    &::part(indicator) {
      border-radius: 4px;
    }

    &::part(indicator-background) {
      background: var(--ion-color-primary);
    }
  }
}

// ============================================
// ION-SEARCHBAR CUSTOMIZATION
// ============================================
ion-searchbar {
  --background: var(--ion-color-light);
  --border-radius: 24px;
  --box-shadow: none;
  --icon-color: var(--ion-color-medium);
  --placeholder-color: var(--ion-color-medium);
  --placeholder-opacity: 0.7;

  &.searchbar-has-focus {
    --background: var(--ion-background-color);
    --box-shadow: 0 0 0 2px var(--ion-color-primary);
  }
}`,
          description: 'Comprehensive styling of Ionic components using CSS variables',
          copyable: true,
        },
      ],
      interviewTips: [
        '::ng-deep is deprecated in Angular - use CSS variables or ::part instead',
        '::part() selector targets Shadow DOM parts explicitly exposed by components',
        'CSS variables pierce Shadow DOM boundaries, making them ideal for theming',
        'Use --ion-safe-area-* variables for iPhone notch and home indicator spacing',
        'Ionic CSS utilities follow BEM-like naming: ion-{property}-{value}',
      ],
    },
    {
      id: 205,
      title: 'Animations & Transitions',
      content: `
        <h2>Animations & Micro-interactions</h2>
        <p>Animations bring your app to life, provide feedback, and guide user attention. Well-designed animations feel natural and enhance the user experience without being distracting.</p>

        <h3>Animation Principles</h3>
        <ul>
          <li><strong>Purpose:</strong> Every animation should have a purpose (feedback, attention, delight)</li>
          <li><strong>Duration:</strong> 200-300ms for UI feedback, 300-500ms for page transitions</li>
          <li><strong>Easing:</strong> Use ease-out for entrances, ease-in for exits</li>
          <li><strong>Performance:</strong> Animate transform and opacity only (GPU-accelerated)</li>
          <li><strong>Accessibility:</strong> Respect prefers-reduced-motion for users who need it</li>
        </ul>

        <h3>Animation Types</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Use Case</th>
            <th>Duration</th>
          </tr>
          <tr>
            <td>Micro-interaction</td>
            <td>Button press, toggle</td>
            <td>100-200ms</td>
          </tr>
          <tr>
            <td>Feedback</td>
            <td>Form validation, loading</td>
            <td>200-300ms</td>
          </tr>
          <tr>
            <td>Transition</td>
            <td>Page navigation</td>
            <td>300-400ms</td>
          </tr>
          <tr>
            <td>Delight</td>
            <td>Success animations</td>
            <td>400-600ms</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 12,
          language: 'typescript',
          title: 'Angular Animations for Page Transitions',
          code: `// src/app/animations/page-transitions.ts
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group,
} from '@angular/animations';

// Slide in from right (forward navigation)
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(-30%)', opacity: 0 })),
  ]),
]);

// Slide in from left (back navigation)
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(30%)', opacity: 0 })),
  ]),
]);

// Fade in/out
export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);

// Scale up (modal entrance)
export const scaleUp = trigger('scaleUp', [
  transition(':enter', [
    style({ transform: 'scale(0.8)', opacity: 0 }),
    animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({ transform: 'scale(1)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    animate('200ms ease-out',
      style({ transform: 'scale(0.95)', opacity: 0 })
    ),
  ]),
]);

// List stagger (items appear one by one)
export const listStagger = trigger('listStagger', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('50ms', [
        animate('300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ], { optional: true }),
  ]),
]);

// Usage in component:
// @Component({
//   selector: 'app-my-page',
//   animations: [slideInRight, fadeAnimation, scaleUp],
// })`,
          description: 'Reusable Angular animation triggers for page transitions and micro-interactions',
          copyable: true,
        },
        {
          id: 13,
          language: 'scss',
          title: 'CSS Animation Utilities',
          code: `// src/theme/animations.scss

// ============================================
// ANIMATION KEYFRAMES
// ============================================
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

// ============================================
// ANIMATION UTILITY CLASSES
// ============================================
.animate-fade-in {
  animation: fadeIn 300ms ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 400ms ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 300ms ease-out forwards;
}

.animate-bounce {
  animation: bounce 600ms ease-in-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}

.animate-shake {
  animation: shake 500ms ease-in-out;
}

// ============================================
// TRANSITION UTILITIES
// ============================================
.transition-all {
  transition: all 300ms ease-in-out;
}

.transition-fast {
  transition: all 150ms ease-in-out;
}

.transition-slow {
  transition: all 500ms ease-in-out;
}

.transition-transform {
  transition: transform 300ms ease-in-out;
}

.transition-opacity {
  transition: opacity 300ms ease-in-out;
}

// ============================================
// HOVER EFFECTS
// ============================================
.hover-lift {
  transition: transform 200ms ease-out;

  &:hover {
    transform: translateY(-4px);
  }
}

.hover-grow {
  transition: transform 200ms ease-out;

  &:hover {
    transform: scale(1.05);
  }
}

.hover-glow {
  transition: box-shadow 200ms ease-out;

  &:hover {
    box-shadow: 0 0 20px rgba(var(--ion-color-primary-rgb), 0.5);
  }
}

// ============================================
// LOADING ANIMATIONS
// ============================================
.skeleton-loading {
  background: linear-gradient(
    90deg,
    var(--ion-color-light) 0%,
    var(--ion-color-light-shade) 50%,
    var(--ion-color-light) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

// ============================================
// ACCESSIBILITY: RESPECT REDUCED MOTION
// ============================================
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
          description: 'Comprehensive CSS animation utilities with accessibility support',
          copyable: true,
        },
      ],
      interviewTips: [
        'Animate transform and opacity only - these are GPU-accelerated and performant',
        'prefers-reduced-motion media query respects user accessibility needs',
        'Use cubic-bezier() for custom easing: cubic-bezier(0.34, 1.56, 0.64, 1) for bounce',
        'requestAnimationFrame() for JavaScript animations syncs with browser repaint',
        'will-change: transform; hints browser to optimize, but don\'t overuse it',
      ],
    },
    {
      id: 206,
      title: 'Design System & Style Guide',
      content: `
        <h2>Design System Architecture</h2>
        <p>A design system provides consistency, speeds up development, and ensures quality across your application. It includes design tokens, component library, and documentation.</p>

        <h3>Design System Benefits</h3>
        <ul>
          <li><strong>Consistency:</strong> Uniform look and feel across the entire app</li>
          <li><strong>Efficiency:</strong> Reusable components speed up development</li>
          <li><strong>Scalability:</strong> Easy to maintain and update as app grows</li>
          <li><strong>Collaboration:</strong> Clear guidelines for designers and developers</li>
          <li><strong>Quality:</strong> Tested, accessible components</li>
        </ul>

        <h3>Design Tokens</h3>
        <p>Design tokens are the atomic values of your design system - colors, spacing, typography, shadows, etc. stored as variables.</p>

        <h3>Component Documentation</h3>
        <table>
          <tr>
            <th>Section</th>
            <th>Contents</th>
          </tr>
          <tr>
            <td>Overview</td>
            <td>Purpose, when to use, when not to use</td>
          </tr>
          <tr>
            <td>Variants</td>
            <td>Different states and sizes</td>
          </tr>
          <tr>
            <td>Props</td>
            <td>Input properties and their types</td>
          </tr>
          <tr>
            <td>Examples</td>
            <td>Code examples with live preview</td>
          </tr>
          <tr>
            <td>Accessibility</td>
            <td>ARIA attributes, keyboard navigation</td>
          </tr>
          <tr>
            <td>Best Practices</td>
            <td>Do's and don'ts</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 14,
          language: 'typescript',
          title: 'Complete Design Tokens',
          code: `// src/app/design-system/design-tokens.ts

export const DESIGN_TOKENS = {
  // ============================================
  // COLORS
  // ============================================
  colors: {
    // Brand colors
    brand: {
      primary: '#6366f1',
      secondary: '#3dc2ff',
      tertiary: '#5260ff',
    },

    // Semantic colors
    semantic: {
      success: '#2dd36f',
      warning: '#ffc409',
      danger: '#eb445a',
      info: '#3dc2ff',
    },

    // Neutral colors
    neutral: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
  },

  // ============================================
  // SPACING
  // ============================================
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },

  // ============================================
  // TYPOGRAPHY
  // ============================================
  typography: {
    fontFamilies: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '"Poppins", sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
    },

    fontSizes: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },

    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },

    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  },

  // ============================================
  // SHADOWS
  // ============================================
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
    '2xl': '0 16px 32px rgba(0, 0, 0, 0.2)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },

  // ============================================
  // Z-INDEX
  // ============================================
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },

  // ============================================
  // TRANSITIONS
  // ============================================
  transitions: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
} as const;

// Type-safe access to tokens
export type DesignTokens = typeof DESIGN_TOKENS;`,
          description: 'Comprehensive design tokens for consistent styling',
          copyable: true,
        },
      ],
      interviewTips: [
        'Design tokens enable theme switching at runtime by updating token values',
        'Use TypeScript const assertions (as const) for type-safe token access',
        'Follow 8-point grid system for spacing (4px, 8px, 16px, 24px, 32px, etc.)',
        'Shadow elevation should increase with z-index for visual hierarchy',
        'Document design tokens with Storybook or similar tool for designer collaboration',
      ],
    },
  ],
};
