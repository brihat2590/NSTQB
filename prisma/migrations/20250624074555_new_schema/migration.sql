-- CreateTable
CREATE TABLE "certifiedTesters" (
    "is" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "certificateBody" TEXT NOT NULL,
    "examProvider" TEXT NOT NULL,
    "certification" TEXT NOT NULL,
    "countryOfIssue" TEXT NOT NULL,
    "certificationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certifiedTesters_pkey" PRIMARY KEY ("is")
);

-- CreateTable
CREATE TABLE "nstqbExamDate" (
    "id" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nstqbExamDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "certifiedTesters_certificateNumber_key" ON "certifiedTesters"("certificateNumber");
