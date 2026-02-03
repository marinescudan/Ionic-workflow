const fs = require('fs');
const path = require('path');

/**
 * Reset to localhost configuration (for PC-only testing)
 */
function resetToLocalhost() {
  const signalingPort = process.env.SIGNALING_PORT || 3001;
  const appPort = process.env.APP_PORT || 8100;

  console.log('\n🔧 Resetting to localhost configuration...\n');

  // Create environment.ts for localhost
  const environmentContent = `// This file can be replaced during build by using the \`fileReplacements\` array.
// \`ng build\` replaces \`environment.ts\` with \`environment.prod.ts\`.
// The list of file replacements can be found in \`angular.json\`.

export const environment = {
  production: false,
  // GraphQL endpoints
  graphqlEndpoint: 'http://localhost:4000/graphql',
  graphqlWsEndpoint: 'ws://localhost:4000/graphql',
  // WebRTC Signaling Server
  signalingServerUrl: 'http://localhost:${signalingPort}',
  // App server port
  appPort: ${appPort},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as \`zone.run\`, \`zoneDelegate.invokeTask\`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
`;

  const envPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
  fs.writeFileSync(envPath, environmentContent);
  console.log('✅ Reset environment.ts to localhost configuration\n');

  // Update .env file for signaling server
  const serverEnvPath = path.join(__dirname, '..', '..', 'webrtc-signaling-server', '.env');
  const serverEnvContent = `PORT=${signalingPort}
ALLOWED_ORIGINS=http://localhost:${appPort}
NODE_ENV=development
`;

  fs.writeFileSync(serverEnvPath, serverEnvContent);
  console.log('✅ Updated signaling server .env for localhost\n');

  console.log('📋 Configuration:');
  console.log('═══════════════════════════════════════');
  console.log(`🔌 Signaling Server: http://localhost:${signalingPort}`);
  console.log(`📱 App Server: http://localhost:${appPort}`);
  console.log('═══════════════════════════════════════\n');
  console.log('ℹ️  This configuration is for PC-only testing.');
  console.log('ℹ️  Run "npm run setup:network" for tablet testing.\n');
}

// Run the setup
try {
  resetToLocalhost();
} catch (error) {
  console.error('❌ Error resetting to localhost:', error);
  process.exit(1);
}
