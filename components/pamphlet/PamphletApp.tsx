"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, useSyncExternalStore } from "react";
import { FlatPamphlet } from "./FlatPamphlet";
import { Hud } from "./Hud";
import { Loader } from "./Loader";
import { DebugStats } from "./DebugStats";
import { Sheet } from "./Sheet";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

let webglChecked: "3d" | "flat" | null = null;
function detectMode(): "3d" | "flat" {
  if (webglChecked) return webglChecked;
  try {
    const c = document.createElement("canvas");
    webglChecked = c.getContext("webgl2") || c.getContext("webgl") ? "3d" : "flat";
  } catch {
    webglChecked = "flat";
  }
  return webglChecked;
}
const noop = () => () => {};

export function PamphletApp() {
  // Server renders "pending"; the client resolves WebGL support once, without a re-render loop.
  const mode = useSyncExternalStore(noop, detectMode, () => "pending" as const);
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [ready, setReady] = useState(false);

  const onTap = useCallback((id: string) => {
    setFocusId(id);
  }, []);
  const onReady = useCallback(() => setReady(true), []);
  const onMiss = useCallback(() => setFocusId(null), []);

  function toggleOpen() {
    setOpen((o) => !o);
  }
  function flip() {
    setFlipped((f) => !f);
  }
  function reset() {
    setFocusId(null);
    setResetKey((k) => k + 1);
  }

  if (mode === "flat") {
    return (
      <>
        <FlatPamphlet onTap={onTap} />
        <Sheet id={focusId} onClose={() => setFocusId(null)} />
        <DebugStats mode="fallback" />
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-ink">
      {mode === "3d" && (
        <Scene open={open} flipped={flipped} focusId={focusId} resetKey={resetKey} onTap={onTap} onReady={onReady} onMiss={onMiss} />
      )}
      <Hud open={open} flipped={flipped} focused={focusId !== null} ready={ready} onToggleOpen={toggleOpen} onFlip={flip} onReset={reset} />
      <Sheet id={focusId} onClose={() => setFocusId(null)} />
      <Loader show={!ready} />
      <DebugStats mode="3d" />
    </div>
  );
}
