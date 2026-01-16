"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
        emailRedirectTo: `${window.location.origin}/profile-setup`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-6 dark:bg-black">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Create your NutriTracker account
          </p>
        </div>

        {success ? (
          <div className="rounded-2xl border border-green-200/70 bg-green-50 p-6 dark:border-green-800/80 dark:bg-green-950">
            <div className="text-center">
              <div className="text-2xl">✅</div>
              <h2 className="mt-3 text-lg font-semibold text-green-900 dark:text-green-50">
                Check your email!
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-green-800 dark:text-green-200">
                We sent a confirmation link to <strong>{email}</strong>
              </p>
              <p className="mt-3 text-sm text-green-700 dark:text-green-300">
                Click the link in the email to verify your account and log in.
              </p>
              <a
                href="/login"
                className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-green-900 px-5 text-sm font-medium text-white hover:bg-green-800 dark:bg-green-50 dark:text-green-900 dark:hover:bg-white"
              >
                Go to login
              </a>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
