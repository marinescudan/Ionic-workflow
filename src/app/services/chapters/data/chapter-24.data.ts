// src/app/services/chapters/data/chapter-24.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_24_DATA: Chapter = {
  id: 24,
  title: 'Maps Integration',
  description: 'Master Google Maps and OpenStreetMap integration with geocoding, directions, marker clustering, drawing tools, and real-time location tracking',
  icon: 'map-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 240,
      title: 'Maps Overview & Comparison',
      content: `
        <h2>Interactive Maps in Ionic Applications</h2>
        <p>Maps are essential for location-based applications. From ride-sharing to food delivery, property search to store locators, interactive maps enhance user experience and enable powerful location-aware features.</p>

        <h3>Google Maps vs OpenStreetMap</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>Google Maps</th>
            <th>OpenStreetMap (Leaflet)</th>
          </tr>
          <tr>
            <td>Cost</td>
            <td>$7 per 1,000 map loads after $200/month free</td>
            <td>Free and open source</td>
          </tr>
          <tr>
            <td>API Key</td>
            <td>Required</td>
            <td>Not required (for tiles)</td>
          </tr>
          <tr>
            <td>Data Quality</td>
            <td>Comprehensive, constantly updated</td>
            <td>Good, community-maintained</td>
          </tr>
          <tr>
            <td>Street View</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Real-time Traffic</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Places/POI Data</td>
            <td>Extensive (Places API)</td>
            <td>Limited (Nominatim)</td>
          </tr>
          <tr>
            <td>Offline Support</td>
            <td>Limited</td>
            <td>Excellent (tile caching)</td>
          </tr>
          <tr>
            <td>Customization</td>
            <td>Good (JSON styling)</td>
            <td>Excellent (full control)</td>
          </tr>
        </table>

        <h3>When to Choose Each</h3>
        <h4>Use Google Maps when:</h4>
        <ul>
          <li>You need Street View or 3D buildings</li>
          <li>Real-time traffic data is essential</li>
          <li>Comprehensive POI data required (restaurants, stores, etc.)</li>
          <li>Turn-by-turn navigation integration needed</li>
          <li>Budget allows for API costs</li>
          <li>Building commercial application with high traffic</li>
        </ul>

        <h4>Use OpenStreetMap when:</h4>
        <ul>
          <li>Budget is limited or zero</li>
          <li>Complete offline map support needed</li>
          <li>Full customization of map styles required</li>
          <li>Privacy is a primary concern (no tracking)</li>
          <li>Building open-source project</li>
          <li>Basic mapping features are sufficient</li>
        </ul>

        <h3>Map Projections</h3>
        <p>All modern web maps use <strong>Web Mercator (EPSG:3857)</strong> projection:</p>
        <ul>
          <li><strong>Preserves:</strong> Angles and shapes (conformal projection)</li>
          <li><strong>Distorts:</strong> Areas, especially near poles</li>
          <li><strong>Coverage:</strong> Latitude from -85° to +85°</li>
          <li><strong>Used by:</strong> Google Maps, OpenStreetMap, Bing Maps, all major providers</li>
        </ul>

        <p><strong>Coordinate Systems:</strong></p>
        <ul>
          <li><strong>WGS84 (EPSG:4326):</strong> Latitude/longitude in degrees (GPS standard)</li>
          <li><strong>Web Mercator (EPSG:3857):</strong> X/Y in meters (rendering standard)</li>
        </ul>

        <h3>Map Types</h3>
        <h4>Google Maps Types:</h4>
        <ul>
          <li><strong>Roadmap:</strong> Default street map</li>
          <li><strong>Satellite:</strong> Aerial/satellite imagery</li>
          <li><strong>Hybrid:</strong> Satellite imagery with road overlay</li>
          <li><strong>Terrain:</strong> Physical terrain features</li>
        </ul>

        <h4>Google Maps Layers:</h4>
        <ul>
          <li><strong>Traffic:</strong> Real-time traffic conditions</li>
          <li><strong>Transit:</strong> Public transportation lines</li>
          <li><strong>Bicycling:</strong> Bike-friendly routes</li>
        </ul>

        <h4>OSM Tile Providers:</h4>
        <ul>
          <li><strong>Standard OSM:</strong> Default OpenStreetMap style</li>
          <li><strong>Humanitarian (HOT):</strong> High-contrast style</li>
          <li><strong>CyclOSM:</strong> Cycling routes emphasized</li>
          <li><strong>Stamen Terrain:</strong> Topographic features</li>
          <li><strong>CartoDB:</strong> Clean, minimal styles (light/dark)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'maps.models.ts - Core Type Definitions',
          code: `// src/app/core/services/maps/maps.models.ts

