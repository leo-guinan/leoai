/*
  Warnings:

  - You are about to drop the column `currentTopicId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentTopicId",
ADD COLUMN     "currentTopicUUID" TEXT;
