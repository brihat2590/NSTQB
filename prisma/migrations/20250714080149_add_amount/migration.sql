/*
  Warnings:

  - Added the required column `amount` to the `Intent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Intent" ADD COLUMN     "amount" INTEGER NOT NULL;
