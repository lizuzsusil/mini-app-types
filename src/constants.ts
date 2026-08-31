export const PROTOCOL_VERSION = '1.0.0';
export const MESSAGE_CHANNEL = 'gov-platform-sdk';
export const PLATFORM_EVENT_NAME = 'gov-platform-event';
export const HOST_TARGET = 'shell';
export const BROADCAST_TARGET = '*';
export const HOST_DESCRIPTOR_GLOBAL_KEY = '__GSA_HOST_DESCRIPTOR__';
export const SDK_GLOBAL_KEY = '__GSA_SDK__';

export const NAMESPACES = {
  AUTH: 'auth',
  PERMISSIONS: 'permissions',
  FLAGS: 'flags',
  CONFIG: 'config',
  NAVIGATION: 'navigation',
  PLATFORM: 'platform',
  DEVICE: 'device',
  API: 'api',
  STORAGE: 'storage',
  HTTP: 'http',
  APPEARANCE: 'appearance',
  AI: 'ai',
  NOTIFICATIONS: 'notifications',
  LINKS: 'links',
  EVENT: 'event',
  HANDSHAKE: 'handshake',
  HEARTBEAT: 'heartbeat',
  GIC_CHAT: 'gic-chat',
} as const;

export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];

export const SDK_CAPABILITIES: readonly string[] = [
  NAMESPACES.AUTH,
  NAMESPACES.PERMISSIONS,
  NAMESPACES.FLAGS,
  NAMESPACES.CONFIG,
  NAMESPACES.NAVIGATION,
  NAMESPACES.PLATFORM,
  NAMESPACES.DEVICE,
  NAMESPACES.STORAGE,
  NAMESPACES.API,
  NAMESPACES.HTTP,
  NAMESPACES.APPEARANCE,
  NAMESPACES.AI,
  NAMESPACES.NOTIFICATIONS,
  NAMESPACES.LINKS,
  NAMESPACES.GIC_CHAT,
];

export const ACTIONS = {
  AUTH: { GET_USER: 'getUser', IS_AUTHENTICATED: 'isAuthenticated', LOGOUT: 'logout' },
  PERMISSIONS: { HAS: 'has', LIST: 'list' },
  FLAGS: { IS_ENABLED: 'isEnabled', GET_ALL: 'getAll' },
  CONFIG: { GET: 'get', GET_ALL: 'getAll' },
  AI: { CHAT: 'chat', CANCEL: 'cancel' },
  NAVIGATION: { NAVIGATE: 'navigate', GET_CURRENT: 'getCurrent', ROUTER: 'router' },
  PLATFORM: { GET_TYPE: 'getType' },
  DEVICE: {
    LOCATION: 'location',
    CAMERA: 'camera',
    GALLERY: 'gallery',
    FILES: 'files',
    DOWNLOAD: 'download',
    CONTACT: 'contact',
    BIOMETRIC: 'biometric',
    NOTIFICATIONS: 'notifications',
    NETWORK: 'network',
    INFO: 'info',
    SHARE: 'share',
    CLIPBOARD_WRITE: 'clipboardWrite',
    CLIPBOARD_READ: 'clipboardRead',
    HAPTICS: 'haptics',
    REVIEW: 'review',
  },
  HTTP: {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
    STREAM: 'stream',
    GET_STREAM: 'getStream',
  },
  STORAGE: { GET: 'get', SET: 'set', REMOVE: 'remove' },
  API: { REQUEST: 'request' },
  APPEARANCE: {
    GET_LOCALE: 'getLocale',
    GET_THEME: 'getTheme',
  },
  NOTIFICATIONS: { REGISTER: 'register' },
  LINKS: { OPEN: 'open' },
  GIC_CHAT: { START_SESSION: 'startSession', STREAM: 'stream' },
  EVENT: { SUBSCRIBE: 'subscribe', UNSUBSCRIBE: 'unsubscribe', EMIT: 'emit' },
  HANDSHAKE: { CONNECT: 'connect' },
  HEARTBEAT: { PING: 'ping' },
} as const;

export const NAVIGATION_EVENTS = {
  BACK_REQUESTED: 'navigation.back.requested',
  ROUTE_CHANGED: 'navigation.route.changed',
} as const;

export const CONNECTION_EVENTS = {
  LOST: 'connection.lost',
  ESTABLISHED: 'connection.established',
} as const;

export const HTTP_EVENTS = {
  UPLOAD_PROGRESS: 'http.uploadProgress',
} as const;

export const NOTIFICATIONS_EVENTS = {
  TOKEN: 'notifications.token',
  OPENED: 'notifications.opened',
} as const;

export const LINKS_EVENTS = {
  OPENED: 'links.opened',
} as const;
