/**
 * Host-driven appearance contracts — locale, theme, design tokens, and
 * translation catalogs. The host is the single source of truth for all of
 * these; mini apps read state and react to `appearance.*` events.
 */

/** Text direction, derived by the host from the locale. */
export type Direction = 'ltr' | 'rtl';

/** User-selected theme preference. `system` follows the OS setting. */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Resolved theme mode actually applied (after `system` resolution). */
export type ThemeMode = 'light' | 'dark';

export interface LocaleState {
  /** Full locale tag, e.g. `en-NP`, `si-LK`, `ta-LK`. */
  locale: string;
  /** Primary language subtag, e.g. `en`, `si`, `ta`. */
  language: string;
  /** Region subtag, e.g. `NP`, `LK`. */
  region?: string;
  /** Resolved text direction for the locale. */
  direction: Direction;
}

export interface ThemeState {
  /** User-selected theme preference. */
  preference: ThemePreference;
  /** Resolved mode actually applied. */
  mode: ThemeMode;
  /**
   * Canonical design tokens serialized as CSS custom properties, e.g.
   * `{ '--gov-primary': '#dc9a0d' }`. Applied by the host; exposed here for
   * JS consumers (charts, canvas, inline styles).
   */
  tokens: Record<string, string>;
}

export interface TranslationBundle {
  locale: string;
  /** Catalog namespace: `shell`, `shared`, or `app.<moduleId>`. */
  namespace: string;
  /** Bundle version for cache invalidation. */
  version: string;
  messages: Record<string, string>;
}

export interface AppearanceState {
  locale: LocaleState;
  theme: ThemeState;
}

export interface AppearanceSdkModule {
  getLocale(): Promise<LocaleState>;
  getTheme(): Promise<ThemeState>;
  getTokens(): Promise<Record<string, string>>;
  getMessages(
    locale: string,
    namespace: string,
  ): Promise<TranslationBundle | null>;
  /**
   * Synchronous, cache-backed translation with `{param}` interpolation and a
   * fallback chain. Safe to call in render loops — never performs RPC.
   */
  t(
    key: string,
    params?: Record<string, string | number>,
    options?: { locale?: string },
  ): string;
  /** Current snapshot of host-driven appearance state. */
  state(): AppearanceState;
  /** Subscribe to host-driven appearance changes. Returns unsubscribe. */
  subscribe(listener: (state: AppearanceState) => void): () => void;
}
