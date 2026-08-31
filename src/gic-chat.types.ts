/** GIC Chat — GIC-specific. Generic chat is Chat* in chat.types.ts */
export interface GicChatSession {
  status?: string;
  user_id: string;
  session_id: string;
}

export interface GicChatStreamRequest {
  user_id: string;
  session_id: string;
  message: string;
}

export type GicChatEventType =
  | "tool_call"
  | "tool_result"
  | "keep_alive"
  | "token"
  | "meta"
  | "done"
  | "error";

export interface GicChatEventBase {
  type: GicChatEventType | string;
  [key: string]: unknown;
}

export interface GicChatToolCallEvent extends GicChatEventBase {
  type: "tool_call";
}

export interface GicChatToolResultEvent extends GicChatEventBase {
  type: "tool_result";
}

export interface GicChatKeepAliveEvent extends GicChatEventBase {
  type: "keep_alive";
}

export interface GicChatTokenEvent extends GicChatEventBase {
  type: "token";
  text: string;
  /** Additive — e.g. citations, reasoning */
  [key: string]: unknown;
}

export interface GicChatMetaEvent extends GicChatEventBase {
  type: "meta";
  invocation_id: string;
  [key: string]: unknown;
}

export interface GicChatDoneEvent extends GicChatEventBase {
  type: "done";
}

export interface GicChatErrorEvent extends GicChatEventBase {
  type: "error";
  detail: string;
  [key: string]: unknown;
}

/** Unknown future event — open union keeps old SDK forward-compatible */
export interface GicChatUnknownEvent extends GicChatEventBase {
  type: string;
}

export type GicChatKnownEvent =
  | GicChatToolCallEvent
  | GicChatToolResultEvent
  | GicChatKeepAliveEvent
  | GicChatTokenEvent
  | GicChatMetaEvent
  | GicChatDoneEvent
  | GicChatErrorEvent;

export type GicChatEvent = GicChatKnownEvent | GicChatUnknownEvent;

export interface GicChatStreamOptions {
  signal?: AbortSignal;
  /** Called for each SSE event as it arrives (including keep_alive). */
  onEvent?: (event: GicChatEvent) => void;
}

/** GIC chat module — GIC_CHAT.STREAM with GicChatStreamRequest + GicChatEvent, session via GIC_CHAT.START_SESSION (gated by HTTP) */
export interface GicChatSdkModule {
  /** Initializes a new chat session — `POST /start-session` → {user_id, session_id}. */
  startSession(): Promise<GicChatSession>;
  stream(
    request: GicChatStreamRequest,
    options?: GicChatStreamOptions,
  ): Promise<{ invocation_id?: string }>;
  streamText(
    request: GicChatStreamRequest,
    options?: GicChatStreamOptions,
  ): Promise<{ text: string; invocation_id?: string }>;
}
