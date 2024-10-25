const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBookingById = async (bookingId) => {
    return await prisma.booking.findUnique({
        where: { id: bookingId },
    });
};




module.exports = {
    getBookingById, prisma 
};
