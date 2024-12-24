import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ username: '', role: '' });

    // Fetch user details from token
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken); // Decode the JWT
                setUserInfo({
                    username: decodedToken.username,
                    role: decodedToken.role,
                });
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/'); // Redirect to login if token is invalid
            }
        } else {
            navigate('/'); // Redirect to login if no token found
        }
    }, [navigate]);

    // Logout function to clear local storage and navigate back to login
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome to the Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>

            <main className="dashboard-content">
                <section className="welcome-section">
                    <h2>Hello, {userInfo.username}!</h2>
                    <p>Your role is: {userInfo.role}</p>
                </section>

                <section className="features-section">
                    <h3>Dashboard Features</h3>
                    <ul>
                        <li>View your profile</li>
                        <li>Track recent activity</li>
                        <li>Access reports and analytics</li>
                    </ul>
                </section>

                <section className="recent-activity-section">
                    <h3>Recent Activity</h3>
                    <ul>
                        <li>Logged in at: {new Date().toLocaleString()}</li>
                        <li>Checked notifications</li>
                        <li>Updated profile settings</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
