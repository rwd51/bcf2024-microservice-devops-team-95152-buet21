-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "trainId" INTEGER NOT NULL,
    "coachNumber" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seat_trainId_coachNumber_seatNumber_key" ON "Seat"("trainId", "coachNumber", "seatNumber");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
