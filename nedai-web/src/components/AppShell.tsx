import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useUIStore } from "@/modules/ui/useUIStore";

export function AppShell({
  title,
  onHistory,
  children,
}: {
  title: string;
  onHistory?: () => void;
  children: React.ReactNode;
}) {
  const { isSidebarCollapsed, theme } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-row h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Sidebar - collapsible and stationary */}
      <Sidebar />

      {/* Main content area */}
      <div className={`flex flex-col h-full overflow-hidden relative shadow-[-4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[-4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 ${isSidebarCollapsed ? 'flex-1' : 'flex-1'
        }`}>
        {/* Header - stationary */}
        <Header title={title} onHistory={onHistory} />

        {/* Content area - scrollable and fluid width */}
        <div className="flex-1 overflow-y-auto w-full relative transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
