import type { AppearanceType, LocaleState, ThemeState } from "./appearance.types";
import type { ApiUploadProgress } from "./api.types";
import type { LinksOpenedEvent } from "./link.types";
import type { NotificationOpenEvent } from "./notification.types";

export type PlatformTypeLiteral = 'flutter' | 'web';
export type PlatformTypes = 'flutter' | 'web';

export type EventHandler<TPayload = unknown> = (payload: TPayload) => void;

export interface HostDescriptor {
  type: 'flutter' | 'web';
  version: string;
  capabilities: string[];
  sdkVersion: string;
}

export type { AppearanceState, Direction, LocaleState, ThemeMode, ThemePreference, ThemeState } from './appearance.types';
export type { AppearanceType } from './appearance.types';

export type PlatformTypeResponse = {
  type?: PlatformTypes;
  types?: PlatformTypes;
  appearance?: AppearanceType;
};

export interface SdkEventMap {
  'appearance.locale.changed': string | LocaleState;
  'appearance.theme.changed': string | ThemeState;
  'navigation.back.requested': undefined;
  'navigation.route.changed': {
    previous: string;
    current: string;
    canGoBack: boolean;
  };
  'connection.lost': { timestamp: number };
  'connection.established': { timestamp: number };
	'api.uploadProgress': ApiUploadProgress;
  'notifications.token': string;
  'notifications.opened': NotificationOpenEvent;
  'links.opened': LinksOpenedEvent;
}

export interface OnEventOptions {
  replay?: boolean;
  signal?: AbortSignal;
}

export type SdkStatus = 'initializing' | 'ready' | 'destroyed';

export interface PendingRequestInfo {
  requestId: string;
  namespace: string;
  action: string;
  elapsedMs: number;
}

export type DiagnosticSeverity = 'info' | 'warn' | 'error';
export interface Diagnostic {
  code: string;
  severity: DiagnosticSeverity;
  message: string;
  details?: Record<string, unknown>;
}

export interface SdkDebugSnapshot {
  sdkVersion: string;
  protocolVersion: string;
  miniAppId: string;
  traceId: string;
  platformType: PlatformTypeLiteral;
  capabilities: readonly string[];
  status: SdkStatus;
  transport: { started: boolean; pinnedOrigin?: string | null };
  metrics: {
    totalRequests: number;
    totalSuccesses: number;
    totalFailures: number;
    totalTimeouts: number;
    totalRetries: number;
    averageDurationMs: number;
    percentiles: { p50Ms: number; p95Ms: number; p99Ms: number };
    byAction: Record<string, { count: number; successes: number; failures: number; timeouts: number; retries: number; totalDurationMs: number; averageDurationMs: number; percentiles: { p50Ms: number; p95Ms: number; p99Ms: number } }>
  };
  pendingRequests: PendingRequestInfo[];
  registeredModules: string[];
}

export interface SdkDebug {
  snapshot(): SdkDebugSnapshot;
  diagnose(): Diagnostic[];
}

export type { Transport, TransportDebugInfo, DefaultTransportOptions, WebSocketTransportOptions } from "./transport.types";

export interface HeartbeatOptions {
  intervalMs?: number;
  timeoutMs?: number;
  maxMissedPongs?: number;
}

export interface CircuitBreakerOptions {
  threshold?: number;
  windowMs?: number;
  openMs?: number;
}

export interface AdaptiveTimeoutOptions {
  enabled?: boolean;
  factor?: number;
  minMs?: number;
  maxMs?: number;
}

export interface ReliabilityOptions {
  circuitBreaker?: CircuitBreakerOptions;
  adaptiveTimeout?: AdaptiveTimeoutOptions;
}

export interface RpcRequestOptions {
  signal?: AbortSignal;
  mapPayload?: (payload: unknown) => unknown;
  dedupe?: boolean;
}

export interface RpcStreamOptions {
  signal?: AbortSignal;
}
