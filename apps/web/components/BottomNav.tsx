"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const TABS = [
  {
    href: "/app",
    label: "Progress",
    exact: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/app/search",
    label: "Search",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.15 7.46 7.46 0 00.15-.5z" />
      </svg>
    ),
  },
  {
    href: "/app/meals",
    label: "Meals",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/app/nutrients",
    label: "Nutrients",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/app/measurements",
    label: "Body",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/app/workout",
    label: "Workout",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    href: "/app/grocery",
    label: "Lists",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/app/learn",
    label: "Learn",
    exact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { status } = useSession();
  const isGuest = status === "unauthenticated";

  function active(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden overflow-hidden border-t border-[#D3D8E0] bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-black/95">
      <div className="overflow-x-auto scrollbar-hide" style={{ paddingBottom: "env(safe-area-inset-bottom)", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
      <div className="flex min-w-max">
        {TABS.map(({ href, label, icon, exact }) => {
          const isActive = active(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 min-w-17 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-[#4169E1] dark:text-[#87CEEB]"
                  : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              <span className={`transition-transform ${isActive ? "scale-110" : ""}`}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}

        {/* Account tab — Sign In for guests, Profile for authenticated users */}
        {isGuest ? (
          <Link
            href="/login"
            className={`flex shrink-0 min-w-17 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
              pathname.startsWith("/login") || pathname.startsWith("/signup")
                ? "text-[#4169E1] dark:text-[#87CEEB]"
                : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sign in
          </Link>
        ) : (
          <Link
            href="/profile-setup"
            className={`flex shrink-0 min-w-17 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
              active("/profile-setup", false)
                ? "text-[#4169E1] dark:text-[#87CEEB]"
                : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </Link>
        )}
      </div>
      </div>
    </nav>
  );
}
