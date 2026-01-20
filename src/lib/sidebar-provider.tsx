"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("sidebarEnabled");
      return raw !== null ? JSON.parse(raw) : false; // default: false (header visible)
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebarEnabled", JSON.stringify(enabled));
    } catch {}
  }, [enabled]);

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
