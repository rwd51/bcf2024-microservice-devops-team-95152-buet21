const { getTrainsService } = require('../services/getTrainsService');

const getTrainsController = async (req, res) => {
    try {
        const trains = await getTrainsService();
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTrainsController };