const prisma = require('../models/prismaClient');
const Redis = require('ioredis');
const redis = new Redis({ host: 'redis', port: 6379 }); // Adjust host/port if necessary

redis.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
const getTrainsService = async () => {
    const redisKey = 'trains:list';

    // Check Redis cache first
    let trains = await redis.get(redisKey);

    if (trains) {
        console.log('Train data from Redis cache');
        // If found in cache, parse and return it
        return JSON.parse(trains);
    } else {
        // If not found, fetch from the database
        trains = await prisma.train.findMany();

        // Store the result in Redis with an expiration time (e.g., 1 hour)
        await redis.set(redisKey, JSON.stringify(trains), 'EX', 3600);

        return trains; // Return the data
    }
};

module.exports = { getTrainsService };
