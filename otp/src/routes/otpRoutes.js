const express = require('express');
const otpController = require('../controllers/otpController');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email to send the OTP to
 *         otp:
 *           type: string
 *           description: The OTP code
 *         seatNumber:
 *           type: string
 *           description: The seat number for reservation
 *         trainId:
 *           type: string
 *           description: The train ID
 *         coachNumber:
 *           type: string
 *           description: The coach number
 *         userId:
 *           type: string
 *           description: The user ID
 */

/**
 * @swagger
 * /api/otp/generate:
 *   post:
 *     summary: Generate and send OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email to send OTP
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       500:
 *         description: Internal server error
 */
router.post('/otp/generate', otpController.generateOTP);

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email associated with the OTP
 *               otp:
 *                 type: string
 *                 description: The OTP code
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
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal server error
 */
router.post('/otp/verify', otpController.verifyOTP);
module.exports = router;
