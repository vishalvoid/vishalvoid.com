"use client";

import { Button } from "@/components/ui/button";
import { Columns2, Columns3 } from "lucide-react";
import { useSidebarOptional } from "@/lib/sidebar-provider";

type Props = {
  text?: string;
};

const LayoutSwitcher: React.FC<Props> = ({ text }) => {
  const ctx = useSidebarOptional();
  const enabled = ctx?.enabled ?? false;
  const toggle = ctx?.toggle ?? (() => {});

  const ariaLabel = text ?? (enabled ? "Hide sidebar" : "Show sidebar");

  return (
    <Button
      variant="ghost"
      onClick={toggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      aria-pressed={enabled}
      className="rounded-md px-3 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-accent/50 group"
    >
      <div className="flex items-center space-x-3">
        {enabled ? (
          <Columns3 className="h-5 w-5 text-foreground" />
        ) : (
          <Columns2 className="h-5 w-5 text-foreground" />
        )}
        {text ? <span className="text-sm font-medium">{text}</span> : null}
      </div>
    </Button>
  );
};

export default LayoutSwitcher;
