// Per-IP fixed-window limiter. In-memory, so it's per serverless instance —
// not airtight, but enough to stop one phone in a loop from running up the bill
// during a one-day event.

const buckets = new Map<string, { count: number; resetAt: number }>();

export function allow(key: string, limit = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}
