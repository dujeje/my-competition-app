-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "scheduleData" JSONB NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
