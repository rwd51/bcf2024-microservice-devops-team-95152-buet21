const { processPayment } = require('../services/paymentService');

const paymentController = {
    processPayment: async (req, res) => {
        const paymentDetails = req.body; // Assuming payment details are sent in the request body
        try {
            const result = await processPayment(paymentDetails);
            res.status(201).json(result); // Created
        } catch (error) {
            console.error('Error processing payment:', error);
            res.status(400).json({ message: error.message }); // Bad Request
        }
    },
};

module.exports = paymentController;
