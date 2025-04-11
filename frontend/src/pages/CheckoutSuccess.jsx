import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('confirmando');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    const confirmSession = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/stripe/session/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus('sucesso');
      } catch (error) {
        console.error('Erro ao confirmar pagamento:', error);
        setStatus('erro');
      }
    };

    confirmSession();
  }, []);

  if (status === 'confirmando') return <div className="p-6">Confirmando pagamento...</div>;
  if (status === 'erro') return <div className="p-6 text-red-600">Erro ao confirmar o pagamento.</div>;

  return (
    <div className="p-6 text-green-600 text-center">
      <h1 className="text-2xl font-bold mb-2">Pagamento confirmado!</h1>
      <p className="mb-4">Seu plano foi atualizado com sucesso.</p>
      <button onClick={() => navigate('/pro/dashboard')} className="bg-green-600 text-white px-4 py-2 rounded">
        Ir para o Dashboard
      </button>
    </div>
  );
}

export default CheckoutSuccess;
