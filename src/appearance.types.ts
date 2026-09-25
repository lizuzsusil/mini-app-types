export type Direction = 'ltr' | 'rtl';

export type ThemePreference = 'light' | 'dark' | 'system';

export type ThemeMode = 'light' | 'dark';

export interface LocaleState {
  locale: string;
  language: string;
  region?: string;
  direction: Direction;
}

export interface ThemeState {
  preference: ThemePreference;
  mode: ThemeMode;
}

export interface AppearanceState {
  locale: LocaleState;
  theme: ThemeState;
}

export interface AppearanceSdkModule {
  getLocale(): Promise<LocaleState>;
  getTheme(): Promise<ThemeState>;
  state(): AppearanceState;
  subscribe(listener: (state: AppearanceState) => void): () => void;
}

export type AppearanceType = {
  theme?: string | ThemeState;
  locale?: string | LocaleState;
};
