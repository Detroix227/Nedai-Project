import { ArrowUp, FileText, Plus, X } from "lucide-react";
import React, { useRef, useEffect } from "react";

import type { DocumentSummary } from "@/modules/contracts";

export type DocumentSuggestionStatus = "idle" | "loading" | "ready" | "empty";
export type HelperTone = "neutral" | "success" | "error";

type Props = {
  disabled?: boolean;
  value: string;
  helperText?: string;
  helperTone?: HelperTone;
  onChangeText: (message: string) => void;
  onSend?: () => void;
  onAttach?: () => void;
  selectedDocument?: DocumentSummary | null;
  onClearSelectedDocument?: () => void;
  showDocumentSuggestions?: boolean;
  documentSuggestions?: DocumentSummary[];
  documentSuggestionStatus?: DocumentSuggestionStatus;
  onSelectDocument?: (document: DocumentSummary) => void;
  contextUsage?: number;
  className?: string;
};

function getDocumentStatusDescription(document: DocumentSummary) {
  if (document.status === "PROCESSING" || document.status === "UPLOADED") {
    return "Processing. Wait before attaching.";
  }

  if (document.status === "FAILED") {
    return document.processingError || "Processing failed. Re-upload or retry.";
  }

  return `${document.sourceType} file`;
}

export function ChatInput({
  disabled = false,
  value,
  helperText,
  helperTone = "neutral",
  onChangeText,
  onSend,
  onAttach,
  selectedDocument,
  onClearSelectedDocument,
  showDocumentSuggestions = false,
  documentSuggestions = [],
  documentSuggestionStatus = "idle",
  onSelectDocument,
  contextUsage = 0,
  className = "",
}: Props) {
  const hasSendableText = value.trim().length > 0 && !disabled;
  const hasSuggestions = documentSuggestions.length > 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"; // base height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [value]);

  const helperColors = {
    error: "text-red-600",
    success: "text-green-700",
    neutral: "text-slate-500",
  };

  return (
    <div className={`px-4 pt-2 pb-6 bg-white shrink-0 ${className}`}>
      <div className="w-full max-w-4xl mx-auto flex flex-col relative">
        {selectedDocument && (
          <div className="flex flex-row items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2.5 mb-3 w-fit">
            <div className="flex flex-row items-center mr-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 mr-2.5 shrink-0">
                <FileText size={16} className="text-blue-600" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col max-w-[200px]">
                <span className="text-blue-900 text-sm font-bold truncate">
                  {selectedDocument.title}
                </span>
                <span className="text-blue-600 text-xs mt-0.5 truncate">
                  {selectedDocument.sourceType} attached
                </span>
              </div>
            </div>
            <button
              onClick={onClearSelectedDocument}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/80 hover:bg-white transition-colors"
            >
              <X size={16} className="text-slate-500" strokeWidth={2.4} />
            </button>
          </div>
        )}

        {helperText && (
          <p className={`text-xs mb-2 leading-relaxed ${helperColors[helperTone]}`}>
            {helperText}
          </p>
        )}

        {showDocumentSuggestions && (
          <div className="absolute bottom-full left-0 right-0 mb-3 max-h-[240px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl flex flex-col z-50">
            <div className="flex flex-row items-center justify-between mb-2 pb-1">
              <span className="text-slate-900 text-sm font-bold">Attach a document</span>
              {documentSuggestionStatus === "loading" && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            {hasSuggestions ? (
              <div className="overflow-y-auto max-h-[190px] flex flex-col space-y-1 pr-1 custom-scrollbar">
                {documentSuggestions.map((document) => {
                  const isSelectable = document.status === "READY";

                  return (
                    <button
                      key={document.id}
                      disabled={!isSelectable}
                      onClick={() => isSelectable && onSelectDocument?.(document)}
                      className={`flex flex-row items-center rounded-2xl px-3 py-2.5 text-left transition-colors ${
                        isSelectable ? "hover:bg-slate-50 cursor-pointer" : "opacity-70 cursor-not-allowed"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 mr-3 shrink-0">
                        <FileText
                          size={16}
                          className={isSelectable ? "text-blue-600" : "text-slate-400"}
                          strokeWidth={2.2}
                        />
                      </div>
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-slate-900 text-sm font-semibold truncate">
                          {document.title}
                        </p>
                        <p className="text-slate-500 text-xs leading-none mt-1 truncate">
                          {getDocumentStatusDescription(document)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          isSelectable
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {document.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-[13px] leading-relaxed px-1 pb-1">
                {documentSuggestionStatus === "loading"
                  ? "Searching your uploaded documents..."
                  : documentSuggestionStatus === "empty"
                    ? "No matching documents found. Try another name or upload one with +."
                    : "No uploaded documents yet. Use + to upload a PDF or DOCX file."}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-row items-end gap-3 w-full">
          <button
            disabled={disabled}
            onClick={onAttach}
            className="w-[42px] h-[42px] shrink-0 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <Plus size={24} className="text-slate-400" strokeWidth={2.5} />
          </button>

          <div className="flex-1 flex flex-row items-end bg-slate-50 border border-slate-200 rounded-3xl pl-4 pr-2 py-2 min-h-[52px] focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <textarea
              ref={textareaRef}
              disabled={disabled}
              value={value}
              onChange={(e) => onChangeText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (hasSendableText) onSend?.();
                }
              }}
              placeholder="Message NedAI..."
              className="flex-1 bg-transparent border-0 resize-none outline-none text-slate-900 text-base py-1.5 custom-scrollbar disabled:opacity-50"
              style={{ maxHeight: "120px" }}
            />

            <div className="flex flex-row items-center shrink-0 ml-2 h-[34px]">
              <ContextUsageIndicator usage={contextUsage} />
              <button
                disabled={!hasSendableText}
                onClick={onSend}
                className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all ${
                  hasSendableText
                    ? "bg-slate-900 hover:bg-slate-800 shadow-md transform hover:scale-105 active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <ArrowUp size={20} className="text-white" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContextUsageIndicator = ({ usage }: { usage: number }) => {
  const size = 32;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (usage / 100) * circumference;

  let color = "#10B981"; // Green
  let textClass = "text-green-500";
  if (usage > 80) {
    color = "#EF4444"; // Red
    textClass = "text-red-500";
  } else if (usage > 50) {
    color = "#F59E0B"; // Amber
    textClass = "text-amber-500";
  }

  return (
    <div className="relative w-8 h-8 mr-2 flex items-center justify-center select-none" title={`Context limit: ${usage}% used`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-[9px] font-bold ${textClass}`}>{usage}</span>
      </div>
    </div>
  );
};
