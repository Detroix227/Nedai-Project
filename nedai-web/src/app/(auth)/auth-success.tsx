import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Monitor, ArrowRightLeft } from "lucide-react";

export default function AuthSuccessScreen() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Automatically trigger deep link after a short delay
    const timeout = setTimeout(() => {
      if (token) {
        window.location.href = `nedai://auth?token=${token}`;
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [token]);

  const handleManualRedirect = () => {
    if (token) {
      window.location.href = `nedai://auth?token=${token}`;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-10 inline-block">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative h-24 w-24 mx-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
            <CheckCircle2 size={48} className="text-green-500 animate-bounce-slow" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Success!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-12 text-lg leading-relaxed">
          You have successfully signed in. We're now securely passing your session back to the <b>NedAI Desktop</b> app.
        </p>

        {/* Sync Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <img src="/nedai-text-logo.png" alt="Web" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Web</span>
            </div>
            
            <ArrowRightLeft className="text-slate-300 dark:text-slate-700 animate-pulse" />

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                <Monitor size={24} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Desktop</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-progress-fast" />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Redirecting in a moment...
            </p>
          </div>

          <button
            onClick={handleManualRedirect}
            className="mt-8 w-full py-4 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition hover:opacity-90 active:scale-[0.98]"
          >
            Open Desktop App Manually
          </button>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          You can safely close this window after the app opens.
        </p>
      </div>
    </main>
  );
}
