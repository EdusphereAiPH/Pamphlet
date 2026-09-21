// Browser-side helpers for /api/ai. Every call has a hard timeout so the UI can
// fall back instead of spinning forever on booth wifi.

export class AiError extends Error {
  constructor(
    public readonly kind: "timeout" | "network" | "rate_limited" | "not_configured" | "upstream" | "bad_request",
    message?: string,
  ) {
    super(message ?? kind);
  }
}

function kindFromStatus(status: number): AiError["kind"] {
  if (status === 429) return "rate_limited";
  if (status === 503) return "not_configured";
  if (status >= 500) return "upstream";
  return "bad_request";
}

async function post(body: Record<string, unknown>, timeoutMs: number): Promise<Response> {
  let res: Response;
  try {
    res = await fetch("/api/ai", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    throw new AiError(err instanceof DOMException && err.name === "TimeoutError" ? "timeout" : "network");
  }
  if (!res.ok) throw new AiError(kindFromStatus(res.status), String(res.status));
  return res;
}

export async function aiJSON<T>(body: Record<string, unknown>, timeoutMs = 10_000): Promise<T> {
  const res = await post(body, timeoutMs);
  return (await res.json()) as T;
}

export async function aiStream(
  body: Record<string, unknown>,
  onChunk: (text: string) => void,
  timeoutMs = 14_000,
): Promise<void> {
  const res = await post(body, timeoutMs);
  if (!res.body) throw new AiError("upstream", "no body");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      onChunk(decoder.decode(value, { stream: true }));
    }
  } catch {
    throw new AiError("network");
  }
}
