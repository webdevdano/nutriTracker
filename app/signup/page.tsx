"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Create your NutriTracker account
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="rounded-2xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900"
        >
          <div className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Full name</span>
              <input
                type="text"
                className="h-10 rounded-xl border border-zinc-300 bg-transparent px-3 text-sm dark:border-zinc-700"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>

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
                minLength={6}
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
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-zinc-900 dark:text-zinc-50">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
