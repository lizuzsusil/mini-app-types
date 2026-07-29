import type { PlatformTypeLiteral } from './core.types';

export interface PlatformSdkModule {
  readonly type: PlatformTypeLiteral;
  isWeb(): boolean;
  isFlutter(): boolean;
  isMobile(): boolean;
}
