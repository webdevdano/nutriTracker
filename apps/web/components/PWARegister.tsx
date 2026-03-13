"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);
      })
      .catch((err) => {
        console.warn("Service Worker registration failed:", err);
      });

    // Listen for messages from the SW (offline queue / sync notifications)
    const handler = (event: MessageEvent) => {
      const { type, count } = event.data ?? {};
      if (type === "FOOD_LOG_QUEUED") {
        // Dispatch a custom DOM event — Toast component in the page can listen
        window.dispatchEvent(new CustomEvent("sw:food-log-queued"));
      }
      if (type === "OFFLINE_LOGS_SYNCED") {
        window.dispatchEvent(new CustomEvent("sw:offline-logs-synced", { detail: { count } }));
      }
    };

    navigator.serviceWorker.addEventListener("message", handler);
    return () => navigator.serviceWorker.removeEventListener("message", handler);
  }, []);

  return null;
}
