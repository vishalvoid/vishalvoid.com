"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

type Ref = HTMLAnchorElement | null;

interface SidebarNavLinkProps {
  href: string;
  label: string;
  index?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  href,
  label,
  index,
  Icon,
  className = "",
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const classes = `relative group flex items-center p-3 text-base transition-colors duration-150 ${
    isActive
      ? "bg-white dark:bg-stone-950 border  border-white dark:border-stone-700 shadow-sm bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"
      : "bg-gray-50 text-gray-400 dark:bg-transparent border border-transparent hover:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"
  } ${className}`;

  const iconClasses = `w-5 h-5 mr-3 transition-colors ${
    isActive ? "text-foreground" : "text-gray-500 dark:text-gray-400"
  }`;
  const labelClasses = `font-medium transition-colors ${
    isActive ? "text-foreground" : "text-gray-700 dark:text-gray-200"
  }`;

  return (
    <Link
      href={href}
      className={classes}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Icon className={iconClasses} />
          <span className={labelClasses}>{label}</span>
        </div>
        {index && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {index}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarNavLink;
