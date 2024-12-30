import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const section = document.querySelector('section');
        section.style.opacity = 0;

        setTimeout(() => {
            section.style.transition = 'opacity 1s ease-in-out';
            section.style.opacity = 1;
        }, 500);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message); // Show success message
                localStorage.setItem('accessToken', result.accessToken); // Store token
                setFormData({ username: '', email: '', password: '' }); // Reset form
                navigate('/login'); // Redirect to login page
            } else {
                setMessage(result.message); // Show error message
            }
        } catch (err) {
            setMessage('Error: Unable to connect to the server.');
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <div className="inputbox">
                    <ion-icon name="person-outline"></ion-icon>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="inputbox">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit">Submit</button>
                {message && <p>{message}</p>}
                <div className="register">
                    <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
            </form>
        </section>
    );
};

export default SignupPage;
