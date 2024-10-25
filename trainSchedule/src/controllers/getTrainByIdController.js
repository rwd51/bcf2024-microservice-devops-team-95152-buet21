const { getTrainByIdService } = require('../services/getTrainByIdService'); // Adjust the path as necessary

const getTrainByIdController = async (req, res) => {
    try {
        const train = await getTrainByIdService(req);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train);
    } catch (error) {
        console.error('Error fetching train by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getTrainByIdController };
