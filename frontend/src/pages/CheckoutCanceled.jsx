// frontend/src/pages/CheckoutCanceled.jsx
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CheckoutCanceled() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 p-6">
      <XCircle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Pagamento cancelado</h1>
      <p className="text-gray-700 text-center max-w-md mb-6">
        Seu pagamento não foi concluído. Você pode tentar novamente quando estiver pronto.
      </p>
      <button
        onClick={() => navigate('/pro/dashboard')}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        Ver Planos
      </button>
    </div>
  );
}

export default CheckoutCanceled;
