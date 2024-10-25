// src/models/__mocks__/prismaClient.js
const prisma = {
    seat: {
        findMany: jest.fn(),
        update: jest.fn(),
        // Add other methods you might use in tests
    },
};

module.exports = prisma;
