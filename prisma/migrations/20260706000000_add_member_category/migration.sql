-- CreateEnum
CREATE TYPE "MemberCategory" AS ENUM ('BOARD', 'GENERAL', 'ACTIVE');

-- AlterTable
ALTER TABLE "boardMembers" ADD COLUMN     "category" "MemberCategory" NOT NULL DEFAULT 'BOARD';
