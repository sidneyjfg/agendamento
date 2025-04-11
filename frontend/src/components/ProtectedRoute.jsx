// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null; // ou um spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role?.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/" />;
  }
  

  return children;
};

export default ProtectedRoute;
