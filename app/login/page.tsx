"use client";

import { createClient } from "@/lib/supabase/client";
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

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Force a hard navigation instead of client-side routing
    window.location.href = "/app";
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-6 dark:bg-black">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome back to NutriTracker
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error ? (
              <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            ) : null}

            <button
              type="submit"
              className="h-11 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-medium text-zinc-900 dark:text-zinc-50">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
