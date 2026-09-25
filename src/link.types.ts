export interface LinksOpenOptions {
  inApp?: boolean;
}

export interface LinksOpenedEvent {
  url: string;
  params?: Record<string, unknown>;
}

export interface LinksSdkModule {
    isSupported?: boolean;
    open(url: string ,options?: LinksOpenOptions) : Promise<void>;
    onOpen(handler: (event:LinksOpenedEvent) => void): () => void;
}