import { FileText, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { MarkdownMessage } from "@/components/MarkdownMessage";
import { TypingBubble } from "@/components/TypingBubble";
import type { ChatMessage } from "@/modules/contracts";

type Props = {
  messages: ChatMessage[];
  isStreaming?: boolean;
};

export function ChatMessageList({ messages, isStreaming = false }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollSignature = useMemo(
    () =>
      messages
        .map((message) => `${message.id}:${message.content.length}`)
        .join("|"),
    [messages],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isStreaming ? "auto" : "smooth",
      block: "end",
    });
  }, [scrollSignature, isStreaming]);

  return (
    <div className="px-4 pt-4 pb-8 space-y-6">
      {messages.map((message) => {
        const isUser = message.role === "user";
        const isPendingAssistant =
          message.role === "assistant" &&
          message.deliveryState === "pending" &&
          message.content === "";

        return (
          <div
            key={message.id}
            className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
          >
            {isUser ? (
              <div className="flex flex-col items-end max-w-[92%] sm:max-w-[85%]">
                <motionless
                  className={`rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 text-[15px] leading-relaxed shadow-sm ${
                    message.deliveryState === "failed"
                      ? "bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  <p>{message.content}</p>

                  {message.document && (
                    <div className="flex flex-row items-center bg-white dark:bg-slate-800 rounded-xl px-3 py-2 mt-3 border border-slate-200 dark:border-slate-700 select-none">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-3 shrink-0">
                        <FileText size={16} className="text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-900 dark:text-blue-100 truncate">
                          {message.document.title}
                        </p>
                      </motionless>
                    </motionless>
                  )}
                </motionless>
                {message.deliveryState === "failed" && (
                  <span className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">Not sent</span>
                )}
              </motionless>
            ) : (
              <div className="flex flex-row w-full max-w-[95%] sm:max-w-3xl lg:max-w-4xl gap-2 sm:gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={18} className="text-blue-600" />
                </motionless>

                <div className="flex-1 pt-1 min-w-0">
                  {isPendingAssistant ? (
                    <TypingBubble />
                  ) : (
                    <MarkdownMessage content={message.content} />
                  )}
                </motionless>
              </motionless>
            )}
          </motionless>
        );
      })}
      <div ref={bottomRef} aria-hidden className="h-px w-full shrink-0" />
    </motionless>
  );
}
