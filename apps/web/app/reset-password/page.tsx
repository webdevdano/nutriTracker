"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset link. Please request a new one.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error ?? "Something went wrong"); return; }
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200/70 bg-green-50 p-8 text-center dark:border-green-800/60 dark:bg-green-950/30">
        <div className="text-4xl">✅</div>
        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Password updated!</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">You can now log in with your new password.</p>
        <a href="/login" className="mt-6 inline-flex h-10 items-center rounded-full bg-[#4169E1] px-6 text-sm font-semibold text-white hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black">
          Go to login
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Choose a new password</h1>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">Must be at least 6 characters.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">New password</span>
          <input
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Confirm password</span>
          <input
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {confirm && password !== confirm && (
            <span className="text-xs text-red-500">Passwords do not match</span>
          )}
        </label>

        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !token}
          className="h-12 rounded-full bg-[#4169E1] px-5 text-base font-semibold text-white transition-colors active:bg-[#3558c4] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black"
        >
          {loading ? "Updating…" : "Set new password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
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
          <Suspense>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
