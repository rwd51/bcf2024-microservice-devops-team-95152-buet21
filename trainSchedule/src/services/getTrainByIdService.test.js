const { getTrainByIdService } = require('./getTrainByIdService');
const Redis = require('ioredis');
// mocking prisma
jest.mock('../models/prismaClient', () => ({
    train: {
        findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Express Train' }),
    },
}));
jest.mock('ioredis');
const mockRedis = new Redis();

describe('getTrainByIdService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns train data from Redis cache if it exists', async () => {
        const req = { params: { id: '1' } };
        const trainData = { id: 1, name: 'Express Train' };

        mockRedis.get.mockResolvedValue(JSON.stringify(trainData)); // Mocking Redis get
        const result = await getTrainByIdService(req);

        // result is an object, so we need to compare the properties
        expect(result.id).toEqual(trainData.id);
    });

    it('fetches train data from the database if not found in Redis', async () => {
        const req = { params: { id: '1' } };
        const trainData = { id: 1, name: 'Express Train' };

        mockRedis.get.mockResolvedValue(null); // Mocking Redis get
       
        const result = await getTrainByIdService(req);

        // result is an object, so we need to compare the properties
        expect(result.id).toEqual(trainData.id);

    });
});
