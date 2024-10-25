const Redis = require('ioredis');
const nodemailer = require('nodemailer');
const { getChannel } = require('../models/rabbitmqClient'); // Import RabbitMQ client
//axios
const axios = require('axios');
const { parse } = require('dotenv');
require('dotenv').config(); // Load environment variables from a .env file

// Create a Redis client
const redis = new Redis({ host: 'redis', port: 6379 }); // Adjust host/port if necessary

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Change to your email provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};

const generateAndSendOTP = async (email) => {
    const otp = generateOTP();
    console.log('Generated OTP:', otp);
    await redis.set(email, otp, 'EX', 300); // Store OTP in Redis with a 5-minute TTL
    await sendOTPEmail(email, otp);
    return otp; // Optionally return the OTP for confirmation
};
 
const verifyOTP = async (email, otp, seatNumber,trainId,coachNumber,userId) => {
    const storedOtp = await redis.get(email);
    console.log('storedOtp:', storedOtp);
    console.log('email:', email);   
    console.log('otp:', otp);

    if (parseInt(otp) === parseInt(storedOtp)) {
        await redis.del(email); // Delete the OTP after verification
        console.log('OTP verified successfully!'); 
        // Synchronously confirm the seat
        try {
            // process.env.SEAT_SERVICE_URL
            const url = `${process.env.SEAT_SERVICE_URL}/seats/confirm`;
            console.log('url:', url);
            const seatConfirmationResponse = await axios.post(`${process.env.SEAT_SERVICE_URL}/api/seats/confirm`, { seatNumber,trainId,coachNumber,userId });
            // console.log('Seat confirmation response:', seatConfirmationResponse);
        } catch (error) {
            console.error('Error confirming seat:', error);
            return false; // Return false if seat confirmation fails
        }
        
        // Asynchronously send data to RabbitMQ for payment confirmation
        const channel = await getChannel();
        const paymentData = {email, seatNumber,trainId,coachNumber,userId}; // Add more data as needed
        channel.sendToQueue('payment_confirmation', Buffer.from(JSON.stringify(paymentData)));

        // Asynchronously send info to RabbitMQ for ticket booking
        const ticketData = {seatNumber,trainId,coachNumber,userId}; // Add more data as needed
        channel.sendToQueue('ticket_book', Buffer.from(JSON.stringify(ticketData)));
        return true; // OTP verified successfully
    }
    return false; // OTP verification failed
};

module.exports = { generateAndSendOTP, verifyOTP };
