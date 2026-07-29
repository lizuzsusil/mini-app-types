import type { EventHandler, HostDescriptor } from './core.types';
import type { AuthSdkModule, PermissionsSdkModule } from './auth.types';
import type { ConfigSdkModule, FlagsSdkModule } from './config.types';
import type { NavigationSdkModule } from './navigation.types';
import type { PlatformSdkModule } from './platform.types';
import type { DeviceSdkModule } from './device.types';
import type { StorageSdkModule } from './storage.types';
import type { HttpSdkModule } from './http.types';
import type { ApiSdkModule } from './api.types';

export interface MiniAppSdkInterface {
  readonly miniAppId: string;
  readonly version: string;
  readonly traceId: string;
  readonly hostDescriptor: HostDescriptor | null;
  readonly capabilities: readonly string[];

  auth: AuthSdkModule;
  permissions: PermissionsSdkModule;
  flags: FlagsSdkModule;
  config: ConfigSdkModule;
  navigation: NavigationSdkModule;
  storage: StorageSdkModule;
  platform: PlatformSdkModule;
  device: DeviceSdkModule;
  api: ApiSdkModule;
  http: HttpSdkModule;

  initialize(): Promise<void>;
  destroy(): void;
  on(event: string, handler: EventHandler): () => void;
  emit(event: string, data?: unknown): void;
}

export interface CreateInstanceOptions {
  miniAppId: string;
  channel?: string;
  sdkOptions?: MiniAppSdkOptions;
}

export interface MiniAppSdkOptions {
  miniAppId: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelayMs?: number;
  maxRetryDelayMs?: number;
  targetOrigin?: string;
  registerGlobal?: boolean;
}
