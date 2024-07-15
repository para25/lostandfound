import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';


const createAdmin = async() => {
    const db = 'mongodb://localhost:27017/lostandfound'; // Your database URL

    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

        const hashedPassword = await bcrypt.hash('adminPassword', 10);
        const admin = new User({
            nickname: 'admin',
            fullname: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true,
        });

        await admin.save();
        console.log('Admin user created.');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.connection.close();
    }
};

createAdmin();