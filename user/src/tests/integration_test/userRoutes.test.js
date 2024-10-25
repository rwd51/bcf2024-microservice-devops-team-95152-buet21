const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/userRoutes');
const prisma = require('../../models/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/prismaClient');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

describe('User Routes', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should register a new user', async () => {
        const userData = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'password123',
            contact_details: '0987654321',
        };

        prisma.user.create.mockResolvedValueOnce({ 
            id: 1, // Mock the user ID
            ...userData, 
            password_hash: 'hashed_password' 
        });

        const response = await request(app).post('/api/register').send(userData);
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully.');
    });

    it('should login a user', async () => {
        const userData = {
            email: 'jane@example.com',
            password: 'password123',
        };

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        prisma.user.findUnique.mockResolvedValueOnce({
            id: 1,
            email: userData.email,
            password_hash: hashedPassword,
        });

        const response = await request(app).post('/api/login').send(userData);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should get user profile', async () => {
        const userId = 1;

        // Generate a valid token for the user
        const token = jwt.sign({ userId }, JWT_SECRET); 

        prisma.user.findUnique.mockResolvedValueOnce({
            id: userId,
            name: 'Jane Doe',
            email: 'jane@example.com',
            contact_details: '0987654321',
        });

        const response = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.email).toBe('jane@example.com'); // Optional: check additional fields
    });
});
