"use client";

import { useEffect } from "react";

const RELOAD_KEY = "akramslab-chunk-reload";

function isChunkLoadError(message: string, filename?: string) {
  return (
    message.includes("Failed to load chunk") ||
    message.includes("Loading chunk") ||
    Boolean(filename?.includes("/_next/static/chunks/"))
  );
}

/** Reload once when a stale cached bundle references missing build chunks. */
export function ChunkErrorRecovery() {
  useEffect(() => {
    sessionStorage.removeItem(RELOAD_KEY);

    const onError = (event: ErrorEvent) => {
      if (!isChunkLoadError(event.message, event.filename)) return;
      if (sessionStorage.getItem(RELOAD_KEY)) return;

      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    };

    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  return null;
}
