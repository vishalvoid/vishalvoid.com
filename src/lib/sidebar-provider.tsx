"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type SidebarContextType = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
  // mobile drawer state
  mobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState<boolean>(false); // default false
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Read localStorage BEFORE paint to avoid flash
  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem("sidebarEnabled");
      const value = raw !== null ? JSON.parse(raw) : undefined;
      // Default: open on >= xl (1280px), closed below xl
      const isXL = typeof window !== "undefined" && window.innerWidth >= 1280;
      setEnabled(isXL ? (value ?? true) : false);
    } catch {
      setEnabled(false);
    }
    setMounted(true);
  }, []);

  // Persist to localStorage when changed
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("sidebarEnabled", JSON.stringify(enabled));
      } catch {}
    }
  }, [enabled, mounted]);

  // Keep the sidebar closed while the viewport is smaller than `lg`.
  useEffect(() => {
    function onResize() {
      if (typeof window === "undefined") return;
      const isXL = window.innerWidth >= 1280;
      setEnabled(isXL);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggle = () => setEnabled((v) => !v);
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen((v) => !v);

  return (
    <SidebarContext.Provider
      value={{
        enabled,
        setEnabled,
        toggle,
        mobileOpen,
        openMobile,
        closeMobile,
        toggleMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export const useSidebarOptional = () => useContext(SidebarContext);
