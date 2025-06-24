/*
  Warnings:

  - You are about to drop the `nstqbExamDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "nstqbExamDate";

-- CreateTable
CREATE TABLE "ExamSchedule" (
    "id" TEXT NOT NULL,
    "examTitle" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "applicationPeriod" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "ExamSchedule_pkey" PRIMARY KEY ("id")
);
