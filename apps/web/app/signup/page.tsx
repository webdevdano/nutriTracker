"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Register new user
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name: fullName }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    // Auto sign-in after successful registration
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Account created but could not sign in. Please log in.");
      setLoading(false);
      setSuccess(true);
      return;
    }

    window.location.href = "/profile-setup";
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

      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        <div className="mx-auto w-full max-w-sm">
          {success ? (
            <div className="rounded-2xl border border-green-200/70 bg-green-50 p-6 dark:border-green-800/80 dark:bg-green-950">
              <div className="text-center">
                <div className="text-3xl">✅</div>
                <h2 className="mt-3 text-lg font-semibold text-green-900 dark:text-green-50">
                  Check your email!
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-green-800 dark:text-green-200">
                  We sent a confirmation link to <strong>{email}</strong>
                </p>
                <p className="mt-3 text-sm text-green-700 dark:text-green-300">
                  Click the link in the email to verify your account.
                </p>
                <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                  💡 Tip: Check your spam folder if you don&apos;t see the email within a few minutes.
                </p>
                <a
                  href="/login"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-green-700 px-6 text-base font-semibold text-white active:bg-green-800 dark:bg-green-50 dark:text-green-900"
                >
                  Go to login
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Create your NutriTracker account
                </p>
              </div>

              <form onSubmit={handleSignup} className="grid gap-4">
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    /* text-base = 16px prevents iOS auto-zoom */
                    className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </label>

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

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <span className="text-xs text-zinc-400">Minimum 6 characters</span>
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium">Confirm password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="h-12 rounded-xl border border-zinc-300 bg-transparent px-3 text-base focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 dark:border-zinc-700 dark:focus:border-[#87CEEB] dark:focus:ring-[#87CEEB]/20"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  {confirmPassword && password !== confirmPassword ? (
                    <span className="text-xs text-red-500">Passwords do not match</span>
                  ) : confirmPassword && password === confirmPassword ? (
                    <span className="text-xs text-green-600 dark:text-green-400">Passwords match</span>
                  ) : null}
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
                  {loading ? "Creating account…" : "Sign up"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Already have an account?{" "}
                <a href="/login" className="font-semibold text-[#4169E1] dark:text-[#87CEEB]">
                  Log in
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
