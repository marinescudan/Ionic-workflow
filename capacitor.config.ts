import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionic.workflow',
  appName: 'Ionic Workflow',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    // Deep linking configuration
    App: {
      // Custom URL scheme: ionic-workflow://
      urlScheme: 'ionic-workflow://',
    },
  },
};

export default config;
