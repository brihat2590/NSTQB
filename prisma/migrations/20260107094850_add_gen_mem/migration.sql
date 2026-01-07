-- CreateTable
CREATE TABLE "generalMembers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "linkedInUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "generalMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generalMembers_name_key" ON "generalMembers"("name");
