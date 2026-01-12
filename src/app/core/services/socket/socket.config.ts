// src/app/core/services/socket/socket.config.ts

import { InjectionToken } from '@angular/core';

export interface SocketConfig {
  url: string;
  options?: {
    transports?: string[];
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    reconnectionDelayMax?: number;
    timeout?: number;
    autoConnect?: boolean;
  };
}

export const SOCKET_CONFIG = new InjectionToken<SocketConfig>('SOCKET_CONFIG');

export const defaultSocketConfig: SocketConfig = {
  // Replace with your backend URL
  url: 'http://localhost:3000',
  options: {
    // Try WebSocket first, fallback to polling
    transports: ['websocket', 'polling'],

    // Reconnection settings
    reconnection: true,              // Enable auto-reconnection
    reconnectionAttempts: 5,         // Try 5 times
    reconnectionDelay: 1000,         // Start with 1 second
    reconnectionDelayMax: 5000,      // Max 5 seconds between attempts

    // Connection timeout
    timeout: 10000,                  // 10 seconds

    // Manual connection control
    autoConnect: false,              // Connect manually (better control)
  },
};

/*
💡 INTERVIEW: Socket.IO Configuration
- transports: WebSocket is faster, polling is fallback
- reconnection: Essential for mobile apps (network switching)
- autoConnect: false gives you control over when to connect
- Exponential backoff: Prevents overwhelming server during outages
- timeout: Prevents hanging connections
*/
