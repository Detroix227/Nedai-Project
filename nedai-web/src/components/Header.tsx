import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/useAuthStore";

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
  
  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <header className="flex flex-row items-center justify-between px-3 sm:px-4 pt-3 sm:pt-4 pb-3 sm:pb-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-row items-center shrink-1 min-w-0">
        <div className="flex items-center justify-center mr-2 sm:mr-3 shrink-0">
          <img src="/nedai-text-logo.png" alt="NedAI" className="h-6 sm:h-8 object-contain" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 block">
            NedAI Workspace
          </span>
          <h1 className="text-lg sm:text-[22px] font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">
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

        {/* User Profile - Clickable to navigate to profile */}
        <button
          onClick={handleProfileClick}
          className="flex flex-row items-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-1 sm:px-2 py-2 transition cursor-pointer"
        >
          <div className="mr-2 sm:mr-3 h-8 w-8 sm:h-10 sm:w-10 flex shrink-0 items-center justify-center rounded-full bg-orange-100">
            <span className="text-xs sm:text-sm font-bold text-orange-700">
              {initials}
            </span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {displayName}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 truncate">
              {user?.email ?? "No active session"}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
