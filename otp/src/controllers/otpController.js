const { generateAndSendOTP, verifyOTP } = require('../services/otpService');

const otpController = {
    generateOTP: async (req, res) => {
        const { email } = req.body; // Assuming email is sent in the body
        try {
            await generateAndSendOTP(email);
            res.status(200).json({ message: 'OTP sent to your email.' }); // Success
        } catch (error) {
            console.error('Error generating OTP:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    verifyOTP: async (req, res) => {
        const { email, otp , seatNumber, trainId, coachNumber, userId} = req.body; // Assuming email and OTP are sent in the body
        try {
            const isValid = await verifyOTP(email, otp, seatNumber, trainId, coachNumber, userId);
            if (isValid) {
                res.status(200).json({ message: 'OTP verified successfully.' });
            } else {
                res.status(400).json({ message: 'Invalid OTP.' }); // Bad Request
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = otpController;
