import { History, Cloud, Cpu, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { useConnectivityStore } from "@/modules/connectivity/useConnectivityStore";
import { useChatStore } from "@/modules/chat/useChatStore";

export function Header({
  title,
  onHistory,
}: {
  title: string;
  onHistory?: () => void;
}) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const displayName = user?.fullName || user?.email || "NedAI User";
  const initials = displayName.slice(0, 1).toUpperCase();
  const isOnline = useConnectivityStore((state) => state.isOnline);
  const brainMode = useChatStore((state) => state.brainMode);
  const toggleBrainMode = useChatStore((state) => state.toggleBrainMode);
  
  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <header className="flex flex-row items-center justify-between px-4 pt-4 pb-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-row items-center shrink-1">
        <div className="flex items-center justify-center mr-3">
          <img src="nedai-text-logo.png" alt="NedAI" className="h-8 object-contain" />
        </div>
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 block">
            NedAI Workspace
          </span>
          <h1 className="text-[22px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        {onHistory && (
          <button
            onClick={onHistory}
            className="flex flex-row items-center px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <History size={16} className="text-slate-500 dark:text-slate-400" strokeWidth={2} />
            <span className="ml-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400">History</span>
          </button>
        )}

        {/* Brain Mode Toggle */}
        {window.electronAPI && (
          <button
            onClick={isOnline ? toggleBrainMode : undefined}
            disabled={!isOnline}
            className={`flex flex-row items-center px-3.5 py-2 rounded-full border shadow-sm transition-all duration-200 ${
              !isOnline
                ? "bg-rose-50/50 dark:bg-rose-950/10 border-rose-200/50 dark:border-rose-900/20 text-rose-500 dark:text-rose-400 cursor-not-allowed opacity-80"
                : brainMode === "local"
                  ? "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            }`}
            title={!isOnline ? "Forced to Local mode while offline" : `Switch to ${brainMode === 'cloud' ? 'Local' : 'Cloud'} Brain`}
          >
            {!isOnline ? (
              <WifiOff size={16} className="text-rose-500" strokeWidth={2} />
            ) : brainMode === "local" ? (
              <Cpu size={16} className="text-purple-500" strokeWidth={2} />
            ) : (
              <Cloud size={16} className="text-blue-500" strokeWidth={2} />
            )}
            <span className="ml-2 text-[13px] font-bold">
              {!isOnline ? "Local Only" : brainMode === "local" ? "Local Brain" : "Cloud Brain"}
            </span>
          </button>
        )}

        {/* User Profile - Clickable to navigate to profile */}
        <button
          onClick={handleProfileClick}
          className="flex flex-row items-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2 py-2 transition cursor-pointer"
        >
          <div className="relative mr-3 h-10 w-10 flex shrink-0 items-center justify-center rounded-full bg-orange-100">
            <span className="text-sm font-bold text-orange-700">
              {initials}
            </span>
            {/* Pulse Indicator */}
            <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${
              isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
            }`} />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {displayName}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                {user?.email ?? "No active session"}
              </span>
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${
                isOnline 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30' 
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
