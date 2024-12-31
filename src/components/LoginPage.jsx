import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS for this component

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setMessage('Login successful! Redirecting to dashboard...');
            setTimeout(() => navigate('/dashboard'), 2000);
        } else {
            setMessage('Invalid email or password.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputbox">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Email</label>
                    </div>
                    <div className="inputbox">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit">Login</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
