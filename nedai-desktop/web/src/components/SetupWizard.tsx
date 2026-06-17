import { Loader2, Download, CheckCircle2, AlertCircle, Database, Cpu, HardDrive } from 'lucide-react';
import { useAuthStore } from '@/modules/auth/useAuthStore';

export function SetupWizard() {
  const status = useAuthStore((state) => state.bootstrapStatus);
  const progress = useAuthStore((state) => state.bootstrapProgress);

  const getStatusDisplay = (cardType: 'ollama' | 'henry' | 'model') => {
    switch (cardType) {
      case 'ollama':
        if (status === 'error-no-ollama') {
          return { label: 'Not Running', color: 'text-rose-400 bg-rose-950/40 border-rose-800/50', icon: <AlertCircle className="w-4 h-4" /> };
        }
        if (status === 'initializing') {
          return { label: 'Checking...', color: 'text-amber-400 bg-amber-950/40 border-amber-800/50 animate-pulse', icon: <Loader2 className="w-4 h-4 animate-spin" /> };
        }
        return { label: 'Active', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30', icon: <CheckCircle2 className="w-4 h-4" /> };

      case 'henry':
        if (status === 'initializing') {
          return { label: 'Ingesting...', color: 'text-amber-400 bg-amber-950/40 border-amber-800/50 animate-pulse', icon: <Loader2 className="w-4 h-4 animate-spin" /> };
        }
        if (status === 'error-no-ollama') {
          return { label: 'Waiting...', color: 'text-slate-400 bg-slate-900 border-slate-800', icon: <Loader2 className="w-4 h-4" /> };
        }
        return { label: 'Ready', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30', icon: <CheckCircle2 className="w-4 h-4" /> };

      case 'model':
        if (status === 'pulling') {
          return { label: `Downloading (${progress}%)`, color: 'text-blue-400 bg-blue-950/40 border-blue-800/50', icon: <Download className="w-4 h-4 animate-bounce" /> };
        }
        if (status === 'initializing' || status === 'error-no-ollama') {
          return { label: 'Waiting...', color: 'text-slate-400 bg-slate-900 border-slate-800', icon: <Loader2 className="w-4 h-4" /> };
        }
        if (status === 'error-pull-failed') {
          return { label: 'Failed', color: 'text-rose-400 bg-rose-950/40 border-rose-800/50', icon: <AlertCircle className="w-4 h-4" /> };
        }
        return { label: 'Installed', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30', icon: <CheckCircle2 className="w-4 h-4" /> };
    }
  };

  const ollamaStatus = getStatusDisplay('ollama');
  const henryStatus = getStatusDisplay('henry');
  const modelStatus = getStatusDisplay('model');

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl px-6 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-4 flex justify-center items-center mb-5 shadow-2xl border border-slate-800/60">
            <img 
              src="nedai-symbol-v3.png" 
              alt="NedAI Logo" 
              className="w-full h-full object-contain scale-110"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200">
            Setting up Offline Brain
          </h1>
          <p className="mt-2.5 text-sm text-slate-400 max-w-md">
            We are configuring your secure, 100% private offline study assistant. This takes a moment on first launch.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Ollama Card */}
          <div className="flex flex-col p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md transition-all duration-300 hover:border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
                <Cpu size={18} />
              </div>
              <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${ollamaStatus.color}`}>
                {ollamaStatus.icon}
                {ollamaStatus.label}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-200 mb-1">Ollama Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Orchestrates and manages local LLM processes in the background.
            </p>
          </div>

          {/* Henry Card */}
          <div className="flex flex-col p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md transition-all duration-300 hover:border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                <Database size={18} />
              </div>
              <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${henryStatus.color}`}>
                {henryStatus.icon}
                {henryStatus.label}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-200 mb-1">Henry (Local DB)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Indexes your textbooks and raw files directly on your machine.
            </p>
          </div>

          {/* Model Card */}
          <div className="flex flex-col p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md transition-all duration-300 hover:border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <HardDrive size={18} />
              </div>
              <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${modelStatus.color}`}>
                {modelStatus.icon}
                {modelStatus.label}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-200 mb-1">Phi-3 Mini</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your offline AI model. Generates study guides and explanations.
            </p>
          </div>
        </div>

        {/* Global Progress Bar Area */}
        <div className="w-full max-w-xl flex flex-col items-center">
          {status === 'error-no-ollama' ? (
            <div className="flex flex-col items-center p-4 bg-rose-950/20 border border-rose-900/40 rounded-2xl text-center w-full">
              <p className="text-sm font-semibold text-rose-400 mb-1">⚠️ Ollama connection failed</p>
              <p className="text-xs text-slate-400 leading-relaxed px-4">
                Please make sure Ollama is installed and running on your system. 
                Double-click the Ollama icon in your system tray and restart the app.
              </p>
            </div>
          ) : status === 'pulling' ? (
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2.5 px-1">
                <span className="text-xs font-semibold text-slate-400">Downloading Phi-3 Mini (~2.2 GB)</span>
                <span className="text-xs font-extrabold text-blue-400">{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="mt-3 text-xs text-slate-500 animate-pulse text-center">
                This might take a few minutes depending on your internet connection speed.
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-3" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase animate-pulse">
                {status === 'initializing' ? 'Bootstrapping local vector index...' : 'Checking local engines...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
