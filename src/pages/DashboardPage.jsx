import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
        } else {
            const fetchUserProfile = async (token) => {
                try {
                    const response = await fetch('http://localhost:8000/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data); // Set user profile data
                    } else {
                        setUser(null);
                        localStorage.removeItem('accessToken'); // Clear token if invalid
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setUser(null);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
            };

            fetchUserProfile(token);
        }
    }, [navigate]); // Only depend on navigate

    return (
        <section>
            {user ? (
                <div>
                    <h1>Welcome, {user.username}!</h1>
                    <p>Email: {user.email}</p>
                    <button onClick={() => {
                        localStorage.removeItem('accessToken');
                        navigate('/login');
                    }}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default DashboardPage;
