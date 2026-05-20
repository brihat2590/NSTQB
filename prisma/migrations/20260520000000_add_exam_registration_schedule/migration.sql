ALTER TABLE "ExamRegistration" ADD COLUMN "examScheduleId" TEXT;

ALTER TABLE "ExamRegistration" ADD CONSTRAINT "ExamRegistration_examScheduleId_fkey" FOREIGN KEY ("examScheduleId") REFERENCES "examSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
