import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

export function MarkdownMessage({ content }: Props) {
  return (
    <div className="prose prose-slate prose-p:leading-relaxed prose-pre:bg-slate-100 prose-pre:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg max-w-none break-words">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
