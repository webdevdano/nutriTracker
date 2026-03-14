"use client";

import { useEffect, useState } from "react";

// Chrome / Android — not yet in TS lib
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-banner-dismissed";

function InstallBanner() {
  const [nativePrompt, setNativePrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already running as installed PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // User already dismissed
    if (localStorage.getItem(DISMISS_KEY)) return;

    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(navigator as unknown as Record<string, unknown>).standalone;

    setIsIOS(ios);

    if (ios) {
      // Only show if in Safari (not already in standalone / Chrome iOS)
      const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
      if (!isSafari) return;
      const t = setTimeout(() => setShow(true), 4000);
      return () => clearTimeout(t);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setNativePrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 4000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const install = async () => {
    if (!nativePrompt) return;
    await nativePrompt.prompt();
    const { outcome } = await nativePrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setShow(false);
    }
  };

  if (!show || installed) return null;

  return (
    <div
      role="dialog"
      aria-label="Install NutriTracker"
      className="fixed bottom-[72px] left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
      style={{ animation: "slide-up 0.35s ease-out" }}
    >
      <div className="relative flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-xl shadow-black/10 dark:border-zinc-700/80 dark:bg-zinc-900">
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4169E1]/10 dark:bg-[#87CEEB]/10">
          <img src="/favicon26_io/android-chrome-192x192.png" alt="" width={28} height={28} className="rounded-lg" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            Add to Home Screen
          </p>

          {isIOS ? (
            <p className="mt-0.5 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              Tap <span className="font-medium text-zinc-700 dark:text-zinc-300">Share</span>{" "}
              <span className="inline-block">⎋</span> then{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">&ldquo;Add to Home Screen&rdquo;</span>
            </p>
          ) : (
            <>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Install for a faster, full-screen experience.
              </p>
              <button
                onClick={install}
                className="mt-2 inline-flex h-8 items-center rounded-full bg-[#4169E1] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black"
              >
                Install →
              </button>
            </>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss install banner"
          className="shrink-0 rounded-full p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

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
        window.dispatchEvent(new CustomEvent("sw:food-log-queued"));
      }
      if (type === "OFFLINE_LOGS_SYNCED") {
        window.dispatchEvent(new CustomEvent("sw:offline-logs-synced", { detail: { count } }));
      }
    };

    navigator.serviceWorker.addEventListener("message", handler);
    return () => navigator.serviceWorker.removeEventListener("message", handler);
  }, []);

  return <InstallBanner />;
}
