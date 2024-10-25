const { getAvailableSeats, reserveSeat, confirmReserve } = require('../services/seatService');

const seatController = {
    viewAvailableSeats: async (req, res) => {
        const { trainId } = req.params;
        try {
            const seats = await getAvailableSeats(trainId);
            res.json(seats);
        } catch (error) {
            console.error('Error fetching available seats:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    reserveSeat: async (req, res) => {
        const { seatNumber, trainId, coachNumber, userId } = req.body; // Assuming userId is sent in the body
        try {
            const result = await reserveSeat(seatNumber, trainId, coachNumber, userId);
            if (result.success) {
                return res.json(result);
            }
            res.status(409).json(result); // Conflict
        } catch (error) {
            console.error('Error reserving seat:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    confirmReserve: async (req, res) => {
        const { seatNumber, trainId, coachNumber, userId } = req.body; // Assuming userId is sent in the body
        try {
            const result = await confirmReserve(seatNumber, trainId, coachNumber, userId);
            if (result.success) {
                return res.json(result);
            }
            res.status(400).json(result); // Bad Request or Conflict
        } catch (error) {
            console.error('Error confirming seat reservation:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = seatController;
