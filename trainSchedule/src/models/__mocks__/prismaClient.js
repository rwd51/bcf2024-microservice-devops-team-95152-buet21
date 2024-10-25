// src/models/__mocks__/prismaClient.js

const mockFindUnique = jest.fn();

const mockTrainModel = {
    findUnique: mockFindUnique,
};

const mockPrisma = {
    train: mockTrainModel,
};

module.exports = mockPrisma;
