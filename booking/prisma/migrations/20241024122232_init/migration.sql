-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "train_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "booking_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
