"use client";

import { Button } from "@/components/ui/button";
import { useSidebarOptional } from "@/lib/sidebar-provider";
import { Columns2, Columns3 } from "lucide-react";

const LayoutSwitcher = () => {
  const ctx = useSidebarOptional();
  const enabled = ctx?.enabled ?? true;
  const toggle = ctx?.toggle ?? (() => {});

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={enabled ? "Hide sidebar" : "Show sidebar"}
      title={enabled ? "Hide sidebar" : "Show sidebar"}
      aria-pressed={enabled}
      className="rounded-full"
    >
      {enabled ? (
        <Columns3 className="h-5 w-5" />
      ) : (
        <Columns2 className="h-5 w-5" />
      )}
    </Button>
  );
};

export default LayoutSwitcher;
