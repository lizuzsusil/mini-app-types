/**
 * Offline queue — queued when `navigator.onLine === false` or `connection.lost`,
 * flushed on `online` / `connection.established`. Host-agnostic.
 */
export interface OfflineQueueOptions {
  /** Allowlisted namespaces that may be queued when offline. Default: ['storage','api','navigation'] */
  allowlist?: string[];
  /** Max entries before overflow. Default: 50 */
  maxEntries?: number;
  /** TTL in ms before queued entry expires. Default: 5*60*1000 */
  ttlMs?: number;
}
