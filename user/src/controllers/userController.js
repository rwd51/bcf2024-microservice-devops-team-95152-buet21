const { registerUser, loginUser, getUserProfile } = require('../services/userService');

const userController = {
    register: async (req, res) => {
        try {
            const newUser = await registerUser(req.body);
            if (!newUser) {
                return res.status(400).json({ message: 'User already exists.' });
            }
            res.status(201).json({ message: 'User registered successfully.', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { user, token } = await loginUser(email, password);
            res.json({ user: { id: user.id, name: user.name, email: user.email, contact_details: user.contact_details }, token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(400).json({ message: error.message }); // Bad Request
        }
    },

    getProfile: async (req, res) => {
        const userId = req.userId; // Retrieved from middleware
        try {
            const userProfile = await getUserProfile(userId);
            res.json(userProfile);
        } catch (error) {
            console.error('Error retrieving user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = userController;
