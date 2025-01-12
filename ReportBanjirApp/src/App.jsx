import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import AdminLayout from './Layout/AdminLayout';
import Dashboard from './Pages/admin/Dashboard';
import Report from './Pages/admin/Report'; // Import halaman Report
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Cek status login dari localStorage
        const user = localStorage.getItem('isLoggedIn');
        if (user === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Routes>
                {/* Rute untuk autentikasi */}
                <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
                <Route path="/register" element={<Register />} />

                {/* Rute untuk admin dengan layout */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <AdminLayout handleLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="reports" element={<Report />} /> {/* Tambahkan halaman Report */}
                </Route>

                {/* Redirect dari "/" ke "/admin/dashboard" */}
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

                {/* Halaman 404 untuk route yang tidak ditemukan */}
                <Route path="*" element={<div className="text-center mt-10">404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
