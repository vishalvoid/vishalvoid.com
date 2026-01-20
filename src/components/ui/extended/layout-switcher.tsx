"use client";

import { Button } from "@/components/ui/button";
import { Columns2, Columns3 } from "lucide-react";
import { useSidebarOptional } from "@/lib/sidebar-provider";

const LayoutSwitcher = () => {
  const ctx = useSidebarOptional();
  const enabled = ctx?.enabled ?? false;
  const toggle = ctx?.toggle ?? (() => {});

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={enabled ? "Hide sidebar" : "Show sidebar"}
      title={enabled ? "Hide sidebar" : "Show sidebar"}
      aria-pressed={enabled}
      className="rounded-full transition-transform motion-reduce:transition-none"
    >
      <span className={`transform transition-transform duration-300 ${enabled ? "rotate-90" : "rotate-0"}`}>
        {enabled ? <Columns3 className="h-5 w-5" /> : <Columns2 className="h-5 w-5" />}
      </span>
    </Button>
  );
};

export default LayoutSwitcher;
