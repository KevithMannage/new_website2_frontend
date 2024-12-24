import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState(''); // Changed from email to username
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Corrected spelling
    const [loginRole, setLoginRole] = useState(null); // Start with no role selected

    const navigate = useNavigate();  // Initialize navigate using useNavigate()

    const handleRoleSelection = (role) => {
        setLoginRole(role); // Set role as 'user' or 'admin'
        setErrorMessage('');
        setSuccessMessage(''); // Clear any previous messages
    };

    // Handle user login
    const handleUserLogin = async () => {
        const loginEndpoint = 'http://localhost:3000/auth/login';

        try {
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Using username
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken); 
                setSuccessMessage('Successfully logged in as user.');

                // Navigate to the dashboard or another page after login
                navigate('/dashboard'); // Uncomment if you have a /dashboard route
            } else {
                const message = await response.text();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error('Error logging in as user:', error);
            setErrorMessage('Failed to log in as user. Please try again.');
        }
    };

    // Handle admin login
    const handleAdminLogin = async () => {
        const loginEndpoint = 'http://localhost:3000/auth/login';

        try {
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Using username
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log(data.accessToken);

                if (data.accessToken && data.refreshToken) {
                    setSuccessMessage('Successfully logged in as admin.');
                localStorage.setItem('accessToken', data.accessToken);  // Corrected this line
                    // Navigate to the admin page after successful login
                    // Uncomment if you have an /adminpage route
                } else {
                    throw new Error('Token or user data is missing from the response');
                }
            } else {
                const message = await response.text();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error('Error logging in as admin:', error);
            setErrorMessage('Failed to log in as admin. Please try again.');
        }
    };

    // Handle form submit
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginRole === 'admin') {
            handleAdminLogin();
        } else {
            handleUserLogin();
        }
    };

    // Handle redirect to signup page
    const handleSignup = () => {
        // Navigate to the signup page
        navigate('/signup');  // Navigate to the signup page
    };

    return (
        <div className="logo">
            <div className="login-container">
                <h2>Login</h2>
                {!loginRole ? (
                    <div className="role-selection">
                        <p>Please select your role:</p>
                        <button onClick={() => handleRoleSelection('user')}>User</button>
                        <button onClick={() => handleRoleSelection('admin')}>Admin</button>
                    </div>
                ) : (
                    <>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                        <form onSubmit={handleLogin}>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} // Bind username state
                                    placeholder="Enter your username"
                                    required
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Bind password state
                                    placeholder="Enter your password"
                                    required
                                />
                            </label>
                            <button type="submit">Login as {loginRole === 'admin' ? 'Admin' : 'user'}</button>
                        </form>
                        {loginRole !== 'admin' && (
                            <button onClick={handleSignup} className="signup-button">Sign Up</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
