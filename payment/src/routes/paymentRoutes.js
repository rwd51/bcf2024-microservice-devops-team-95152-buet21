const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - amount
 *         - method
 *         - currency
 *         - userId
 *       properties:
 *         amount:
 *           type: number
 *           description: The amount of the payment
 *         method:
 *           type: string
 *           description: The payment method (e.g., credit card, PayPal)
 *         currency:
 *           type: string
 *           description: The currency of the payment (e.g., USD)
 *         userId:
 *           type: string
 *           description: The ID of the user making the payment
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment processed successfully
 *       400:
 *         description: Bad Request
 */
router.post('/payments', paymentController.processPayment);
module.exports = router;
