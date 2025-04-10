// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { login, register } from '../api/authService'; // Importando o serviço de autenticação

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token); // Armazena o token no localStorage
    } catch (error) {
      console.error(error);
      // Trate o erro conforme necessário
    }
  };

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token); // Armazena o token no localStorage
    } catch (error) {
      console.error(error);
      // Trate o erro conforme necessário
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};