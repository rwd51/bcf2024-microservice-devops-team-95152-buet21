const axios = require('axios');

// Set up an instance of axios with default settings
const httpClient = axios.create({
    baseURL: process.env.SEAT_SERVICE_URL, // Set your API base URL in .env
    timeout: 5000, // Set a timeout for requests
});

const confirmSeat = async (seatId) => {
    // Assuming the endpoint is POST /seat/confirm
    const response = await seatServiceApi.post('/seat/confirm', { seatId });
    return response.data;
};

module.exports = { confirmSeat };
