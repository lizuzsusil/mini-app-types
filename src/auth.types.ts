export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  fullName?: string;
  nationalId?: string;
  roles: string[];
  permissions: string[];
  avatar?: string;
}

export interface AuthSdkModule {
  getUser(): Promise<PlatformUser | null>;
  isAuthenticated(): Promise<boolean>;
  logout(): Promise<void>;
}

/**
 * @deprecated The permissions module is deprecated and will be removed in a future major version.
 * Use host capability / device guard checks instead (e.g. `sdk.device.isSupported()` or capability gating).
 * Retained for backward compatibility only.
 */
export interface PermissionsSdkModule {
  /** @deprecated `permissions.has()` is deprecated — will be removed in a future major version */
  has(permission: string): Promise<boolean>;
  /** @deprecated `permissions.list()` is deprecated — will be removed in a future major version */
  list(): Promise<string[]>;
}
