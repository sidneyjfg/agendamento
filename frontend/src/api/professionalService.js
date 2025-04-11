import api from './api'; // Certifique-se de que o arquivo api.js está configurado corretamente

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/professional/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário autenticado:', error);
        throw error;
    }
};