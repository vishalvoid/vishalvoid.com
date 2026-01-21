"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ui/extended/theme-switcher";
import { GitHubButtons } from "@/components/ui/extended/social_buttons";
import LayoutSwitcher from "@/components/ui/extended/layout-switcher";
import {
  Home,
  BriefcaseBusiness,
  LayoutGrid,
  Notebook,
  PencilLine,
  SquareTerminal,
} from "lucide-react";
import { useSidebarOptional } from "@/lib/sidebar-provider";
import { usePathname } from "next/navigation";

const SiteHeader = () => {
  const ctx = useSidebarOptional();
  const sidebarEnabled = ctx?.enabled ?? false;

  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/projects", label: "Projects" },
    { href: "/guestbook", label: "Guestbook" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <header
        aria-hidden={sidebarEnabled}
        className={`border sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-transform  duration-300 ease-in-out motion-reduce:transition-none ${
          sidebarEnabled
            ? "-translate-y-6 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        <div className="flex h-14 px-8 md:px-0 max-w-2xl mx-auto items-center justify-between">
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center gap-2">
              {nav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm transition rounded-md px-2 py-1 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.href === "/" ? (
                      <SquareTerminal className="h-5 w-5" />
                    ) : (
                      item.label
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <nav
            aria-label="Main Navigation"
            className="flex items-center space-x-2"
          >
            <GitHubButtons />
            <ThemeSwitcher />
            <div>|</div>
            {/* LayoutSwitcher visible at >= xl; at lg the top nav is visible and both layout switcher and hamburger are hidden. */}
            <div className="hidden xl:flex">
              <LayoutSwitcher />
            </div>
            <div className="md:hidden">
              <button
                aria-label="Open navigation"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => ctx?.openMobile?.()}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
