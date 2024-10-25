// services/bookingService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBooking = async (seatNumber, trainId, coachNumber, userId) => {
    try {
        
    // Create a new booking
        const newBooking = await prisma.booking.create({
            data: {
                userId: userId,
                seatNumber: seatNumber,
                trainId: trainId,
                coachNumber: coachNumber,
                status: 'booked', // Assuming the booking is confirmed upon insertion
                paymentStatus: 'done', // You can adjust this based on your needs
            },
        });

        return newBooking;
    } catch (error) {
        throw error;
    }
};

module.exports = { createBooking };
