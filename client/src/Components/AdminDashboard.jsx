import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all users (admin only)
        axios.get('/api/admin/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            setError('Error fetching users');
        });
    }, []);

    const handleDelete = (userId) => {
        axios.delete(`/api/admin/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUsers(users.filter(user => user._id !== userId));
        })
        .catch(error => {
            setError('Error deleting user');
        });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p>{error}</p>}
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.nickname} - {user.email}
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;