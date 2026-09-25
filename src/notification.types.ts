export interface NotificationOpenEvent {
  url?: string;
  data?: Record<string, unknown>;
}

export interface NotificationsRegisterOptions {
  requestPermission?: boolean;
}

export interface NotificationsRegisterResult {
  enabled: boolean;
  token?: string;
}

export interface NotificationsSdkModule {
  isSupported(): boolean;
  register(
    options?: NotificationsRegisterOptions,
  ): Promise<NotificationsRegisterResult>;
  onToken(handler: (token: string) => void): () => void;
  onOpen(handler: (event: NotificationOpenEvent) => void): () => void;
}
