// controllers/getBookingsByIDController.js

const { getBookingById } = require('../services/getBookingsById');  

const getBookingsByID = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await getBookingById(Number(bookingId)); // Ensure bookingId is a number
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getBookingsByID };
