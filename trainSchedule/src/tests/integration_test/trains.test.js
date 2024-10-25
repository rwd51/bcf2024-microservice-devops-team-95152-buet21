// src/tests/integration/trains.test.js
const request = require('supertest');
const express = require('express');
const trainRoutes = require('../../routes/trainSchedule'); // Adjust the path as necessary

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(trainRoutes); // Use the routes

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
}   
);

describe('Train Routes', () => {
    it('should get all trains', async () => {
        const response = await request(app).get('/trains');
        expect(response.statusCode).toBe(200);
        // Further assertions based on the expected response
    });

    it('should get a train by ID', async () => {
        const trainId = 1; // Replace with an actual train ID that exists in your database
        const response = await request(app).get(`/trains/${trainId}`);
        expect(response.statusCode).toBe(200);
        // Further assertions based on the expected response
    });

    // Additional tests can be added here
});
