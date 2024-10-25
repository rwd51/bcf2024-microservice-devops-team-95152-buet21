/*
  Warnings:

  - You are about to drop the column `booking_time` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `seat_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `train_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `coachNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "booking_time",
DROP COLUMN "payment_status",
DROP COLUMN "seat_id",
DROP COLUMN "train_id",
DROP COLUMN "user_id",
ADD COLUMN     "bookingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "coachNumber" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ADD COLUMN     "seatNumber" INTEGER NOT NULL,
ADD COLUMN     "trainId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;
