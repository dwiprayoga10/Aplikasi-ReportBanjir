import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        // Jika tidak login, arahkan ke halaman login
        return <Navigate to="/login" />;
    }

    return children; // Jika login, tampilkan children (rute yang dilindungi)
};

export default ProtectedRoute;
