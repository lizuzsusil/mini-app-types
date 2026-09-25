export interface StorageSetOptions {
  ttlMs?: number;
}

export interface StorageSdkModule {
  get(key: string): Promise<string | null>;
  getJson<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: string, options?: StorageSetOptions): Promise<void>;
  setJson(
    key: string,
    value: unknown,
    options?: StorageSetOptions,
  ): Promise<void>;

  remove(key: string): Promise<void>;
  scoped(prefix: string): StorageSdkModule;
  getMany?(keys: string[]): Promise<Array<string | null>>;
  getManyJson?<T = unknown>(keys: string[]): Promise<Array<T | null>>;
}
