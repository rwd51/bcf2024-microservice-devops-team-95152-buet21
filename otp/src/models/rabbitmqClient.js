const amqp = require('amqplib');

let channel = null;
let connection = null;
const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        channel.assertQueue('payment_confirmation', { durable: true });
        channel.assertQueue('ticket_book', { durable: true });
        console.log("RabbitMQ connected!");
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        process.exit(1);
    }
}; 

const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized.");
    }
    return channel;
};

const disconnectRabbitMQ = async () => {
    if (channel) {
        await channel.close();
    }
    if (connection) {
        await connection.close();
    }
    console.log("RabbitMQ disconnected!");
}


module.exports = {
    connectRabbitMQ,
    getChannel,
    disconnectRabbitMQ,
};
