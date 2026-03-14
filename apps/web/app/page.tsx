import { getServerUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { RevealInit } from "@/components/RevealInit";

const FEATURES = [
  {
    emoji: "🔬",
    title: "Full-spectrum nutrition",
    description: "Track 30+ nutrients — vitamins, minerals, omega-3s, electrolytes, and every macro. Not just calories.",
  },
  {
    emoji: "📚",
    title: "Learn what each nutrient does",
    description: "100+ superfoods with per-serving USDA nutrient data, health benefits, and serving sizes.",
  },
  {
    emoji: "🔍",
    title: "Search millions of foods",
    description: "Powered by the USDA FoodData Central database. Find exact nutritional data for any food or ingredient.",
  },
  {
    emoji: "📊",
    title: "Daily & weekly trends",
    description: "Charts that show your nutrition history so you can spot gaps and improve over time.",
  },
  {
    emoji: "🏋️",
    title: "Workout tracking",
    description: "Log cardio sessions, sets, and reps alongside your nutrition for a complete health picture.",
  },
  {
    emoji: "🛒",
    title: "Smart grocery lists",
    description: "Add foods directly from the Learn section to a grocery list. Shop with nutrition in mind.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Set your goals",
    description: "Enter your calorie and macro targets. The app calculates your micronutrient benchmarks automatically.",
  },
  {
    step: "02",
    title: "Log your meals",
    description: "Search any food or ingredient and add it to your daily log in seconds.",
  },
  {
    step: "03",
    title: "See the full picture",
    description: "Your dashboard shows progress toward every nutrient goal — not just calories.",
  },
];

export default async function Home() {
  const user = await getServerUser();

  let firstName = null;
  if (user) {
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      select: { fullName: true },
    });
    firstName = profile?.fullName?.split(" ")[0] ?? null;
  }

  return (
    <div className="min-h-dvh bg-white text-black dark:bg-[#0a0a0a] dark:text-white">
      <RevealInit />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-[#D3D8E0]/60 bg-white/90 backdrop-blur-xl dark:border-gray-800/60 dark:bg-black/90">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/favicon26_io/favicon-32x32.png" alt="" width={24} height={24} className="rounded-sm" />
            <span className="text-sm font-bold tracking-tight text-[#4169E1] dark:text-[#87CEEB]">NutriTracker</span>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:block">
                  Hey, {firstName || user.email?.split("@")[0]} 👋
                </span>
                <a href="/app" className="rounded-full bg-[#4169E1] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black">
                  Dashboard →
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a href="#features" className="hidden text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:block">Features</a>
                <a href="#how-it-works" className="hidden text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:block">How it works</a>
                <a href="/login" className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300">
                  Log in
                </a>
                <a href="/signup" className="rounded-full bg-[#4169E1] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black">
                  Get started
                </a>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-[#4169E1]/[0.07] blur-3xl dark:bg-[#87CEEB]/5" />
            <div className="absolute top-20 -right-20 h-96 w-96 rounded-full bg-[#4169E1]/5 blur-3xl dark:bg-[#87CEEB]/4" />
          </div>

          <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:pt-28">
            <div className="grid items-center gap-16 lg:grid-cols-2">

              {/* Left: copy */}
              <div data-reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#4169E1]/20 bg-[#4169E1]/[0.07] px-3 py-1.5 dark:border-[#87CEEB]/20 dark:bg-[#87CEEB]/[0.07]">
                  <span className="text-xs">✨</span>
                  <span className="text-xs font-medium text-[#4169E1] dark:text-[#87CEEB]">Free · No credit card · Works on mobile</span>
                </div>

                {user ? (
                  <>
                    <h1 className="mt-5 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
                      Welcome back,{" "}
                      <span className="text-[#4169E1] dark:text-[#87CEEB]">{firstName || "there"} 👋</span>
                    </h1>
                    <p className="mt-5 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                      Pick up where you left off. Your nutrition data is waiting.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href="/app" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#4169E1] px-7 text-sm font-semibold text-white transition-all hover:bg-[#3558c4] hover:shadow-lg hover:shadow-[#4169E1]/25 dark:bg-[#87CEEB] dark:text-black">
                        Go to Dashboard →
                      </a>
                      <a href="/app/meals" className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-200 px-7 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300">
                        Log a meal
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="mt-5 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
                      Nutrition tracking{" "}
                      <span className="text-[#4169E1] dark:text-[#87CEEB]">that goes deeper.</span>
                    </h1>
                    <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                      Track every vitamin, mineral, and macronutrient — then learn which real foods cover your gaps. No supplements required.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href="/signup" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#4169E1] px-7 text-sm font-semibold text-white transition-all hover:bg-[#3558c4] hover:shadow-lg hover:shadow-[#4169E1]/25 dark:bg-[#87CEEB] dark:text-black">
                        Start for free →
                      </a>
                      <a href="/app?guest=true" className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-200 px-7 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300">
                        View demo
                      </a>
                    </div>
                    <p className="mt-4 text-xs text-zinc-400">No account needed to try the demo</p>
                  </>
                )}
              </div>

              {/* Right: mock dashboard */}
              <div className="hidden lg:block" data-reveal data-delay="200">
                <div className="relative rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-black/8 dark:border-zinc-800/80 dark:bg-zinc-900">
                  {/* Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-400">Today</p>
                      <p className="text-lg font-bold text-zinc-900 dark:text-white">Daily Progress</p>
                    </div>
                    <span className="rounded-full bg-[#4169E1]/10 px-3 py-1 text-xs font-semibold text-[#4169E1] dark:bg-[#87CEEB]/10 dark:text-[#87CEEB]">1,840 / 2,200 kcal</span>
                  </div>

                  {/* Ring + macros */}
                  <div className="mb-5 flex items-center gap-5">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-100 dark:text-zinc-800" />
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#4169E1" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 32 * 0.84} ${2 * Math.PI * 32}`} />
                      </svg>
                      <span className="absolute text-sm font-bold text-zinc-800 dark:text-white">84%</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[
                        { label: "Protein", val: 78, color: "#4169E1" },
                        { label: "Carbs", val: 62, color: "#87CEEB" },
                        { label: "Fat", val: 91, color: "#228B22" },
                      ].map(({ label, val, color }) => (
                        <div key={label}>
                          <div className="mb-0.5 flex justify-between text-xs">
                            <span className="text-zinc-500">{label}</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">{val}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micronutrient pills */}
                  <div className="mb-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <p className="mb-2 text-xs font-medium text-zinc-400">Micronutrients today</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: "Vitamin D", ok: true },
                        { name: "Iron", ok: true },
                        { name: "Calcium", ok: false },
                        { name: "Vitamin C", ok: true },
                        { name: "Magnesium", ok: false },
                        { name: "B12", ok: true },
                        { name: "Zinc", ok: true },
                        { name: "Folate", ok: false },
                      ].map(({ name, ok }) => (
                        <span key={name} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          ok
                            ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                            : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                        }`}>
                          {ok ? "✓" : "✗"} {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recent meals */}
                  <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                    <p className="mb-2 text-xs font-medium text-zinc-400">Recent meals</p>
                    <div className="space-y-1.5">
                      {[
                        { name: "Greek Yogurt + Berries", cal: "320 kcal" },
                        { name: "Grilled Salmon + Spinach", cal: "540 kcal" },
                        { name: "Brown Rice + Chicken", cal: "490 kcal" },
                      ].map(({ name, cal }) => (
                        <div key={name} className="flex justify-between text-xs">
                          <span className="text-zinc-600 dark:text-zinc-300">{name}</span>
                          <span className="text-zinc-400">{cal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="border-y border-zinc-100 dark:border-zinc-800/60">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-zinc-100 px-6 sm:grid-cols-4 dark:divide-zinc-800/60" data-reveal>
            {[
              { label: "Nutrients tracked", value: "30+" },
              { label: "Food database", value: "1M+" },
              { label: "Completely free", value: "100%" },
              { label: "No supplements needed", value: "Real food" },
            ].map(({ label, value }) => (
              <div key={label} className="py-8 text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">{value}</div>
                <div className="mt-1 text-xs text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4169E1] dark:text-[#87CEEB]">Everything you need</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Built different from day one.</h2>
            <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">Most apps stop at calories. NutriTracker goes to 30+ nutrients with the food education to back it up.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ emoji, title, description }, i) => (
              <div key={title} data-reveal data-delay={String(i * 80)} className="rounded-2xl border border-zinc-200/70 p-6 transition-all hover:border-[#4169E1]/30 hover:shadow-lg hover:shadow-[#4169E1]/5 dark:border-zinc-800/80 dark:hover:border-[#87CEEB]/20">
                <div className="mb-4 text-3xl">{emoji}</div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Learn highlight ── */}
        <section className="bg-[#4169E1]/4 py-24 dark:bg-[#87CEEB]/3">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div data-reveal>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4169E1] dark:text-[#87CEEB]">The difference</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Your food is your{" "}
                  <span className="text-[#4169E1] dark:text-[#87CEEB]">supplement stack.</span>
                </h2>
                <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                  Most people spend money on supplements they don&apos;t need. NutriTracker&apos;s Learn section shows you the exact foods, serving sizes, and nutrient amounts to cover every gap — no pill required.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "100+ superfoods with per-serving nutrient data",
                    "Vitamins, minerals, electrolytes, and trace elements",
                    "Add any food directly to your grocery list",
                    "Science-backed, USDA-sourced nutrient amounts",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4169E1]/15 text-[10px] text-[#4169E1] dark:bg-[#87CEEB]/15 dark:text-[#87CEEB]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/app/learn" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[#4169E1] px-7 text-sm font-semibold text-white transition-all hover:bg-[#3558c4] dark:bg-[#87CEEB] dark:text-black">
                  Explore Learn →
                </a>
              </div>

              {/* Learn cards mockup */}
              <div className="hidden space-y-3 lg:block">
                {[
                  { emoji: "🐟", name: "Salmon", nutrients: ["Omega-3 EPA · 0.4g", "Omega-3 DHA · 1.2g", "Vitamin D · 447 IU"] },
                  { emoji: "🥬", name: "Spinach", nutrients: ["Vitamin K · 888mcg", "Iron · 6.4mg", "Magnesium · 157mg"] },
                  { emoji: "🥜", name: "Brazil Nuts", nutrients: ["Selenium · 544mcg", "Magnesium · 107mg", "Phosphorus · 206mg"] },
                ].map(({ emoji, name, nutrients }, i) => (
                  <div key={name} data-reveal data-delay={String(150 + i * 100)} className="flex items-center gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-2xl dark:bg-zinc-800">{emoji}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">{name}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {nutrients.map((n) => (
                          <span key={n} className="rounded-full bg-[#4169E1]/8 px-2 py-0.5 text-[10px] font-medium text-[#4169E1] dark:bg-[#87CEEB]/10 dark:text-[#87CEEB]">{n}</span>
                        ))}
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium text-zinc-400 dark:border-zinc-700">+ List</span>
                  </div>
                ))}
                <p className="text-center text-xs text-zinc-400">100+ foods across 8 nutrition categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4169E1] dark:text-[#87CEEB]">Get started in minutes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Simple by design.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, description }, i) => (
              <div key={step} data-reveal data-delay={String(i * 150)} className="relative rounded-2xl border border-zinc-200/70 p-6 dark:border-zinc-800/80">
                <div className="mb-4 text-5xl font-black text-zinc-100 dark:text-zinc-800">{step}</div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <div data-reveal className="relative overflow-hidden rounded-3xl bg-[#4169E1] px-8 py-16 text-center">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-10 right-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <p className="relative text-xs font-semibold uppercase tracking-widest text-blue-200">Start today</p>
            <h2 className="relative mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Know your body. Feed it right.</h2>
            <p className="relative mx-auto mt-4 max-w-md text-base leading-7 text-blue-100">
              Free forever. No credit card. Start logging in under 60 seconds.
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="/signup" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-[#4169E1] transition-all hover:bg-blue-50 hover:shadow-xl">
                Create free account →
              </a>
              <a href="/app?guest=true" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10">
                Try the demo first
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-200/70 dark:border-zinc-800/80">
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm font-bold text-[#4169E1] dark:text-[#87CEEB]">
              <img src="/favicon26_io/favicon-32x32.png" alt="" width={20} height={20} className="rounded-sm" /> NutriTracker
            </div>
            <div className="flex items-center gap-6 text-xs text-zinc-400">
              <a href="/app/learn" className="hover:text-zinc-700 dark:hover:text-zinc-200">Learn</a>
              <a href="#features" className="hover:text-zinc-700 dark:hover:text-zinc-200">Features</a>
              <a href="/login" className="hover:text-zinc-700 dark:hover:text-zinc-200">Sign in</a>
              <a href="/signup" className="hover:text-zinc-700 dark:hover:text-zinc-200">Sign up</a>
            </div>
            <p className="text-xs text-zinc-400">© 2026 Websites by Dano</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
