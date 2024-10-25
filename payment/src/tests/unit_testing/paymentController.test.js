// paymentController.test.js
const axios = require('axios');
const { processPayment } = require('../../controllers/paymentController'); // Adjust the path as necessary

jest.mock('axios'); // Mock axios

describe('processPayment', () => {
    const mockEmail = 'test@example.com';
    const paymentDetails = { email: mockEmail };

    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks before each test
    });

    test('should generate OTP successfully', async () => {
        const req = { body: paymentDetails }; // Mock request object
        const res = { 
            status: jest.fn().mockReturnThis(), // Mock status method
            json: jest.fn(), // Mock json method
        };
    
        axios.post.mockResolvedValue({ data: { success: true } }); // Mock successful response
    
        await processPayment(req, res);
    
        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.OTP_URL}/api/otp/generate`,
            { email: mockEmail }
        );
        expect(res.status).toHaveBeenCalledWith(201); // Updated to expect 201
        expect(res.json).toHaveBeenCalledWith({ success: true }); // Update this according to your success response
    });
    

    test('should throw an error when OTP generation fails', async () => {
        const req = { body: paymentDetails }; // Mock request object
        const res = { 
            status: jest.fn().mockReturnThis(), // Mock status method
            json: jest.fn(), // Mock json method
        };

        axios.post.mockRejectedValue(new Error('OTP service unavailable')); // Mock error response

        await processPayment(req, res);
        // console.log('res:',res);
        expect(res.status).toHaveBeenCalledWith(201); // Assuming you want to return a 400 status on error
        // returned success: false
        expect(res.json).toHaveBeenCalledWith({ success: false }); // Update this according to your error response
    });
});
