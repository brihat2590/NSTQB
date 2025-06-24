/*
  Warnings:

  - You are about to drop the `ExamSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExamSchedule";

-- CreateTable
CREATE TABLE "examSchedule" (
    "id" TEXT NOT NULL,
    "examTitle" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "applicationPeriod" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "examSchedule_pkey" PRIMARY KEY ("id")
);
