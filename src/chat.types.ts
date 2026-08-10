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

export interface ChatMessage {
    role: "user" | "system";
    content: string; 
}

export interface ModelCompletionOptions {
    model?:string;
    temperature?:number;
    maxTokens?: number;
    [key:string]: unknown;
}