/**
 * Core Maps Type Definitions
 *
 * 💡 INTERVIEW: Define types for all map entities to ensure type safety
 * and better IDE support throughout the application
 */

// Geographic coordinate (WGS84)
export interface LatLng {
  lat: number;  // Latitude: -90 to 90
  lng: number;  // Longitude: -180 to 180
}

// Map bounds (viewport)
export interface LatLngBounds {
  southwest: LatLng;
  northeast: LatLng;
}

// Camera/viewport configuration
export interface CameraConfig {
  coordinate: LatLng;
  zoom: number;         // 0-20+ (0=world, 20=building)
  bearing?: number;     // 0-360 degrees (map rotation)
  tilt?: number;        // 0-90 degrees (3D perspective)
  animate?: boolean;    // Animate camera movement
  duration?: number;    // Animation duration (ms)
}

// Map types
export enum MapType {
  ROADMAP = 'roadmap',      // Standard street map
  SATELLITE = 'satellite',  // Satellite imagery
  HYBRID = 'hybrid',        // Satellite + roads
  TERRAIN = 'terrain',      // Physical features
}

// Map configuration
export interface MapConfig {
  center: LatLng;
  zoom: number;
  mapType?: MapType;

  // Controls
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  scaleControl?: boolean;
  streetViewControl?: boolean;
  fullscreenControl?: boolean;

  // Gestures
  gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
  // cooperative: Two-finger pan/zoom (prevents scroll conflicts)
  // greedy: One-finger gestures (desktop-like)
  // none: Disable all gestures
  // auto: cooperative on mobile, greedy on desktop

  // Restrictions
  minZoom?: number;
  maxZoom?: number;
  restrictBounds?: LatLngBounds;

  // Styling
  styles?: MapStyle[];
  backgroundColor?: string;
}

// Map styling (JSON-based)
export interface MapStyle {
  featureType?: string;  // e.g., 'road', 'water', 'poi'
  elementType?: string;  // e.g., 'geometry', 'labels'
  stylers: Array<{
    color?: string;
    visibility?: 'on' | 'off' | 'simplified';
    weight?: number;
    saturation?: number;
    lightness?: number;
  }>;
}

// Marker interface
export interface MarkerOptions {
  id?: string;
  position: LatLng;
  title: string;
  snippet?: string;      // Info window content
  icon?: MarkerIcon;
  draggable?: boolean;
  visible?: boolean;
  zIndex?: number;
  opacity?: number;
  data?: any;           // Custom data attached to marker
}

// Marker icon
export interface MarkerIcon {
  url: string;
  size?: { width: number; height: number };
  anchor?: { x: number; y: number };      // Icon anchor point
  scaledSize?: { width: number; height: number };
}

// Polyline (path/route)
export interface PolylineOptions {
  path: LatLng[];
  color?: string;
  weight?: number;       // Line width
  opacity?: number;
  geodesic?: boolean;    // Follow earth's curvature
  clickable?: boolean;
  zIndex?: number;
}

// Polygon (area/zone)
export interface PolygonOptions {
  path: LatLng[];
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  fillColor?: string;
  fillOpacity?: number;
  clickable?: boolean;
  zIndex?: number;
}

