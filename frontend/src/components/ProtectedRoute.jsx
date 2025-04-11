// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Certifique-se de que o caminho está correto

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth(); // Obtendo o usuário e o estado de autenticação
  console.log(`isAuthenticated ${isAuthenticated}`);
  console.log("", user);
  // Verifica se o usuário está autenticado e se a role corresponde
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {//
    return <Navigate to="/" />; // Redireciona para a landing page se a role não corresponder
  }

  return children; // Retorna os filhos se a autenticação e a role estiverem corretas
};

export default ProtectedRoute;