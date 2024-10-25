const express = require('express');
const seatController = require('../controllers/seatController');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Seat:
 *       type: object
 *       properties:
 *         seatNumber:
 *           type: string
 *           description: The seat number
 *         coachNumber:
 *           type: string
 *           description: The coach number
 *         trainId:
 *           type: string
 *           description: The train ID
 *         status:
 *           type: string
 *           description: The availability status of the seat
 */

/**
 * @swagger
 * /api/seats/{trainId}:
 *   get:
 *     summary: View available seats for a specific train
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: trainId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the train
 *     responses:
 *       200:
 *         description: A list of available seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 *       500:
 *         description: Internal server error
 */
router.get('/seats/:trainId', seatController.viewAvailableSeats);

/**
 * @swagger
 * /api/seats/reserve:
 *   post:
 *     summary: Reserve a seat temporarily
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: string
 *               trainId:
 *                 type: string
 *               coachNumber:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seat reserved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       409:
 *         description: Seat already reserved
 *       500:
 *         description: Internal server error
 */
router.post('/seats/reserve', seatController.reserveSeat);

/**
 * @swagger
 * /api/seats/confirm:
 *   post:
 *     summary: Confirm seat reservation
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: string
 *               trainId:
 *                 type: string
 *               coachNumber:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seat reservation confirmed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/seats/confirm', seatController.confirmReserve);
module.exports = router;

