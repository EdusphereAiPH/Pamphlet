// Thin, fire-and-forget analytics. Never blocks rendering, never throws.
// `?s=<placement>` on the QR URL tags where the scan came from; we persist it
// for the session so later page views still carry the source.

export type EventName = "scan" | "hotspot" | "fold" | "flip" | "fallback";

const KEY_SOURCE = "pamphlet:source";
const KEY_SCANNED = "pamphlet:scanned";

function safeGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* private mode, blocked storage — fine */
  }
}

export function getSource(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const fromUrl = new URLSearchParams(window.location.search).get("s");
  if (fromUrl) {
    safeSet(KEY_SOURCE, fromUrl);
    return fromUrl;
  }
  return safeGet(KEY_SOURCE) ?? undefined;
}

export function track(name: EventName, props: Record<string, string | undefined> = {}) {
  if (typeof window === "undefined") return;

  // One "scan" per session, however many times the landing page mounts.
  if (name === "scan") {
    if (safeGet(KEY_SCANNED)) return;
    safeSet(KEY_SCANNED, "1");
  }

  const payload = JSON.stringify({
    name,
    ...props,
    source: getSource(),
    path: window.location.pathname,
    ts: Date.now(),
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/scan", new Blob([payload], { type: "application/json" }));
      return;
    }
  } catch {
    /* fall through to fetch */
  }

  fetch("/api/scan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
