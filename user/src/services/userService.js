const prisma = require('../models/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const registerUser = async (userData) => {
    const { name, email, password, contact_details } = userData;
    //
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return null;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password_hash: hashedPassword, // Use password_hash as per your schema
            contact_details,
        },
    });

    return newUser;
};

const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid password.');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

const getUserProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, contact_details: true }, // Select necessary fields
    });
    return user;
};

module.exports = { registerUser, loginUser, getUserProfile };
