import { FileText, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

import { MarkdownMessage } from "@/components/MarkdownMessage";
import { TypingBubble } from "@/components/TypingBubble";
import type { ChatMessage } from "@/modules/contracts";

type Props = {
  messages: ChatMessage[];
};

export function ChatMessageList({ messages }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-6 scroll-smooth"
    >
      {messages.map((message) => {
        const isUser = message.role === "user";
        const isPendingAssistant =
          message.role === "assistant" &&
          message.deliveryState === "pending" &&
          message.content === "";
        const assistantStatus = message.grounded
          ? "Grounded in study material"
          : message.usedGeneralKnowledge
            ? "Answered from general knowledge"
            : null;

        return (
          <div
            key={message.id}
            className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
          >
            {isUser ? (
              <div className="flex flex-col items-end max-w-[85%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-slate-900 text-[15px] leading-relaxed shadow-sm ${
                    message.deliveryState === "failed"
                      ? "bg-red-50 border border-red-300"
                      : "bg-slate-200"
                  }`}
                >
                  <p>{message.content}</p>
                  
                  {message.document && (
                    <div className="flex flex-row items-center bg-white rounded-xl px-3 py-2 mt-3 border border-slate-200 select-none">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 shrink-0">
                        <FileText size={16} className="text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-900 truncate">
                          {message.document.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {message.deliveryState === "failed" && (
                  <span className="mt-2 text-xs font-semibold text-red-600">Not sent</span>
                )}
              </div>
            ) : (
              <div className="flex flex-row w-full max-w-4xl gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={18} className="text-blue-600" />
                </div>
                
                <div className="flex-1 pt-1 min-w-0">
                  {isPendingAssistant ? (
                    <TypingBubble />
                  ) : (
                    <MarkdownMessage content={message.content} />
                  )}
                  
                  {assistantStatus && (message.sources?.length || message.usedGeneralKnowledge) && (
                    <p className="text-blue-600 text-xs font-semibold mt-3">
                      {assistantStatus}
                    </p>
                  )}
                  
                  {message.sources?.length ? (
                    <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col gap-3">
                      {message.sources.map((source, index) => (
                        <div key={`${message.id}-${index}`}>
                          <p className="text-slate-900 text-sm font-bold">{source.subject}</p>
                          <p className="text-slate-700 text-sm mt-0.5">{source.lessonTitle}</p>
                          <p className="text-slate-500 text-xs mt-1">
                            {source.sourcePath}
                            {source.pageNumber !== undefined ? ` • Page ${source.pageNumber}` : ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
