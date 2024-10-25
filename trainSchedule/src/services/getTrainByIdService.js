//src/services/getTrainByIdService.js

const prisma = require('../models/prismaClient'); // Import Prisma client
const Redis = require('ioredis');

const redis = new Redis({ host: 'redis', port: 6379 }); // Adjust host/port if necessary

redis.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

const getTrainByIdService = async (req) => {
    const { id } = req.params;
    const redisKey = `train:${id}`;
    console.log('id:', id); 
    // Check Redis cache first
    let train = await redis.get(redisKey);

    if (train) {
        console.log('Train data from Redis cache');
        // If found in cache, parse and return it
        return JSON.parse(train);
    } else {
        // If not found, fetch from the database
        train = await prisma.train.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (train) {
            // Store the result in Redis with an expiration time (e.g., 1 hour)
            await redis.set(redisKey, JSON.stringify(train), 'EX', 3600);
        }

        return train; // Return the train data
    }
};

module.exports = { getTrainByIdService };