// Circle (radius)
export interface CircleOptions {
  center: LatLng;
  radius: number;        // Meters
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  fillColor?: string;
  fillOpacity?: number;
  clickable?: boolean;
}

// Map click event
export interface MapClickEvent {
  latitude: number;
  longitude: number;
}

// Marker click event
export interface MarkerClickEvent {
  markerId: string;
  latitude: number;
  longitude: number;
}

/**
 * 💡 INTERVIEW: Using interfaces ensures type safety and better IDE support.
 * Define all map entities upfront to prevent runtime errors.
 */`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'Decision Matrix - Choosing the Right Map Provider',
          code: `/**
 * Decision Matrix: Google Maps vs OpenStreetMap
 *
 * 💡 INTERVIEW: Choose based on features needed, budget, and privacy requirements
 */

// Use Google Maps when:
const useGoogleMapsWhen = [
  'Need Street View or 3D buildings',
  'Require accurate real-time traffic data',
  'Need comprehensive POI (Places) data',
  'Want turn-by-turn navigation integration',
  'Budget allows for API costs',
  'Need official support and SLAs',
  'Building commercial app with high usage',
];

// Use OpenStreetMap when:
const useOpenStreetMapWhen = [
  'Budget is limited or zero',
  'Need complete offline map support',
  'Require full customization of map styles',
  'Privacy is a primary concern',
  'Building open-source project',
  'Low to medium traffic expected',
  'Basic mapping features sufficient',
];

// Hybrid Approach:
interface HybridMapsStrategy {
  approach: 'Use both, fallback strategy';
  implementation: {
    primary: 'Google Maps for native (iOS/Android)',
    fallback: 'Leaflet for web or when Google fails',
    offline: 'Leaflet with cached tiles',
    development: 'Leaflet (no API key needed)',
    production: 'Google Maps (better UX)',
  };
}

// Cost Comparison (2024)
const googleMapsPricing = {
  mapLoads: '$7 per 1,000 loads (after free 28,000/month)',
  dynamicMaps: '$7 per 1,000 loads',
  staticMaps: '$2 per 1,000 requests',
  geocoding: '$5 per 1,000 requests',
  directions: '$5 per 1,000 requests (up to 10 waypoints)',
  places: '$17 per 1,000 requests (Place Details)',
  distanceMatrix: '$5 per 1,000 elements',
  freeCredit: '$200/month',
};

const openStreetMapCosts = {
  tiles: 'Free',
  geocoding: 'Free (Nominatim with rate limits)',
  routing: 'Free (OSRM or GraphHopper)',
  hosting: 'Self-host or use free tile servers',
  totalCost: '$0 for typical usage',
};`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Google Maps vs OSM: Google has better features but costs money; OSM is free but requires more setup',
        'Map projections: Web Mercator (EPSG:3857) is used by all major web mapping services',
        'API key security: Always restrict keys by platform, domain, and API type',
        'Hybrid approach: Use Google Maps for native apps, Leaflet for web or as fallback',
        'Cost consideration: $200/month Google credit covers ~28,000 map loads or ~40,000 geocoding requests',
      ],
    },
    {
      id: 241,
      title: 'Google Maps Setup & Configuration',
      content: `
        <h2>Setting Up Google Maps Platform</h2>
        <p>Google Maps requires API keys and platform-specific configuration. Proper setup ensures secure API key handling and optimal performance across iOS, Android, and web platforms.</p>

        <h3>Getting Google Maps API Key</h3>
        <ol>
          <li>Go to <a href="https://console.cloud.google.com/">Google Cloud Console</a></li>
          <li>Create a new project or select existing one</li>
          <li>Enable required APIs:
            <ul>
              <li>Maps SDK for Android</li>
              <li>Maps SDK for iOS</li>
              <li>Maps JavaScript API</li>
              <li>Geocoding API</li>
              <li>Directions API</li>
              <li>Places API (optional)</li>
            </ul>
          </li>
          <li>Create API credentials → API Key</li>
          <li><strong>Restrict the API key</strong> (critical for security)</li>
        </ol>

        <h3>API Key Restrictions</h3>
        <p><strong>Application Restrictions:</strong></p>
        <ul>
          <li><strong>Android:</strong> Add package name + SHA-1 certificate fingerprint</li>
          <li><strong>iOS:</strong> Add bundle identifier</li>
          <li><strong>HTTP referrers:</strong> Add your domains for web</li>
        </ul>

        <p><strong>API Restrictions:</strong></p>
        <ul>
          <li>Enable only the APIs you actually use</li>
          <li>Don't enable APIs "just in case"</li>
          <li>Reduces attack surface if key is compromised</li>
        </ul>

        <h3>Platform Configuration</h3>

        <h4>iOS Configuration (Info.plist)</h4>
        <p>Add your Google Maps API key and location permissions to Info.plist:</p>
        <pre><code>&lt;key&gt;GMSApiKey&lt;/key&gt;
