/**
 * Host-driven appearance contracts — locale and theme. The host is the single
 * source of truth; it notifies mini apps of changes via the `appearance.*`
 * events and mini apps read current state on demand.
 */

/** Text direction, derived by the host from the locale. */
export type Direction = 'ltr' | 'rtl';

/** User-selected theme preference. `system` follows the OS setting. */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Resolved theme mode actually applied (after `system` resolution). */
export type ThemeMode = 'light' | 'dark';

export interface LocaleState {
  /** Full locale tag, e.g. `en-LK`, `si-LK`, `ta-LK`. */
  locale: string;
  /** Primary language subtag, e.g. `en`, `si`, `ta`. */
  language: string;
  /** Region subtag, e.g. `LK`. */
  region?: string;
  /** Resolved text direction for the locale. */
  direction: Direction;
}

export interface ThemeState {
  /** User-selected theme preference. */
  preference: ThemePreference;
  /** Resolved mode actually applied. */
  mode: ThemeMode;
}

export interface AppearanceState {
  locale: LocaleState;
  theme: ThemeState;
}

export interface AppearanceSdkModule {
  /** Reads the host's active locale. */
  getLocale(): Promise<LocaleState>;
  /** Reads the host's active theme (preference + resolved mode). */
  getTheme(): Promise<ThemeState>;
  /** Current snapshot of host-driven appearance state. */
  state(): AppearanceState;
  /** Subscribe to `appearance.locale.changed` / `appearance.theme.changed`. */
  subscribe(listener: (state: AppearanceState) => void): () => void;
}
