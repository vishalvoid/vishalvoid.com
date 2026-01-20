import React, { createContext, useContext, useEffect, useState } from "react";
import { SidebarContextType } from "@/types";

const sidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const raw = localStorage.getItem("sidebarEnabled");
      return raw !== null ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebarEnabled", JSON.stringify(enabled));
    } catch {}
  }, [enabled]);

  const toggle = () => setEnabled((v) => !v);

  return (
    <sidebarContext.Provider value={{ enabled, setEnabled, toggle }}>
      {children}
    </sidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(sidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export const useSidebarOptional = () => useContext(sidebarContext);
