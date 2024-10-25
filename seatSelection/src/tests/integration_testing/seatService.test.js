// src/tests/integration/seats.test.js
const request = require('supertest');
const express = require('express');
const seatRoutes = require('../../routes/seatRoutes'); // Adjust the path as necessary
const { getAvailableSeats, reserveSeat } = require('../../services/seatService');

const app = express();
app.use(express.json());
app.use(seatRoutes);

describe('Seat Routes', () => {
    // Setup a test database state before running the tests
    beforeAll(async () => {
        // Optional: Initialize test database or reset data here
    });

    afterAll(async () => {
        // Optional: Clean up database connections or data here
    });

    describe('GET /seats/:trainId', () => {
        it('should return available seats for a given train', async () => {
            const trainId = 1; // Use a valid train ID from your test database
            const response = await request(app).get(`/seats/${trainId}`);

            expect(response.statusCode).toBe(200);
            // Validate the response body based on your actual database content
            expect(Array.isArray(response.body)).toBe(true); // Check if it returns an array
            // Further checks can be added based on expected seat data
        });

        it('should return a 500 status code on error', async () => {
            const trainId = -1; // Use an invalid train ID to force an error
            const response = await request(app).get(`/seats/${trainId}`);

            expect(response.statusCode).toBe(200);
            // empty array should be returned if trainId is invalid
            expect(response.body).toEqual([]);
        });
    });
});
