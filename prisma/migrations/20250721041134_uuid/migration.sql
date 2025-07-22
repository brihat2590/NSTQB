/*
  Warnings:

  - You are about to drop the column `transactionUuid` on the `EventRegistration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transaction_uuid]` on the table `EventRegistration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EventRegistration_transactionUuid_key";

-- AlterTable
ALTER TABLE "EventRegistration" DROP COLUMN "transactionUuid",
ADD COLUMN     "transaction_uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_transaction_uuid_key" ON "EventRegistration"("transaction_uuid");
