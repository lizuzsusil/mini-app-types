export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error';

export interface ConsoleLoggerOptions {
  minLevel?: LoggerLevel;
  prefix?: string;
  redact?: Set<string> | ((key: string, value: unknown) => boolean);
  deep?: boolean;
  format?: 'text' | 'json';
}

export interface Logger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
}
