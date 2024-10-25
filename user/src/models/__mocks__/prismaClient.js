const mockPrismaClient = {
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
};

module.exports = mockPrismaClient;
