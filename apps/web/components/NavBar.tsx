"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/app",              label: "Progress",     exact: true  },
  { href: "/app/search",        label: "Search Foods", exact: false },
  { href: "/app/meals",         label: "Meals",        exact: false },
  { href: "/app/measurements",  label: "Measurements", exact: false },
  { href: "/app/learn",         label: "Learn",        exact: false },
  { href: "/app/nutrients",     label: "Nutrients",    exact: false },
  { href: "/app/grocery",       label: "Lists",        exact: false },
];

export default function NavBar({ isGuest }: { isGuest: boolean }) {
  const pathname = usePathname();

  function active(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav className="flex items-center gap-1 rounded-full border-2 border-[#B0C4DE]/60 bg-white/70 p-1 shadow-lg backdrop-blur-xl dark:border-gray-600/60 dark:bg-black/70">
      {NAV_LINKS.map(({ href, label, exact }) => (
        <Link
          key={href}
          href={href}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            active(href, exact)
              ? "bg-[#4169E1] text-white dark:bg-[#87CEEB] dark:text-black"
              : "text-[#A9A9A9] hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
          }`}
        >
          {label}
        </Link>
      ))}

      {isGuest ? (
        <>
          <Link
            href="/login"
            className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium bg-[#4169E1] text-white transition-colors hover:bg-[#000080] dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#ADD8E6]"
          >
            Sign up
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/profile-setup"
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              active("/profile-setup", false)
                ? "bg-[#4169E1] text-white dark:bg-[#87CEEB] dark:text-black"
                : "text-[#A9A9A9] hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
            }`}
          >
            Profile
          </Link>
          <form action="/auth/signout" method="post" className="inline">
            <button
              type="submit"
              className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-[#A9A9A9] transition-colors hover:bg-white hover:text-[#C8102E] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#C8102E]"
            >
              Sign out
            </button>
          </form>
        </>
      )}
    </nav>
  );
}
