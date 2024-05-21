/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `ChatTopic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `ChatTopic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatTopic" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatTopic_uuid_key" ON "ChatTopic"("uuid");