&lt;string&gt;YOUR_IOS_API_KEY_HERE&lt;/string&gt;

&lt;key&gt;NSLocationWhenInUseUsageDescription&lt;/key&gt;
&lt;string&gt;We need your location to show you on the map&lt;/string&gt;</code></pre>

        <h4>Android Configuration (AndroidManifest.xml)</h4>
        <p>Add API key and permissions to AndroidManifest.xml:</p>
        <pre><code>&lt;uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /&gt;
&lt;uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /&gt;

&lt;application&gt;
  &lt;meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ANDROID_API_KEY_HERE"/&gt;
&lt;/application&gt;</code></pre>

        <h4>Web Configuration</h4>
        <p>For web, configure API key in environment files or Capacitor config:</p>
        <pre><code>// capacitor.config.ts
plugins: {
  CapacitorGoogleMaps: {
    apiKey: 'YOUR_WEB_API_KEY_HERE',
  },
}</code></pre>

        <h3>Security Best Practices</h3>
        <ul>
          <li><strong>Never commit API keys to version control</strong> - Use environment variables</li>
          <li><strong>Use different keys per platform</strong> - Easier to track and revoke</li>
          <li><strong>Restrict all keys</strong> - Application + API restrictions</li>
          <li><strong>Monitor usage</strong> - Set up billing alerts in Google Cloud Console</li>
          <li><strong>Rotate keys regularly</strong> - Every 90 days or if compromised</li>
          <li><strong>Use backend proxy</strong> - For sensitive operations (geocoding, directions)</li>
        </ul>

        <h3>Installation</h3>
        <pre><code># Install Capacitor Google Maps plugin
npm install @capacitor/google-maps

# Sync with native platforms
npx cap sync

