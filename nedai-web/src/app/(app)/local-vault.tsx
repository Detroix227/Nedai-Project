import React, { useState, useCallback } from 'react';
import { AppShell } from '@/components/AppShell';
import { Upload, FileText, Database, ShieldCheck, Sparkles, X, CheckCircle2, Loader2 } from 'lucide-react';

export default function LocalVaultScreen() {
  const [isDragging, setIsDragging] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [results, setResults] = useState<{ name: string; chunks: number } | null>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleIngest = async (file: File) => {
    const isDoc = file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc');
    if (!isDoc) {
      alert('Henry only supports PDF and Word documents for now!');
      return;
    }

    setIngesting(true);
    try {
      // In Electron, we need the file path. 
      // For web-dev testing, this won't work, but it's ready for the Desktop app.
      const filePath = (file as any).path || file.name;
      const chunks = await window.electronAPI.ingestFile(filePath);
      
      setResults({ name: file.name, chunks });
      setTimeout(() => setResults(null), 5000);
    } catch (error) {
      console.error('Ingestion failed:', error);
    } finally {
      setIngesting(false);
      setIsDragging(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleIngest(files[0]);
    }
  }, []);

  return (
    <AppShell title="Henry's Vault">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <Database className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Local Intelligence Memory</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            Files dropped here are stored locally on your device. Henry uses this data to answer your questions when you're offline or in "Local Brain" mode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">100% Private</h3>
              <p className="text-xs text-slate-500 mt-1">Data never leaves your laptop. No cloud sync required.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Offline Brain</h3>
              <p className="text-xs text-slate-500 mt-1">Works perfectly without an internet connection.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <FileText className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Smart Context</h3>
              <p className="text-xs text-slate-500 mt-1">Automatically indexed and ready for retrieval.</p>
            </div>
          </div>
        </div>

        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative h-80 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-10 ${
            isDragging 
              ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/10' 
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50'
          }`}
        >
          {ingesting ? (
            <div className="flex flex-col items-center">
              <Loader2 className="text-amber-500 animate-spin mb-4" size={48} />
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Henry is reading...</h2>
              <p className="text-slate-500 mt-2">Chunking and embedding your document.</p>
            </div>
          ) : results ? (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Successfully Learned!</h2>
              <p className="text-slate-500 mt-2 max-w-xs">
                {results.name} has been indexed into {results.chunks} memory fragments.
              </p>
            </div>
          ) : (
            <>
              <div className={`p-5 rounded-2xl mb-4 transition-transform duration-300 ${isDragging ? 'scale-110 bg-amber-100' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <Upload className={isDragging ? 'text-amber-600' : 'text-slate-400'} size={40} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Drop PDFs or Word Docs here</h2>
              <p className="text-slate-500 mt-2 text-center max-w-sm">
                Drag and drop your study materials. Henry will process them locally for offline chat.
              </p>
              <button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-6 px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold hover:opacity-90 transition"
              >
                Select Files
              </button>
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept=".pdf,.docx,.doc"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleIngest(file);
                }}
              />
            </>
          )}

          {isDragging && (
            <div className="absolute inset-0 bg-amber-500/5 rounded-3xl pointer-events-none border-4 border-amber-500/20 m-2" />
          )}
        </div>
      </div>
    </AppShell>
  );
}
