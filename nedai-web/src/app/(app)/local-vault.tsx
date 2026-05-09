import { useEffect, useState } from "react";
import { FileText, Trash2, FileUp, Cpu, HardDrive } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export default function LocalVaultScreen() {
  const [files, setFiles] = useState<{name: string, chunks: number}[]>([]);
  const [isIngesting, setIsIngesting] = useState(false);

  // In a real scenario, we'd fetch this from the electron engine
  // For now, it's a demonstration of the local ingestion flow

  async function handleIngest() {
    if (!window.electronAPI) return;
    
    // In a real app, we'd use a file picker. 
    // Here we use the electron bridge to trigger a native dialog (logic in main.js)
    alert("Please select a file to ingest into your Local Brain.");
  }

  return (
    <AppShell title="Local Vault">
      <div className="flex flex-col w-full max-w-4xl mx-auto p-6">
        
        {/* Desktop Exclusive Banner */}
        <div className="rounded-3xl bg-blue-600 p-8 mb-8 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Cpu size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive size={20} className="text-blue-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Desktop Exclusive</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">Local Knowledge Base</h1>
            <p className="text-blue-100 text-lg max-w-xl leading-relaxed">
              Documents added here stay on your computer. They are indexed locally by Henry and are never uploaded to the cloud.
            </p>
          </div>
        </div>

        {/* Action Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={handleIngest}
            disabled={isIngesting}
            className="group p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-slate-900 transition-all flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileUp size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Add Local Document</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">PDF or DOCX for Henry to learn</p>
          </button>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Engine Status</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Henry Online
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Local embeddings are powered by MiniLM-L6-v2 and stored in a private LanceDB instance.
            </p>
          </div>
        </div>

        {/* List Section */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText size={20} className="text-slate-400" />
            Henry's Memory
          </h2>
          
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
            {files.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {files.map((file, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <FileText size={18} className="text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{file.name}</p>
                        <p className="text-xs text-slate-500">{file.chunks} local knowledge chunks</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-800">
                  <FileText size={28} className="text-slate-300" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Henry hasn't learned anything locally yet.</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Upload a file to start building your private knowledge base.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
