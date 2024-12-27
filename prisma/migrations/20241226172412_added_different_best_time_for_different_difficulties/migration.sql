/*
  Warnings:

  - You are about to drop the column `besttime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "besttime",
ADD COLUMN     "bestTimeEasy" INTEGER,
ADD COLUMN     "bestTimeHard" INTEGER,
ADD COLUMN     "bestTimeMid" INTEGER;
