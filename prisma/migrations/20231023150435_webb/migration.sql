-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "team" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
