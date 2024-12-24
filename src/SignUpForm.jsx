// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SignupForm.css';

const SignupForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        role: '',
       
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), 
            });

            if (response.ok) {
                setSuccessMessage('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                const message = await response.text();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setErrorMessage('Failed to sign up. Please try again.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/');
    };

    return (
        <div className="signup-container-wrapper">
            <div className="signup-container">
                <h2>Create a new Account</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>} 

                <form onSubmit={handleSignup}>
                    <label>
                        Gender:
                        <select name="Role" value={userData.gender} onChange={handleChange} required>
                            <option value="">Select Role</option>
                            <option value="User">User</option>
                            <option value="Guest">Guest</option>
                            <option value="admin">admin</option>
                        </select>
                    </label>
                    
                    <label>
                        username:
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                    <button type="button" onClick={handleLoginRedirect} className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
