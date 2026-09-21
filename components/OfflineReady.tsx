"use client";

import { useEffect } from "react";

// Registers the service worker (public/sw.js) so a loaded pamphlet keeps working
// when the venue Wi-Fi drops. Production only; dev keeps hot reload simple.
export function OfflineReady() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}
