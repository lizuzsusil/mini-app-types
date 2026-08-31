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
  type: GicChatEventType;
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
}

export interface GicChatMetaEvent extends GicChatEventBase {
  type: "meta";
  invocation_id: string;
}

export interface GicChatDoneEvent extends GicChatEventBase {
  type: "done";
}

export interface GicChatErrorEvent extends GicChatEventBase {
  type: "error";
  detail: string;
}

export type GicChatEvent =
  | GicChatToolCallEvent
  | GicChatToolResultEvent
  | GicChatKeepAliveEvent
  | GicChatTokenEvent
  | GicChatMetaEvent
  | GicChatDoneEvent
  | GicChatErrorEvent;

export interface GicChatStreamOptions {
  signal?: AbortSignal;
  /** Called for each SSE event as it arrives (including keep_alive). */
  onEvent?: (event: GicChatEvent) => void;
}

export interface GicChatSdkModule {
  /** Initializes a new chat session — `POST /start-session` → {user_id, session_id}. */
  startSession(): Promise<GicChatSession>;
  /**
   * Sends a user message and streams the response.
   * Validates `message` 1..200 chars locally before RPC.
   * Resolves with `{invocation_id}` from the `meta` event; rejects on `error` event or 404 session.
   * `onEvent` receives every SSE event for UI indicators (tool_call/tool_result/keep_alive/token/meta/done/error).
   */
  stream(
    request: GicChatStreamRequest,
    options?: GicChatStreamOptions,
  ): Promise<{ invocation_id?: string }>;
  /** Convenience: stream and collect token texts into a single string. */
  streamText(
    request: GicChatStreamRequest,
    options?: GicChatStreamOptions,
  ): Promise<{ text: string; invocation_id?: string }>;
}
