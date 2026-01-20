"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ui/extended/theme-switcher";
import { GitHubButtons } from "@/components/ui/extended/github-buttons";
import LayoutSwitcher from "@/components/ui/extended/layout-switcher";
import { useSidebarOptional } from "@/lib/sidebar-provider";

const SiteHeader = () => {
  const ctx = useSidebarOptional();
  const sidebarEnabled = ctx?.enabled ?? false;

  return (
    <>
      {/* floating close toggle when sidebar is open */}
      {sidebarEnabled && (
        <div className="fixed top-4 right-4 z-50 transition-opacity duration-300 ease-in-out motion-reduce:transition-none">
          <LayoutSwitcher />
        </div>
      )}

      <header
        aria-hidden={sidebarEnabled}
        className={`border sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-transform transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
          sidebarEnabled ? "-translate-y-6 opacity-0 pointer-events-none" : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        <div className="flex h-14 px-8 md:px-0 max-w-2xl mx-auto items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-medium inline-block text-lg">VO1D</span>
          </Link>

          <nav aria-label="Main Navigation" className="flex items-center space-x-2">
            <GitHubButtons />
            <ThemeSwitcher />
            <LayoutSwitcher />
          </nav>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
