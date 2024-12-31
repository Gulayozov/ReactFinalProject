import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<SignupPage />} />
            </Routes>
        </Router>
    );
};

export default App;
