import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import the CSS for this component

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some((user) => user.email === formData.email);

        if (userExists) {
            setMessage('User already exists. Please log in.');
        } else {
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputbox">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Username</label>
                    </div>
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
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p>
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