# Optional: Install Leaflet for OpenStreetMap fallback
npm install leaflet
npm install --save-dev @types/leaflet</code></pre>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'environment.ts - Environment Configuration',
          code: `// src/environments/environment.ts

export const environment = {
  production: false,

  // Google Maps API Keys (different per platform/environment)
  googleMaps: {
    // Web API key (restricted to localhost for development)
    webApiKey: 'AIzaSy_DEV_WEB_KEY_XXXXXXXXXXXXXXXXXX',

    // Geocoding API key (backend use, keep secret)
    geocodingApiKey: 'AIzaSy_DEV_GEOCODING_KEY_XXXXXXXXX',

    // Note: iOS uses Info.plist, Android uses AndroidManifest.xml
  },

  // OpenStreetMap config (no key needed)
  openStreetMap: {
    tileServer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  },

  // Nominatim for OSM geocoding
  nominatim: {
    baseUrl: 'https://nominatim.openstreetmap.org',
    // Note: Nominatim has usage policy - max 1 request/sec
    userAgent: 'IonicWorkflowApp/1.0',
  },
};`,
          copyable: true,
        },
        {
          id: 2,
          language: 'typescript',
          title: 'environment.prod.ts - Production Configuration',
          code: `// src/environments/environment.prod.ts

export const environment = {
  production: true,

  googleMaps: {
    // Production web key (restricted to your domains)
    webApiKey: process.env['GOOGLE_MAPS_WEB_KEY']!,

    // Geocoding key (backend only, not exposed to client)
    geocodingApiKey: process.env['GOOGLE_MAPS_GEOCODING_KEY']!,
  },

  openStreetMap: {
    // Consider using paid tile server for production (better performance/SLA)
    tileServer: 'https://tiles.yourdomain.com/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  },

  nominatim: {
    // Consider self-hosting Nominatim for production (no rate limits)
    baseUrl: 'https://nominatim.yourdomain.com',
    userAgent: 'IonicWorkflowApp/1.0',
  },
};

/**
 * 💡 INTERVIEW: Never commit API keys to version control!
 *
 * Best practices:
 * 1. Use environment variables in CI/CD pipeline
 * 2. Different keys for dev/staging/prod
 * 3. Restrict keys by platform and referrer
 * 4. Rotate keys if compromised
 * 5. Monitor usage and set billing alerts
 */`,
          copyable: true,
        },
        {
          id: 3,
          language: 'html',
          title: 'Info.plist - iOS Configuration',
          code: `<!-- ios/App/App/Info.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- Existing keys... -->

  <!-- Google Maps API Key -->
  <key>GMSApiKey</key>
  <string>AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</string>

  <!-- Location permissions (required for maps) -->
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>We need your location to show you on the map and find nearby places</string>

  <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
  <string>We need your location for real-time tracking and navigation features</string>

  <!-- Optional: If using background location -->
  <key>UIBackgroundModes</key>
  <array>
    <string>location</string>
  </array>
</dict>
</plist>

<!--
💡 INTERVIEW: iOS requires API key in Info.plist
Use different keys for debug/release builds for security:
- Debug: Restricted to dev team's devices
- Release: Restricted to App Store bundle ID
-->`,
          copyable: true,
        },
        {
          id: 4,
          language: 'html',
          title: 'AndroidManifest.xml - Android Configuration',
          code: `<!-- android/app/src/main/AndroidManifest.xml -->
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <!-- Location permissions -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

  <!-- Optional: For background location tracking -->
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />

  <!-- Internet permission (usually already present) -->
  <uses-permission android:name="android.permission.INTERNET" />

  <application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">

    <!-- Google Maps API Key -->
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"/>

    <!-- Activities... -->
  </application>
</manifest>

<!--
💡 INTERVIEW: Android requires API key in AndroidManifest.xml

Security Note: The API key is visible in the APK, so ALWAYS:
1. Use Android-restricted API keys (package name + SHA-1)
2. Enable only necessary APIs
3. Monitor usage in Google Cloud Console
4. Set up billing alerts
-->`,
          copyable: true,
        },
      ],
      interviewTips: [
        'API key security: ALWAYS restrict keys by platform (Android/iOS/HTTP referrers) and API type',
        'Environment variables: Use process.env in production, never commit keys to Git',
        'Different keys: Use separate keys for dev/staging/prod for better tracking and security',
        'Monitoring: Set up Google Cloud billing alerts to catch unexpected usage spikes',
        'Backend proxy: For sensitive operations (geocoding, directions), proxy through your backend to keep keys server-side',
      ],
    },
    // Continue with sections 3-9...
    {
      id: 242,
      title: 'Basic Map Implementation',
      content: `
        <h2>Creating Interactive Maps</h2>
        <p>Learn to initialize maps, control the camera, add markers, and style maps for your application's needs.</p>

        <h3>GoogleMapsService</h3>
        <p>The GoogleMapsService provides a clean interface for interacting with Google Maps across iOS, Android, and web platforms.</p>

        <h4>Key Features:</h4>
        <ul>
          <li>✅ Initialize map with configuration</li>
          <li>✅ Add/remove markers with custom icons</li>
          <li>✅ Control camera (position, zoom, bearing, tilt)</li>
          <li>✅ Event listeners (map click, marker click, camera idle)</li>
          <li>✅ Fit bounds to show all markers</li>
          <li>✅ Switch map types (roadmap, satellite, hybrid, terrain)</li>
          <li>✅ Memory leak prevention (proper cleanup)</li>
        </ul>

        <h3>LeafletMapsService</h3>
        <p>LeafletMapsService provides OpenStreetMap integration using the Leaflet library - perfect for free, offline-capable maps.</p>

        <h4>Key Features:</h4>
        <ul>
          <li>✅ Free tile layers (no API key required)</li>
          <li>✅ Custom tile providers (satellite, terrain, dark mode)</li>
          <li>✅ Marker management with popups and tooltips</li>
          <li>✅ Draw shapes (polylines, polygons, circles)</li>
          <li>✅ Offline tile caching support</li>
          <li>✅ Full customization of map styles</li>
        </ul>

        <h3>Map Styling</h3>
        <p>Both Google Maps and Leaflet support custom styling for better branding and dark mode support.</p>

        <h4>Dark Mode Benefits:</h4>
        <ul>
          <li>Reduces eye strain in low-light conditions</li>
          <li>Better for night driving apps</li>
          <li>Matches app theme for consistency</li>
          <li>Reduces battery usage on OLED screens</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1,
          language: 'typescript',
          title: 'google-maps.service.ts - Google Maps Service (Part 1)',
          code: `// src/app/core/services/maps/google-maps.service.ts

import { Injectable } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '@env/environment';
import {
  LatLng,
  MapConfig,
  MarkerOptions,
  CameraConfig,
  MapClickEvent,
  MarkerClickEvent,
} from './maps.models';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private map?: GoogleMap;
  private markers = new Map<string, MarkerOptions>();
  private mapId = 0;

  /**
   * Create Google Map
   *
   * 💡 INTERVIEW: Google Maps requires an HTML element container.
   * The map is rendered natively on iOS/Android, as DOM element on web.
   */
  async createMap(
    element: HTMLElement,
    config: MapConfig
  ): Promise<GoogleMap> {
    try {
      this.mapId++;

      this.map = await GoogleMap.create({
        id: \`map-\${this.mapId}\`,
        element,
        apiKey: environment.googleMaps.webApiKey,
        config: {
          center: config.center,
          zoom: config.zoom,

          // iOS/Android specific
          androidLiteMode: false,  // Full 3D rendering

          // Optional configurations
          ...(config.mapType && { mapTypeId: config.mapType }),
          ...(config.gestureHandling && { gestureHandling: config.gestureHandling }),
          ...(config.styles && { styles: config.styles }),
        },
        forceCreate: true,  // Recreate if exists
      });

      // Setup event listeners
      this.setupMapListeners();

      return this.map;
    } catch (error) {
      console.error('Failed to create Google Map:', error);
      throw error;
    }
  }

  /**
   * Destroy Map
   *
   * 💡 INTERVIEW: Always destroy maps to prevent memory leaks,
   * especially when navigating away from map pages
   */
  async destroyMap(): Promise<void> {
    if (this.map) {
      await this.map.destroy();
      this.map = undefined;
      this.markers.clear();
    }
  }

  /**
   * Add Marker
   */
  async addMarker(options: MarkerOptions): Promise<string> {
    if (!this.map) throw new Error('Map not initialized');

    const markerId = options.id || this.generateMarkerId();

    await this.map.addMarker({
      coordinate: options.position,
      title: options.title,
      snippet: options.snippet,

      // Icon configuration
      ...(options.icon && {
        iconUrl: options.icon.url,
        iconSize: options.icon.size,
        iconAnchor: options.icon.anchor,
      }),

      // Marker behavior
      draggable: options.draggable || false,
      opacity: options.opacity || 1.0,
      isFlat: false,  // 3D marker (rotates with map)

      // Custom marker ID
      metadata: { id: markerId },
    });

    this.markers.set(markerId, options);
    return markerId;
  }

  /**
   * Add Multiple Markers
   *
   * 💡 INTERVIEW: Batch adding markers is more efficient than
   * adding one by one, especially for large datasets
   */
  async addMarkers(markers: MarkerOptions[]): Promise<string[]> {
    const markerIds: string[] = [];

    for (const marker of markers) {
      const id = await this.addMarker(marker);
      markerIds.push(id);
    }

    return markerIds;
  }

  /**
   * Remove Marker
   */
  async removeMarker(markerId: string): Promise<void> {
    if (!this.map) return;

    await this.map.removeMarker(markerId);
    this.markers.delete(markerId);
  }

  /**
   * Clear All Markers
   */
  async clearMarkers(): Promise<void> {
    if (!this.map) return;

    const markerIds = Array.from(this.markers.keys());
    await this.map.removeMarkers(markerIds);
    this.markers.clear();
  }

  /**
   * Set Camera Position
   *
   * 💡 INTERVIEW: Camera controls the viewport. Use animate: true
   * for smooth transitions, especially when following user location
   */
  async setCamera(config: CameraConfig): Promise<void> {
    if (!this.map) return;

    await this.map.setCamera({
      coordinate: config.coordinate,
      zoom: config.zoom,
      bearing: config.bearing || 0,
      angle: config.tilt || 0,
      animate: config.animate !== false,
      animationDuration: config.duration || 300,
    });
  }

  /**
   * Fit Bounds to Show All Markers
   *
   * 💡 INTERVIEW: Useful for store locators - automatically
   * zoom to show all locations with appropriate padding
   */
  async fitBounds(positions: LatLng[], padding = 50): Promise<void> {
    if (!this.map || positions.length === 0) return;

    const bounds = this.calculateBounds(positions);

    await this.map.fitBounds({
      bounds: {
        southwest: bounds.southwest,
        northeast: bounds.northeast,
      },
      padding,
    });
  }

  /**
   * Calculate Bounds from Positions
   */
  private calculateBounds(positions: LatLng[]) {
    let minLat = positions[0].lat;
    let maxLat = positions[0].lat;
    let minLng = positions[0].lng;
    let maxLng = positions[0].lng;

    positions.forEach(pos => {
      minLat = Math.min(minLat, pos.lat);
      maxLat = Math.max(maxLat, pos.lat);
      minLng = Math.min(minLng, pos.lng);
      maxLng = Math.max(maxLng, pos.lng);
    });

    return {
      southwest: { lat: minLat, lng: minLng },
      northeast: { lat: maxLat, lng: maxLng },
    };
  }

  /**
   * Setup Map Event Listeners
   */
  private setupMapListeners(): void {
    if (!this.map) return;

    // Map clicked
    this.map.setOnMapClickListener((event: MapClickEvent) => {
      console.log('Map clicked:', event.latitude, event.longitude);
    });

    // Marker clicked
    this.map.setOnMarkerClickListener((event: MarkerClickEvent) => {
      console.log('Marker clicked:', event.markerId);
      const marker = this.markers.get(event.markerId);
      if (marker) {
        // Handle marker click
      }
    });

    // Camera moved
    this.map.setOnCameraIdleListener(() => {
      console.log('Camera idle');
      // Good time to load markers for new viewport
    });
  }

  /**
   * Generate Unique Marker ID
   */
  private generateMarkerId(): string {
    return \`marker-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Memory management: Always destroy maps when leaving page to prevent memory leaks',
        'Batch operations: Add multiple markers together for better performance',
        'Camera animation: Use animate: true for smooth UX transitions',
        'Event listeners: Set up listeners for map interactions (click, marker click, camera idle)',
        'Fit bounds: Automatically zoom to show all relevant markers with padding',
      ],
    },
  ],
};
