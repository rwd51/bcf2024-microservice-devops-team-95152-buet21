// app.js or routes.js

const express = require('express');
const { getBookingsByID } = require('../controllers/bookingController');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         bookingId:
 *           type: integer
 *           description: The unique booking ID
 *         userId:
 *           type: string
 *           description: The ID of the user who made the booking
 *         trainId:
 *           type: string
 *           description: The ID of the train
 *         seatNumber:
 *           type: string
 *           description: The seat number for the booking
 *         status:
 *           type: string
 *           description: The booking status (e.g., confirmed, pending)
 */

/**
 * @swagger
 * /api/bookings/{bookingId}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the booking
 *     responses:
 *       200:
 *         description: A booking object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.get('/bookings/:bookingId', getBookingsByID);
module.exports = router;
