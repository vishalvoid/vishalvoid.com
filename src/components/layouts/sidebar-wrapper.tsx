"use client";

import Link from "next/link";
import React from "react";
import {
  Home,
  Layers,
  FileText,
  Mail,
  CircleSlash2,
  BriefcaseBusiness,
  LayoutGrid,
  Notebook,
  PencilLine,
  X,
  SquareTerminal,
} from "lucide-react";
import LayoutSwitcher from "@/components/ui/extended/layout-switcher";
import Typewriter from "@/components/ui/extended/typewriter";
import SidebarNavLink from "@/components/ui/extended/sidebar-nav-link";
import { useSidebarOptional } from "@/lib/sidebar-provider";
import { usePathname } from "next/navigation";
import {
  GitHubButtons,
  LinkedInButton,
  TwitterButton,
  MediumButton,
} from "@/components/ui/extended/github-buttons";
import ThemedIcon from "../ui/extended/themed-icon";
import ThemeSwitcher from "../ui/extended/theme-switcher";

const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ctx = useSidebarOptional();
  const enabled = ctx?.enabled ?? false;
  const toggle = ctx?.toggle ?? (() => {});
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home", icon: Home, index: "" },
    { href: "/work", label: "Work", icon: BriefcaseBusiness, index: "03" },
    { href: "/projects", label: "Projects", icon: LayoutGrid, index: "04" },
    { href: "/guestbook", label: "GuestBook", icon: Notebook, index: "04" },
    { href: "/blog", label: "Blog", icon: PencilLine, index: "04" },
  ];

  return (
    <div className="h-screen w-screen lg:max-w-[1920] md:mx-auto flex bg-background text-foreground border">
      <aside
        className={`hidden xl:flex flex-col justify-between w-full gap-4 xl:h-screen transition-all duration-300 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-stone-950 ${
          enabled
            ? "xl:p-4 xl:overflow-hidden xl:w-72 xl:opacity-100 xl:pointer-events-auto"
            : "xl:p-0 xl:overflow-hidden xl:w-0 xl:opacity-0 xl:pointer-events-none"
        }`}
        aria-hidden={!enabled}
      >
        <div>
          {/* logo design will be here  */}
          <div className=" flex gap-4 items-center w-full h-18 px-4 mb-4">
            <div className="flex items-center justify-center">
              <SquareTerminal className="h-10 w-10 text-gray-200" />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-md">Vishal Kr. Singh</div>
              <Typewriter
                texts={["Full Stack Developer", "Open Source", "@vishalvoid"]}
                speed={60}
                pause={1800}
                className="text-sm text-gray-500"
              />
            </div>
          </div>

          {/* Navigation Links */}

          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Inventory
          </p>
          <nav className="flex flex-col w-full gap-1">
            {navItems.map((item) => (
              <SidebarNavLink
                key={item.href}
                href={item.href}
                label={item.label}
                index={item.index}
                Icon={item.icon}
              />
            ))}
          </nav>
        </div>

        <div>
          {/* Search Bar  */}

          <div className="flex w-full">
            <div className="flex items-center pl-4 gap-3 bg-transparent h-12 overflow-hidden max-w-md w-full border border-gray-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 30 30"
                fill="#6B7280"
              >
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-3 py-2">
            <ThemeSwitcher />
            <div>|</div>
            <LayoutSwitcher text={"Switch Layout"} />
          </div>

          <div className="flex items-center justify-center ">
            <span className="font-medium text-gray-700 text-[10px] tracking-wider">
              Cordinates : 28.62° N, 77.37° E
            </span>
          </div>
        </div>
      </aside>

      <div
        className={`flex-1 min-h-0 overflow-auto transition-all duration-300 ${enabled ? "mx-4 border" : "m-0 border-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarWrapper;
