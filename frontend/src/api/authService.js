// frontend/src/api/authService.js
import api from './api'; // Certifique-se de que o arquivo api.js está configurado corretamente
// Função para fazer login
export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data; // Retorna os dados do usuário e o token
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Erro ao fazer login'); // Lança um erro com a mensagem apropriada
  }
};
// Função para registrar um novo usuário
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response; // Retorna os dados do usuário
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Erro ao registrar usuário'); // Lança um erro com a mensagem apropriada
  }
};