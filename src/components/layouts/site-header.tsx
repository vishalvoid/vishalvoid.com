import Link from "next/link";
import { ArrowUpRight, Columns3, PanelLeftDashed } from "lucide-react";
import ThemeSwitcher from "@/components/ui/extended/theme-switcher";
import { GitHubButtons } from "../ui/extended/github-buttons";
import LayoutSwitcher from "../ui/extended/layout-switcher";

const SiteHeader = () => {
  return (
    <header className=" border sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 px-8 md:px-0 max-w-2xl mx-auto items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-medium inline-block text-lg">VO1D</span>
        </Link>
        <nav
          aria-label="Main Navigation"
          className="flex items-center space-x-2"
        >
          <Link
            href="/blog"
            className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            blog
            <ArrowUpRight size={16} />
          </Link>
          <GitHubButtons />
          <ThemeSwitcher />
          <div> | </div>
          <LayoutSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
