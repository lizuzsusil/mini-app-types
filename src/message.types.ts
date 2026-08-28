export type MessageType = 'request' | 'response' | 'event' | 'handshake' | 'stream';

export interface PlatformError {
  code: string;
  message: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
}

export interface PlatformMessage<TPayload = unknown> {
  channel: string;
  requestId: string;
  type: MessageType;
  namespace: string;
  action: string;
  source: string;
  target: string;
  gsaProtocolVersion: string;
  payload?: TPayload;
  error?: PlatformError;
  traceId: string;
  timestamp: number;
  streamIndex?: number;
  streamTotal?: number;
  streamLast?: boolean;
}

export interface HandshakePayload {
  miniAppId: string;
  sdkVersion: string;
  protocolVersion: string;
  protocolVersionRange?: string;
  capabilities: readonly string[];
}

export interface HandshakeAckPayload {
  status?: 'ok' | 'rejected';
  reason?: string;
  protocolVersion?: string;
  supportedVersions?: readonly string[];
  capabilities?: readonly string[] | Record<string, string>;
}
