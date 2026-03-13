import { getServerUser } from "@/lib/auth-helpers";
import ThemeToggle from "@/components/ThemeToggle";
import NavBar from "@/components/NavBar";
import BottomNav from "@/components/BottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  const isGuest = !user;

  return (
    <div className="min-h-dvh bg-white dark:bg-black">
      <header className="border-b border-[#D3D8E0] bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-black/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight text-[#4169E1] dark:text-[#87CEEB]">NutriTracker</div>
            {/* Theme toggle only visible on mobile here; desktop gets it on the right */}
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
          </div>
          {/* Desktop nav — hidden on mobile (bottom nav handles mobile) */}
          <div className="hidden sm:flex items-center gap-2">
            <NavBar isGuest={isGuest} />
            <ThemeToggle />
          </div>
        </div>
      </header>
      {isGuest && (
        <div className="bg-[#4169E1] dark:bg-blue-900 text-white text-center text-xs py-2 px-4">
          You&apos;re browsing as a guest.{" "}
          <a href="/signup" className="underline font-semibold hover:text-blue-100">
            Sign up free
          </a>{" "}
          to save your logs and track progress.
        </div>
      )}
      {/* pb-20 gives clearance for the mobile bottom nav bar */}
      <main className="pb-20 sm:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
