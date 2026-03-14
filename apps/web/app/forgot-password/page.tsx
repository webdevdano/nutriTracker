"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Something went wrong");
        return;
      }
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-black">
      <header className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-900">
        <a href="/login" className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900" aria-label="Back">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </a>
        <span className="text-sm font-semibold text-[#4169E1] dark:text-[#87CEEB]">NutriTracker</span>
      </header>

      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        <div className="mx-auto w-full max-w-sm">
          {sent ? (
            <div className="rounded-2xl border border-blue-200/70 bg-blue-50 p-8 text-center dark:border-blue-800/60 dark:bg-blue-950/30">
              <div className="text-4xl">📬</div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Check your inbox</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                If <strong>{email}</strong> has an account, we sent a password reset link. It expires in 1 hour.
              </p>
              <p className="mt-2 text-xs text-zinc-400">Check your spam folder if you don&apos;t see it.</p>
              <a href="/login" className="mt-6 inline-flex h-10 items-center rounded-full bg-[#4169E1] px-6 text-sm font-semibold text-white hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black">
                Back to login
              </a>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Enter your email and we&apos;ll send a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                {error && (
                  <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 rounded-full bg-[#4169E1] px-5 text-base font-semibold text-white transition-colors active:bg-[#3558c4] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black"
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Remembered it?{" "}
                <a href="/login" className="font-semibold text-[#4169E1] dark:text-[#87CEEB]">Log in</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
