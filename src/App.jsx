import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import the LoginForm component
import Signup from './SignUpForm'; // Import your Signup component
import Dashboard from './dashboard';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Route for the login page */}
                    <Route path="/" element={<LoginForm />} />
                    
                    {/* Route for the dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Route for the admin page */}
                    
                    {/* Route for the signup page */}
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
