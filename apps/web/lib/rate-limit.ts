/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Designed for Next.js API routes (Vercel Edge / Node runtimes).
 * For multi-instance deployments this should be backed by Redis/Upstash;
 * this implementation is suitable for a single-instance deployment or
 * as a first layer of protection that blocks most abuse.
 */

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

export interface RateLimitOptions {
  /** Maximum number of requests */
  limit: number;
  /** Window size in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check and increment the rate limit counter for `key`.
 *
 * @param key     Unique identifier — typically `${ip}:${route}` or `${userId}:${route}`
 * @param options Limit and window configuration
 */
export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;

  // Purge expired entries periodically (every ~200 checks)
  if (Math.random() < 0.005) {
    for (const [k, v] of store) {
      if (v.resetAt < now) store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    const fresh: Window = { count: 1, resetAt: now + windowMs };
    store.set(key, fresh);
    return { success: true, remaining: options.limit - 1, resetAt: fresh.resetAt };
  }

  entry.count += 1;
  const remaining = Math.max(0, options.limit - entry.count);
  return {
    success: entry.count <= options.limit,
    remaining,
    resetAt: entry.resetAt,
  };
}

/**
 * Extract the caller's IP address from a Next.js Request.
 * Falls back to "unknown" when headers are absent (e.g. tests).
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
