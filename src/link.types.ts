export interface LinksOpenOptions {
  /**
   * When true, asks the host to open the link inside the host app rather
   * than handing off to the system browser.
   */
  inApp?: boolean;
}

/** Payload of `links.opened`: a deep link the host resolved into this mini app. */
export interface LinksOpenedEvent {
  url: string;
  /** Query/route params the host extracted from the link, when available. */
  params?: Record<string, unknown>;
}

export interface LinksSdkModule {
    isSupported?: boolean;
    open(url: string ,options?: LinksOpenOptions) : Promise<void>;
    onOpen(handler: (event:LinksOpenedEvent) => void): () => void;
}