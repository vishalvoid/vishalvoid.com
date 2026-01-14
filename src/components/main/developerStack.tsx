import React from "react";
import ShellWrapper from "../layouts/shell-wrapper";
import { TechStacksList } from "@/dev-constants/techStack";
import ThemedIcon from "../ui/extended/themed-icon";

// Custom display names for categories
const categoryLabels: Record<string, string> = {
  language: "Programming Languages",
  framework: "Frameworks & Libraries",
  database: "Database & ORM",
  tools: "Developer Tools",
  etc: "Familiar With",
};

// Category display order
const categoryOrder = ["language", "framework", "database", "tools", "etc"];

const DeveloperStack = () => {
  // Group tech stack by category
  const groupedStack = TechStacksList.reduce((acc, item) => {
    const category = item.category || "etc";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof TechStacksList>);

  // Get sorted categories
  const sortedCategories = categoryOrder.filter((cat) => groupedStack[cat]);

  return (
    <ShellWrapper>
      <div className="relative overflow-hidden p-2 space-y-6">
        <header className="space-y-2">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              My Skills
            </p>
            <h2 className="mt-1 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              The tools I reach for every day
            </h2>
          </div>
          <p className="text-base leading-relaxed text-justify text-muted-foreground">
            A curated mix of frameworks, runtimes, and services that help me
            craft reliable, performant user experiences across the stack.
          </p>
        </header>

        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-0 w-fit">
                {groupedStack[category].map(({ name, icon, hasDarkIcon }) => (
                  <div
                    key={name}
                    className="group flex flex-col items-center justify-center w-24 h-24 p-2 border border-border transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div className="relative flex items-center justify-center w-6 h-6 overflow-hidden">
                      <ThemedIcon
                        src={icon}
                        alt={name}
                        size={24}
                        hasDarkVariant={hasDarkIcon}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium text-foreground/70 text-center group-hover:text-foreground transition-colors duration-200 mt-2">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperStack;
