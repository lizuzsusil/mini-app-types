export type MessageType = 'request' | 'response' | 'event' | 'handshake';

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
}

export interface HandshakePayload {
  miniAppId: string;
  sdkVersion: string;
  protocolVersion: string;
  capabilities: string[];
}

export interface HandshakeAckPayload {
  status?: 'ok' | 'rejected';
  reason?: string;
  protocolVersion?: string;
  capabilities?: string[];
}
