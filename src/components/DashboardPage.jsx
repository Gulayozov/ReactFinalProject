import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import EvasiveButton from './EvasiveButton'; // Import the EvasiveButton component
import './DashboardPage.css'; // Assuming you have a CSS file for your dashboard styles

const Dashboard = () => {
    const navigate = useNavigate();  // Initialize useNavigate hook for navigation

    const handleLogout = () => {
        // Clear any authentication data (e.g., localStorage, cookies)
        localStorage.removeItem('authToken');  // Example: Clear the auth token
        // You can also clear session storage, cookies, or reset global state here

        // Redirect user to the login page after logout
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome to Your Dashboard</h1>
            </header>

            <main className="dashboard-main-content">
                <section className="evasive-button-section">
                    <h2>Try to Catch Me!</h2>
                    {/* Evasive Button Component */}
                    <EvasiveButton />
                </section>

                {/* Other sections/components in the dashboard */}
                <section className="stats-section">
                    <h2>Your Stats</h2>
                    {/* Add other components or stats here */}
                </section>

                <section className="notifications-section">
                    <h2>Notifications</h2>
                    {/* Add notification content here */}
                </section>
            </main>

            <footer className="dashboard-footer">
                <p>Dashboard Footer</p>
            </footer>

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
