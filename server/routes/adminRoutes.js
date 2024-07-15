import express from 'express';
const router = express.Router();
import User from '../models/User.js';
// import ValidateAdmin from '../middlewares/ValidateAdmin.js';
import validateAdmin from '../middlewares/validateAdmin.js';

// Example: Get all users (only admin can access)
router.get('/users', validateAdmin, async(req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.' });
    }
});

// Example: Delete a user by ID (only admin can access)
router.delete('/user/:id', validateAdmin, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.' });
    }
});

// Example: Promote a user to admin (only admin can access)
router.put('/user/:id/promote', validateAdmin, async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.isAdmin = true;
        await user.save();
        res.json({ message: 'User promoted to admin successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error promoting user.' });
    }
});

export default router;