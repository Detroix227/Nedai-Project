-- CreateTable "chat_embeddings"
CREATE TABLE "chat_embeddings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector(1536),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chat_embeddings_userId_idx" ON "chat_embeddings"("userId");

-- CreateIndex
CREATE INDEX "chat_embeddings_chatId_idx" ON "chat_embeddings"("chatId");

-- CreateIndex
CREATE INDEX "chat_embeddings_createdAt_idx" ON "chat_embeddings"("createdAt");

-- AddForeignKey
ALTER TABLE "chat_embeddings" ADD CONSTRAINT "chat_embeddings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_embeddings" ADD CONSTRAINT "chat_embeddings_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_embeddings" ADD CONSTRAINT "chat_embeddings_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
