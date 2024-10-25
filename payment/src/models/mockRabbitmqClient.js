// __mocks__/rabbitmqClient.js
const mockChannel = {
    sendToQueue: jest.fn(),
    // Add other methods that you might use
};

const connectRabbitMQ = jest.fn().mockResolvedValue(mockChannel);
const disconnectRabbitMQ = jest.fn().mockResolvedValue(undefined);
const getChannel = jest.fn().mockReturnValue(mockChannel);

module.exports = {
    connectRabbitMQ,
    disconnectRabbitMQ,
    getChannel,
};
