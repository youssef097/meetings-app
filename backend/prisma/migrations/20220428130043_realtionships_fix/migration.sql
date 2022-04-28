/*
  Warnings:

  - You are about to drop the column `meetingId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_meetingId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "meetingId";

-- CreateTable
CREATE TABLE "UsersOnMeetig" (
    "userId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersOnMeetig_pkey" PRIMARY KEY ("userId","meetingId")
);

-- AddForeignKey
ALTER TABLE "UsersOnMeetig" ADD CONSTRAINT "UsersOnMeetig_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnMeetig" ADD CONSTRAINT "UsersOnMeetig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
