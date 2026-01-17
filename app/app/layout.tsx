import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-dvh bg-white dark:bg-black">
      <header className="border-b border-[#D3D8E0] bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-black/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight text-[#4169E1] dark:text-[#87CEEB]">NutriTracker</div>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-4 overflow-x-auto">
            <nav className="flex items-center gap-2 rounded-full border-2 border-[#B0C4DE]/60 bg-white/70 p-1 shadow-lg backdrop-blur-xl dark:border-gray-600/60 dark:bg-black/70">
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/app"
              >
                Today
              </a>
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/app/search"
              >
                Search Foods
              </a>
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/app/goals"
              >
                Goals
              </a>
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/app/meals"
              >
                Meals
              </a>
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/app/learn"
              >
                Learn
              </a>
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/app/grocery"
              >
                Grocery
              </a>
              <a
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                href="/profile-setup"
              >
                Profile
              </a>
              <form action="/auth/signout" method="post" className="inline">
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#C8102E] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#C8102E]"
                >
                  Sign out
                </button>
              </form>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
