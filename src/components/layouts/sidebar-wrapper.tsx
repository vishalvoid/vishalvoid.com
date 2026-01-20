"use client";

import Link from "next/link";
import React from "react";
import { Home, Layers, FileText, Mail, X } from "lucide-react";
import LayoutSwitcher from "@/components/ui/extended/layout-switcher";
import { useSidebarOptional } from "@/lib/sidebar-provider";

const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ctx = useSidebarOptional();
  const enabled = ctx?.enabled ?? false;
  const toggle = ctx?.toggle ?? (() => {});

  return (
    <div className="h-screen flex bg-background text-foreground">
      {/* Desktop collapsible sidebar */}
      <aside
        className={`hidden md:flex flex-col items-center py-4 gap-4 md:sticky md:top-0 md:self-start md:h-screen md:overflow-hidden transition-all duration-300 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-stone-950 ${
          enabled ? "w-72" : "w-0"
        }`}
        aria-hidden={false}
      ></aside>

      {/* Main content (scrolls independently of sidebar) */}
      <div className="flex-1 min-h-0 overflow-auto">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
