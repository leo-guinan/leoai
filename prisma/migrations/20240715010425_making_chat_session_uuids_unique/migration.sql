/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `ChatSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatSession_uuid_key" ON "ChatSession"("uuid");
