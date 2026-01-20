"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    // Disable for now - service worker not deployed to Vercel
    // Will re-enable once we have proper SW setup
    if (false && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
