"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    window.location.href = "/app";
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-black">
      {/* Mobile header */}
      <header className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-900">
        <a
          href="/app"
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          aria-label="Back"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <span className="text-sm font-semibold text-[#4169E1] dark:text-[#87CEEB]">NutriTracker</span>
      </header>

      {/* Form area — scrollable, doesn't fight the keyboard */}
      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back to NutriTracker
            </p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                autoComplete="email"
                inputMode="email"
                /* text-base = 16px prevents iOS auto-zoom */
                className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error ? (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="h-12 rounded-full bg-[#4169E1] px-5 text-base font-semibold text-white transition-colors active:bg-[#000080] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-semibold text-[#4169E1] dark:text-[#87CEEB]">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
