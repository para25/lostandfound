import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const validateAdmin = async(req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'Ayush');
        const user = await User.findById(decoded.id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Requires admin role.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate token.' });
    }
};

export default validateAdmin;