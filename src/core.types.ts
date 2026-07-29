export type PlatformTypeLiteral = 'flutter' | 'web';

export type EventHandler<TPayload = unknown> = (payload: TPayload) => void;

export interface HostDescriptor {
  type: 'flutter' | 'web';
  version: string;
  capabilities: string[];
  sdkVersion: string;
}
