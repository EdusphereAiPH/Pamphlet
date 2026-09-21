"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// Frame-rate and device readout, shown only when the URL has ?debug. For real-device
// testing before the event; not linked from anywhere.
const enabled = () => typeof location !== "undefined" && new URLSearchParams(location.search).has("debug");
const noop = () => () => {};

export function DebugStats({ mode }: { mode: string }) {
  const on = useSyncExternalStore(noop, enabled, () => false);
  const [fps, setFps] = useState(0);
  const [low, setLow] = useState(999);
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (!on) return;
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      if (frames === 0 && last === 0) return;
      if (!info) {
        const c = document.createElement("canvas");
        const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
        const dbg = gl?.getExtension("WEBGL_debug_renderer_info");
        const gpu = gl && dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "no WebGL";
        setInfo(`${gpu} · dpr ${devicePixelRatio} · ${innerWidth}×${innerHeight} · ${navigator.hardwareConcurrency ?? "?"} cores`);
      }
      frames++;
      if (t - last >= 1000) {
        const f = Math.round((frames * 1000) / (t - last));
        setFps(f);
        setLow((l) => Math.min(l, f));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, info]);

  if (!on) return null;
  return (
    <div className="pointer-events-none fixed left-3 top-[calc(max(0.75rem,env(safe-area-inset-top))+3.5rem)] z-50 max-w-[80vw] rounded-[10px] bg-black/70 px-3 py-2 font-mono text-[11px] leading-snug text-paper">
      <div>
        {fps} fps · low {low === 999 ? "–" : low} · {mode}
      </div>
      <div className="text-muted-dark">{info}</div>
    </div>
  );
}
