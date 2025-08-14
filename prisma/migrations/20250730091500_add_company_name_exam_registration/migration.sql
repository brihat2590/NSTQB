-- Add companyName column to ExamRegistration if it does not exist
ALTER TABLE "ExamRegistration"
ADD COLUMN IF NOT EXISTS "companyName" TEXT;


