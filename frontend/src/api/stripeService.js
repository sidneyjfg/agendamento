// frontend/src/api/stripeService.js
import api from './api'; // Axios configurado com baseURL + interceptors

export const createCheckoutSession = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/stripe/checkout/session', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response);
    return response.data.url;
  } catch (error) {
    console.error('Erro ao criar sessão do checkout:', error);
    throw error;
  }
};
