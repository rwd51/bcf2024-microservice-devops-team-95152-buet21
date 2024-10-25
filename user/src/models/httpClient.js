const axios = require('axios');

// Set up an instance of axios with default settings
const httpClient = axios.create({
    baseURL: process.env.API_BASE_URL, // Set your API base URL in .env
    timeout: 5000, // Set a timeout for requests
});

// Optional: Add interceptors for logging or error handling
httpClient.interceptors.response.use(
    response => response,
    error => {
        console.error("HTTP Error:", error);
        return Promise.reject(error);
    }
);

module.exports = httpClient;
