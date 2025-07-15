/*
  Warnings:

  - You are about to drop the column `paymentReference` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Registration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "paymentReference",
DROP COLUMN "transactionId",
ADD COLUMN     "transactionUuid" TEXT;
