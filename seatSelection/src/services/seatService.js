const prisma = require('../models/prismaClient');
const Redis = require('ioredis');

const redis = new Redis({ host: 'redis', port: 6379 }); // Adjust host/port if necessary

const getAvailableSeats = async (trainId) => {
    // Fetch available seats for the specified train
    const seats = await prisma.seat.findMany({
        where: {
            trainId: parseInt(trainId),
            status: 'available',
        },
    });
    console.log("seats", seats);
    return seats;
}; 

const reserveSeat = async (seatNumber, trainId, coachNumber, userId) => {
    // locking seat by seatNumber and trainId and coachNumber
    const lockKey = `seat_lock:${seatNumber}:${trainId}:${coachNumber}`;
    console.log("lockKey", lockKey);
    console.log("locked");
    // Try to set a lock with a TTL of 30 seconds
    const acquired = await redis.set(lockKey, userId, 'NX', 'EX', 180);
    
    if (acquired) {
        return { success: true, message: 'Lock acquired. Please confirm reservation.' };
    } 

    return { success: false, message: 'Seat is already reserved by another user.' };
};

const confirmReserve = async (seatNumber, trainId,coachNumber, userId) => {
    // Check if the lock is still held by the user
    const lockKey = `seat_lock:${seatNumber}:${trainId}:${coachNumber}`;
    const owner = await redis.get(lockKey);
    console.log("owner", owner); 
    console.log("userId", userId);
    if (parseInt(owner) === parseInt(userId)) {
        console.log("ownerverified");
        // Proceed to reserve the seat in the database
        await prisma.seat.update({
            where: {
                trainId_coachNumber_seatNumber: {
                    trainId: trainId,
                    coachNumber: coachNumber,
                    seatNumber: seatNumber,
                },
            },
            data: {
                status: 'booked',
            },
        });
        
        // Release the lock
        await redis.del(lockKey);
        
        return { success: true, message: 'Seat reserved successfully.' };
    }

    return { success: false, message: 'Reservation failed. Lock not held by you or seat is already sold.' };
};

module.exports = { getAvailableSeats, reserveSeat, confirmReserve };
