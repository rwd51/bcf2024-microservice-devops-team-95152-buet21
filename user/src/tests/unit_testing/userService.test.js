// src/tests/unit_testing/userService.test.js
const { registerUser, loginUser, getUserProfile } = require('../../services/userService');
const prisma = require('../../models/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock the Prisma client, bcrypt, and jsonwebtoken
jest.mock('../../models/prismaClient');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('registerUser', () => {
        it('should successfully register a user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                contact_details: '1234567890'
            };

            // Mock the bcrypt hash function
            bcrypt.hash.mockResolvedValue('hashedPassword');

            // Mock the Prisma user creation
            prisma.user.create.mockResolvedValue({
                id: 1,
                ...userData,
                password_hash: 'hashedPassword',
            });

            // Call the registerUser function
            const result = await registerUser(userData);

            // Assertions
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password_hash: 'hashedPassword',
                    contact_details: userData.contact_details,
                },
            });
            expect(result).toEqual({ id: 1, ...userData, password_hash: 'hashedPassword' });
        });
    });

    describe('loginUser', () => {
        it('should login a user and return a token', async () => {
            const email = 'john@example.com';
            const password = 'password123';
            const user = {
                id: 1,
                email,
                password_hash: 'hashedPassword',
            };

            // Mock user lookup and password comparison
            prisma.user.findUnique.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('token');

            // Call the loginUser function
            const result = await loginUser(email, password);

            // Assertions
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password_hash);
            expect(jwt.sign).toHaveBeenCalledWith({ userId: user.id }, expect.any(String), { expiresIn: '1h' });
            expect(result).toEqual({ user, token: 'token' });
        });

        it('should throw an error if the user is not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null); // Simulate user not found

            await expect(loginUser('unknown@example.com', 'password123')).rejects.toThrow('User not found.');
        });

        it('should throw an error if the password is invalid', async () => {
            const user = {
                id: 1,
                email: 'john@example.com',
                password_hash: 'hashedPassword',
            };

            prisma.user.findUnique.mockResolvedValue(user); // Mock found user
            bcrypt.compare.mockResolvedValue(false); // Simulate invalid password

            await expect(loginUser(user.email, 'wrongPassword')).rejects.toThrow('Invalid password.');
        });
    });

    describe('getUserProfile', () => {
        it('should return user profile', async () => {
            const userId = 1;
            const userProfile = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                contact_details: '1234567890',
            };

            prisma.user.findUnique.mockResolvedValue(userProfile); // Mock user profile lookup

            const result = await getUserProfile(userId);

            // Assertions
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: userId },
                select: { id: true, name: true, email: true, contact_details: true },
            });
            expect(result).toEqual(userProfile);
        });
    });
});
