// Removed unused useConnectivityStore import
export async function streamLocalMessage(
  payload: { content: string },
  onEvent: (event: any) => void,
  onError?: (error: Error) => void
): Promise<() => void> {
  const abortController = new AbortController();
  
  // 1. Ask Henry for local context first!
  let localContext = "";
  try {
    if (window.electronAPI) {
      localContext = await window.electronAPI.queryLocalBrain(payload.content);
    }
  } catch (e) {
    console.warn("Henry couldn't find context, proceeding with general knowledge.");
  }

  // 2. Format for Ollama /api/chat with Henry's Context
  const ollamaPayload = {
    model: "phi3:mini",
    messages: [
      {
        role: "system",
        content: `You are NedAI, an adaptive study assistant. You are now responding in local offline mode.
        You have 6 response modalities. Analyze the user's message and automatically select the most appropriate modality:
        
        1. REFLECTIVE - Use when user expresses emotions, stress, frustration, or personal struggles. Be empathetic, validate feelings.
        2. ANALYTICAL - Use for complex concepts, math, science, logic problems. Be the genius classmate. Use LaTeX ($...$ or $$...$$) for formulas. Explain the "why" behind concepts in depth.
        3. GUIDE - Use when user asks "how do I...", "what should I...", needs direction. Be the senior mentor. Give actionable strategies, step-by-step guidance.
        4. LIVELY - Use when user shares wins, progress, or asks for encouragement. Be the hype-man. Show high energy, celebrate achievements.
        5. CONCISE - Use for simple factual questions or when user seems rushed. Direct, polite, zero fluff.
        6. CHALLENGER - Use when user is procrastinating, making excuses, or needs accountability. Be the tough coach.
        
        STRICT RULES:
        1. NEVER say "I couldn't find any information in the documents" or "Answered from general knowledge". 
        2. If no context is available, simply answer the user's question directly and helpfully.
        3. Maintain a supportive, student-focused tone.
        4. Adapt tone based on the modality you selected.
        5. CRITICAL: NEVER output metadata patterns like "Subject:", "Lesson:", "Path:", "Page:", "Similarity:", or URLs. Only output the actual educational content.
        
        STYLE & FORMATTING RULES (CAPTIVATING & CHATGPT-LIKE):
        - EMOJIS & HEADINGS: Use strategic, relevant emojis at the start of all major headings (e.g. 🔍, ⚙️, 🧠, 💡, 🎯, 🚀, 📝, ❓) to make the content visually engaging and easy to navigate.
        - BOLD & HIGHLIGHTS: Bold key terms, definitions, and critical takeaways using markdown (e.g. **keyword**) to help the student scan and absorb information instantly.
        - CONCEPTS SEPARATION: Separate major concepts or sections using horizontal rules (---) to give the output breathing room.
        - STRUCTURE & BREAKDOWN: Break down explanations into short, highly-readable paragraphs (under 3 sentences) and structured bullet points. For structured info, use nested bullets (e.g. bold sub-points) rather than dense blocks of text.
        - CODE & MATHEMATICS: Wrap all code blocks in proper markdown triple backticks. Wrap all mathematical expressions and formulas in LaTeX formatting ($...$ for inline or $$...$$ for block).
        - TONE & FLOW: Write in a warm, encouraging, student-centric tone. Keep it lively, engaging, and clear. Avoid rigid, robotic, or overly verbose transition sentences. Directly deliver the answers without meta-commentary like "As an AI..." or "Based on my instructions...".
        
        ${localContext}`
      },
      {
        role: "user",
        content: payload.content
      }
    ],
    stream: true
  };

  fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ollamaPayload),
    signal: abortController.signal
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Local Ollama not reachable");
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              onEvent({ type: "chunk", content: data.message.content });
            }
            if (data.done) {
              onEvent({ type: "done" });
            }
          } catch (e) {
            console.error("Error parsing local chunk", e);
          }
        }
      }
    })
    .catch((err) => {
      if (err.name !== "AbortError") {
        onError?.(err);
      }
    });

  return () => abortController.abort();
}
