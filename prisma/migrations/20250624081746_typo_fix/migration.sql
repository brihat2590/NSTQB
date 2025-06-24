/*
  Warnings:

  - The primary key for the `certifiedTesters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is` on the `certifiedTesters` table. All the data in the column will be lost.
  - The required column `id` was added to the `certifiedTesters` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- First make the id column optional
ALTER TABLE "certifiedTesters" DROP CONSTRAINT "certifiedTesters_pkey",
DROP COLUMN "is",
ADD COLUMN     "id" TEXT;

-- Generate UUIDs for existing rows
UPDATE "certifiedTesters" SET "id" = gen_random_uuid()::TEXT WHERE "id" IS NULL;

-- Make the id column required and set as primary key
ALTER TABLE "certifiedTesters" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "certifiedTesters_pkey" PRIMARY KEY ("id");
