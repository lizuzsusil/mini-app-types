export interface StreamChunk {
    data: Uint8Array | string;
    index: number;
    total?:number;
    last: boolean;
}

export interface StreamError {
    code: string;
    message: string;
    retryable?: boolean
}

/** Generic chat — NOT GIC. For GIC use GicChat* in gic-chat.types.ts */
export interface ChatMessage {
    role: "user" | "system";
    content: string; 
}

export interface ChatRequestOptions {
    signal?: AbortSignal
}

export interface ModelCompletionOptions {
    model?:string;
    temperature?:number;
    maxTokens?: number;
    [key:string]: unknown;
}

/** Generic chat module — HTTP.CHAT_STREAM with ChatMessage[] (kept for host ShellServiceMap, not exposed via SDK's MiniAppSdk.chat) */
export interface ChatSdkModule {
    chat(
        messages: ChatMessage[],
        options?: ModelCompletionOptions,
        requestOptions?: ChatRequestOptions
    ): Promise<unknown>
}

