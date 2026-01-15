export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/70 dark:border-zinc-800/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-tight">NutriTracker</div>
          <nav className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <a className="hover:text-zinc-900 dark:hover:text-zinc-50" href="#features">
              Features
            </a>
            <a className="hover:text-zinc-900 dark:hover:text-zinc-50" href="#how-it-works">
              How it works
            </a>
            <a
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
              href="/login"
            >
              Log in
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Meal logging • Macro totals • Nutrition history
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Track nutrition without the busywork.
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Log foods, see daily totals, and review trends over time. Built as a web app first so
              the same backend can power a future iOS app.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                href="/signup"
              >
                Get started free
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
                href="/login"
              >
                Log in
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-5xl px-6 pb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
              <h2 className="text-sm font-semibold">Fast meal logging</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Add foods with quantities and servings. Totals update automatically.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
              <h2 className="text-sm font-semibold">Daily totals</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Calories, protein, carbs, and fat in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 p-5 dark:border-zinc-800/80">
              <h2 className="text-sm font-semibold">History & trends</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Review previous days and spot patterns that drive results.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-5xl px-6 pb-20">
          <div className="rounded-2xl border border-zinc-200/70 p-6 dark:border-zinc-800/80">
            <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
            <ol className="mt-4 grid gap-4 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-3">
              <li>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">1. Add foods</div>
                <div className="mt-1 leading-6">Create foods with nutrition per serving.</div>
              </li>
              <li>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">2. Log meals</div>
                <div className="mt-1 leading-6">Record what you ate with a quantity.</div>
              </li>
              <li>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">3. Review totals</div>
                <div className="mt-1 leading-6">See daily totals and weekly trends.</div>
              </li>
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/70 dark:border-zinc-800/80">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-xs text-zinc-500 dark:text-zinc-500">
          NutriTracker — built with Next.js + Tailwind.
        </div>
      </footer>
    </div>
  );
}
