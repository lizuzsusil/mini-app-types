import type { ApiSdkModule } from "./api.types";
import type { AppearanceSdkModule } from "./appearance.types";
import type { AuthSdkModule, PermissionsSdkModule } from "./auth.types";
import type { ChatSdkModule } from "./chat.types";
import type { ConfigSdkModule, FlagsSdkModule } from "./config.types";
import type {
	EventHandler,
	HeartbeatOptions,
	HostDescriptor,
	OnEventOptions,
	ReliabilityOptions,
	RpcRequestOptions,
	SdkDebug,
	SdkEventMap,
} from "./core.types";
import type { DeviceSdkModuleWithGuards } from "./device.types";
import type { GicChatSdkModule } from "./gic-chat.types";
import type { HttpSdkModule } from "./http.types";
import type { LinksSdkModule } from "./link.types";
import type { NavigationSdkModule } from "./navigation.types";
import type { NotificationsSdkModule } from "./notification.types";
import type { PlatformSdkModule } from "./platform.types";
import type { StorageSdkModule } from "./storage.types";

export interface MiniAppSdkInterface {
	readonly miniAppId: string;
	readonly version: string;
	readonly traceId: string;
	readonly hostDescriptor: HostDescriptor | null;
	readonly capabilities: readonly string[];
	readonly capabilityVersions: Readonly<Record<string, string>>;

	auth: AuthSdkModule;
	permissions: PermissionsSdkModule;
	flags: FlagsSdkModule;
	config: ConfigSdkModule;
	navigation: NavigationSdkModule;
	storage: StorageSdkModule;
	platform: PlatformSdkModule;
	device: DeviceSdkModuleWithGuards;
	api: ApiSdkModule;
	http: HttpSdkModule;
	appearance: AppearanceSdkModule;
	ai: ChatSdkModule;
	readonly chat: ChatSdkModule;
	notifications: NotificationsSdkModule;
	links: LinksSdkModule;
	gicChat: GicChatSdkModule;
	readonly debug: SdkDebug;

	initialize(): Promise<void>;
	destroy(): void;
	on<K extends keyof SdkEventMap>(
		event: K,
		handler: (payload: SdkEventMap[K]) => void,
		options?: OnEventOptions,
	): () => void;
	on(
		event: string,
		handler: EventHandler,
		options?: OnEventOptions,
	): () => void;
	once<K extends keyof SdkEventMap>(
		event: K,
		options?: OnEventOptions & { signal?: AbortSignal },
	): Promise<SdkEventMap[K]>;
	once(
		event: string,
		options?: OnEventOptions & { signal?: AbortSignal },
	): Promise<unknown>;
	events<K extends keyof SdkEventMap>(
		event: K,
		options?: OnEventOptions & { signal?: AbortSignal },
	): AsyncIterable<SdkEventMap[K]>;
	events(
		event: string,
		options?: OnEventOptions & { signal?: AbortSignal },
	): AsyncIterable<unknown>;
	request<T>(
		namespace: string,
		action: string,
		payload?: unknown,
		options?: RpcRequestOptions,
	): Promise<T>;
	requestSafe<T>(
		namespace: string,
		action: string,
		payload?: unknown,
		options?: RpcRequestOptions,
	): Promise<{ ok: true; value: T } | { ok: false; error: Error }>;
	emit<K extends keyof SdkEventMap>(event: K, data: SdkEventMap[K]): void;
	emit(event: string, data?: unknown): void;
	use(
		middleware: (
			ctx: {
				namespace: string;
				action: string;
				payload: unknown;
				attempt: number;
			},
			next: () => Promise<unknown>,
		) => Promise<unknown>,
	): void;
	addEventInterceptor(
		interceptor: (event: string, payload: unknown) => unknown | false,
	): () => void;
	getMetrics(): {
		totalRequests: number;
		totalSuccesses: number;
		totalFailures: number;
		totalTimeouts: number;
		totalRetries: number;
		averageDurationMs: number;
		percentiles: { p50Ms: number; p95Ms: number; p99Ms: number };
		byAction: Record<string, unknown>;
	};
	registerModule<T>(name: string, factory: (rpc: any) => T): void;
	getModule<T>(name: string): T | undefined;
	getModuleAsync<T>(name: string): Promise<T | undefined>;
	registerLazyModule<T>(
		name: string,
		factory: () => Promise<(rpc: any) => T> | ((rpc: any) => T),
	): void;
	batch(
		requests: Array<{
			namespace: string;
			action: string;
			payload?: unknown;
			options?: RpcRequestOptions;
		}>,
	): Promise<Array<{ ok: true; value: unknown } | { ok: false; error: Error }>>;
	usePlugin(plugin: SdkPlugin): Promise<void>;
}

export interface SdkPlugin {
	name: string;
	install(ctx: {
		sdk: MiniAppSdkInterface;
		rpc: any;
		logger: any;
	}): void | Promise<void>;
	onInitialize?(): Promise<void>;
	onDestroy?(): void;
}

export interface CreateInstanceOptions {
	miniAppId: string;
	channel?: string;
	sdkOptions?: MiniAppSdkOptions;
}

export interface MiniAppSdkOptions {
	miniAppId: string;
	timeout?: number;
	retryAttempts?: number;
	retryDelayMs?: number;
	maxRetryDelayMs?: number;
	targetOrigin?: string;
	registerGlobal?: boolean;
	devMode?: boolean;
	logLevel?: "debug" | "info" | "warn" | "error";
	heartbeat?: HeartbeatOptions;
	metrics?: {
		maxDurationEntries?: number;
		durationsWindowMs?: number;
		onSnapshot?: (snapshot: unknown) => void;
	};
	reliability?: ReliabilityOptions;
	allowCustomEvent?: boolean;
}
