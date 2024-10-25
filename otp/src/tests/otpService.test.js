const Redis = require('ioredis');
const nodemailer = require('nodemailer');
const { generateAndSendOTP } = require('../services/otpService'); // Adjust path to otpService
// Mock Redis and Nodemailer
jest.mock('ioredis');
jest.mock('nodemailer');


describe('generateAndSendOTP', () => {
    let redisSetMock;
    let sendMailMock;

    beforeEach(() => {
        // Mock Redis set method
        redisSetMock = jest.fn().mockResolvedValue('OK');
        Redis.mockImplementation(() => ({
            set: redisSetMock, // mock the set method
        }));

        // Mock Nodemailer createTransport and sendMail methods
        sendMailMock = jest.fn().mockResolvedValue(true);
        nodemailer.createTransport.mockReturnValue({
            sendMail: sendMailMock, // mock sendMail
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
    });

    test('should generate and send OTP email', async () => {
        const email = 'test@example.com';

        // Call the function
        const otp = await generateAndSendOTP(email);
        console.log('otp:', otp);
        // Check if OTP is 6 digits long
        expect(otp).toHaveLength(6);
        // Check if sendMail was called with the correct mail options
        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
        });
    });
});
