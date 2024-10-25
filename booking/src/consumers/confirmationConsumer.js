// consumers/confirmationConsumer.js

const { getChannel } = require('../models/rabbitmqClient');
const { createBooking } = require('../services/bookingService'); // Function to create a booking

const startConsumer = async () => {
    const channel = await getChannel();

    channel.consume('ticket_book', async (msg) => {
        if (msg !== null) {
            const bookingData = JSON.parse(msg.content.toString());
            console.log('Received message:', bookingData);
            try {
                // Assuming amount is calculated or passed in the message, adjust as necessary
                const newBooking = await createBooking(bookingData.seatNumber, bookingData.trainId, bookingData.coachNumber, bookingData.userId);
                console.log('New booking created:', newBooking);
                channel.ack(msg); // Acknowledge message processing
            } catch (error) {
                console.error('Failed to create booking:', error.message);
                channel.nack(msg); // Optionally nack if processing fails
            }
        }
    }); 

    console.log('Waiting for messages in booking_confirmation queue...');
};

module.exports = { startConsumer };
