"use client";

import { useEffect } from "react";
import { track, type EventName } from "@/lib/analytics";

export function Beacon({ event, audience }: { event: EventName; audience?: string }) {
  useEffect(() => {
    track(event, audience ? { audience } : {});
  }, [event, audience]);
  return null;
}
