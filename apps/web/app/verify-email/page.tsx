"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200/70 bg-green-50 p-8 text-center dark:border-green-800/60 dark:bg-green-950/30">
        <div className="text-4xl">✅</div>
        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Email verified!</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Your email is confirmed. You&apos;re all set.
        </p>
        <a href="/app" className="mt-6 inline-flex h-10 items-center rounded-full bg-[#4169E1] px-6 text-sm font-semibold text-white hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black">
          Go to dashboard →
        </a>
      </div>
    );
  }

  const message =
    error === "expired"
      ? "This verification link has expired. Please request a new one from your dashboard."
      : error === "missing"
      ? "Invalid verification link."
      : "Something went wrong. Please try again or contact support.";

  return (
    <div className="rounded-2xl border border-red-200/70 bg-red-50 p-8 text-center dark:border-red-800/60 dark:bg-red-950/30">
      <div className="text-4xl">❌</div>
      <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Verification failed</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
      <a href="/app" className="mt-6 inline-flex h-10 items-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
        Go to dashboard
      </a>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-black">
      <header className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-900">
        <a href="/app" className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900" aria-label="Back">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </a>
        <span className="text-sm font-semibold text-[#4169E1] dark:text-[#87CEEB]">NutriTracker</span>
      </header>
      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        <div className="mx-auto w-full max-w-sm">
          <Suspense>
            <VerifyContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
