"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ui/extended/theme-switcher";
import { GitHubButtons } from "@/components/ui/extended/social_buttons";
import LayoutSwitcher from "@/components/ui/extended/layout-switcher";
import {

  SquareTerminal,
} from "lucide-react";
import { useSidebarOptional } from "@/lib/sidebar-provider";
import { usePathname } from "next/navigation";
import Typewriter from "@/components/ui/extended/typewriter";

const SiteHeader = () => {
  const ctx = useSidebarOptional();
  const sidebarEnabled = ctx?.enabled ?? false;

  const pathname = usePathname();

  const nav = [
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
            {/* show logo + name + Typewriter between sm and lg */}
            <div className="hidden sm:flex lg:hidden items-center gap-3">
              <SquareTerminal className="h-7 w-7 text-foreground" />
              <Typewriter
                texts={["Vishal Kr. Singh", "@vishalvoid"]}
                speed={60}
                pause={1800}
                className="text-sm text-white"
              />
            </div>

            {/* show only the logo between lg and xl (no name/Typewriter) */}
            <div className="hidden lg:flex xl:hidden items-center">
              <Link
                href="/"
                aria-label="Home"
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <SquareTerminal className="h-8 w-8 text-foreground" />
              </Link>
            </div>

            {/* on very small screens show only the logo (no name) */}
            <div className="sm:hidden">
              <Link
                href="/"
                aria-label="Home"
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <SquareTerminal className="h-7 w-7 text-foreground" />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
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
                    {item.label}
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
            <div className="lg:hidden">
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
