import type { PlatformMessage } from "./message.types";

export interface TransportDebugInfo {
  started: boolean;
  pinnedOrigin?: string | null;
}

export interface Transport {
  start(onMessage: (message: PlatformMessage) => void): void;
  stop(): void;
  send(message: PlatformMessage): void;
  getDebugInfo?(): TransportDebugInfo;
}

export interface DefaultTransportOptions {
  allowedOrigin?: string;
  allowCustomEvent?: boolean;
  warnOnBroadcast?: boolean;
}

export interface WebSocketTransportOptions {
  url: string;
  protocols?: string | string[];
  socket?: WebSocket;
}
