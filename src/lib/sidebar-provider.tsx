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
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState<boolean>(false); // default false
  const [mounted, setMounted] = useState(false);

  // Read localStorage BEFORE paint to avoid flash
  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem("sidebarEnabled");
      const value = raw !== null ? JSON.parse(raw) : false;
      setEnabled(value);
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

  const toggle = () => setEnabled((v) => !v);

  return (
    <SidebarContext.Provider value={{ enabled, setEnabled, toggle }}>
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
