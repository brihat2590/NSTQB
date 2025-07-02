/*
  Warnings:

  - You are about to drop the `BoardMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BoardMembers";

-- CreateTable
CREATE TABLE "boardMembers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "linkedInUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "boardMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boardMembers_name_key" ON "boardMembers"("name");
