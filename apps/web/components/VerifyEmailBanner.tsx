"use client";

import { useState } from "react";

export default function VerifyEmailBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (dismissed) return null;

  async function handleResend() {
    setLoading(true);
    try {
      await fetch("/api/auth/resend-verification", { method: "POST" });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-amber-300/50 bg-amber-50 px-5 py-4 dark:border-amber-700/40 dark:bg-amber-950/30">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-lg">✉️</span>
        <div>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            Verify your email address
          </p>
          {sent ? (
            <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-400">
              Verification email sent — check your inbox (and spam folder).
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-400">
              Check your inbox for a verification link.{" "}
              <button
                onClick={handleResend}
                disabled={loading}
                className="font-medium underline underline-offset-2 disabled:opacity-60"
              >
                {loading ? "Sending…" : "Resend email"}
              </button>
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="mt-0.5 shrink-0 rounded p-0.5 text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
