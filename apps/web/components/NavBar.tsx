"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const NAV_LINKS = [
  { href: "/app",              label: "Progress",     exact: true  },
  { href: "/app/search",       label: "Search Foods", exact: false },
  { href: "/app/meals",        label: "Meals",        exact: false },
  { href: "/app/nutrients",    label: "Nutrients",    exact: false },
  { href: "/app/measurements", label: "Measurements", exact: false },
  { href: "/app/workout",      label: "Workout",      exact: false },
  { href: "/app/grocery",      label: "Lists",        exact: false },
  { href: "/app/learn",        label: "Learn",        exact: false },
];

const RESOURCES_LINKS = [
  { href: "/app/articles", label: "Articles" },
  { href: "/app/sources",  label: "Sources"  },
];

export default function NavBar({ isGuest }: { isGuest: boolean }) {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function active(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  const resourcesActive = RESOURCES_LINKS.some(({ href }) => pathname.startsWith(href));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* Resources dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setResourcesOpen((o) => !o)}
          className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            resourcesActive
              ? "bg-[#4169E1] text-white dark:bg-[#87CEEB] dark:text-black"
              : "text-[#A9A9A9] hover:bg-white hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
          }`}
        >
          Resources
          <svg
            className={`h-3 w-3 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {resourcesOpen && (
          <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-2xl border border-[#B0C4DE]/60 bg-white/95 p-1 shadow-xl backdrop-blur-xl dark:border-gray-600/60 dark:bg-black/95">
            {RESOURCES_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setResourcesOpen(false)}
                className={`block whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                  pathname.startsWith(href)
                    ? "bg-[#4169E1] text-white dark:bg-[#87CEEB] dark:text-black"
                    : "text-[#A9A9A9] hover:bg-[#F0F4FF] hover:text-[#4169E1] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#87CEEB]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

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
