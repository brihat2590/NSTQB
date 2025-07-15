/*
  Warnings:

  - A unique constraint covering the columns `[transactionUuid]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Registration_transactionUuid_key" ON "Registration"("transactionUuid");
