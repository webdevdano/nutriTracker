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
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-tight">NutriTracker</div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900">
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/app"
              >
                Today
              </a>
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/app/search"
              >
                Search
              </a>
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/app/goals"
              >
                Goals
              </a>
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/app/meals"
              >
                Meals
              </a>
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/app/learn"
              >
                Learn
              </a>
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/app/grocery"
              >
                Grocery
              </a>
              <a
                className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                href="/profile-setup"
              >
                Profile
              </a>
              <form action="/auth/signout" method="post" className="inline">
                <button
                  type="submit"
                  className="rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Sign out
                </button>
              </form>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
