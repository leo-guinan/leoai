/*
  Warnings:

  - You are about to drop the column `currentDeckId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentDeckId",
ADD COLUMN     "currentTopicId" INTEGER;
