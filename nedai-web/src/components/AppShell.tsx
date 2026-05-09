import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useConnectivityStore } from "@/modules/connectivity/useConnectivityStore";
import { Loader2, Cpu, AlertTriangle } from "lucide-react";

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
  const [bootstrapStatus, setBootstrapStatus] = React.useState<'checking' | 'pulling' | 'ready' | 'error-no-ollama' | 'error-pull-failed'>('checking');

  useEffect(() => {
    // Listen for Electron's bootstrapper events
    if (window.electronAPI?.onBootstrapStatus) {
      window.electronAPI.onBootstrapStatus((status: any) => {
        setBootstrapStatus(status);
      });
    } else {
      // Not in Electron (web browser testing)
      setBootstrapStatus('ready');
    }
  }, []);

  const { checkConnection } = useConnectivityStore();

  useEffect(() => {
    // Initial check
    checkConnection();

    // Heartbeat check every 30 seconds
    const interval = setInterval(() => {
      checkConnection();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkConnection]);

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

      {/* Bootstrapper Overlay (Ollama Setup) */}
      {bootstrapStatus !== 'ready' && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 text-center">
          <div className="max-w-md animate-in fade-in zoom-in duration-500">
            {bootstrapStatus === 'checking' || bootstrapStatus === 'pulling' ? (
              <>
                <div className="relative mb-8 inline-block">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                  <div className="relative p-6 bg-blue-500 rounded-3xl shadow-2xl">
                    <Cpu size={48} className="text-white animate-pulse" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Initializing Intelligence</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {bootstrapStatus === 'checking' 
                    ? "Checking your local AI engine..." 
                    : "Downloading Phi-3 Mini (~2GB). This may take a few minutes depending on your connection."}
                </p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full animate-[loading_2s_infinite]" style={{ width: '40%' }} />
                </div>
              </>
            ) : (
              <>
                <div className="p-6 bg-rose-500 rounded-3xl shadow-2xl mb-8 inline-block">
                  <AlertTriangle size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Ollama Required</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {bootstrapStatus === 'error-no-ollama' 
                    ? "Ollama was not detected. Please install it to use the Local Brain." 
                    : "Failed to download the AI model. Please check your internet connection."}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition"
                >
                  Retry Setup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
