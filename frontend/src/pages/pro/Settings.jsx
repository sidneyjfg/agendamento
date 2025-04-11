import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentUser } from '../../api/professionalService';
import { createCheckoutSession } from '../../api/stripeService';



function ProSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null); // dados brutos do /me
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notifications: {
      email: true,
      sms: false,
    }
  });
  const handleUpgradePlan = async () => {
    try {
      const url = await createCheckoutSession();
      console.log(url);
      window.location.href = url; // Redireciona para Stripe Checkout
    } catch (error) {
      alert('Erro ao iniciar o upgrade de plano');
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getCurrentUser();
        setInfo(userInfo);
        console.log(userInfo);
        setFormData({
          name: userInfo.name || '',
          email: userInfo.email || '',
          phone: userInfo.phone || '',
          notifications: {
            email: true,
            sms: false,
          }
        });

        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui você colocaria a chamada PUT/PATCH para atualizar o perfil
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar configurações.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("notifications.")) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  if (loading) {
    return <div className="p-6">Carregando configurações...</div>;
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Configurações da Conta</h2>

      {/* Informações do plano e status */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Informações da Conta</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Plano atual:</span> {info.plan?.name || 'Grátis'}
          </div>
          <div>
            <span className="font-medium">Status:</span> {info.status}
          </div>
          <div>
            <span className="font-medium">Criado em:</span> {new Date(info.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Última atualização:</span> {new Date(info.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Funcionalidades do Plano */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Funcionalidades do Plano</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <Feature label="Agendamentos máximos por dia" value={info.plan?.maxAppointments} />
          <Feature label="WhatsApp integrado" value={info.plan?.allowWhatsapp} />
          <Feature label="Link personalizado" value={info.plan?.allowCustomLink} />
          <Feature label="Logotipo personalizado" value={info.plan?.allowCustomLogo} />
          <Feature label="Suporte prioritário" value={info.plan?.supportPriority} />
        </div>
        {/* Melhoria de plano */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Precisa de mais recursos?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Atualize seu plano para liberar funcionalidades como mais agendamentos, suporte prioritário, link personalizado e muito mais!
          </p>
          <button
            onClick={handleUpgradePlan}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-md shadow transition"
          >
            Melhorar Plano
          </button>
        </div>

      </div>


      {/* Formulário de edição */}
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
              <div className="mt-4 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="notifications.email"
                    checked={formData.notifications.email}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notificações por Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="notifications.sms"
                    checked={formData.notifications.sms}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notificações por SMS</span>
                </label>
              </div>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}
const Feature = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <span className="font-medium">{label}:</span>
    {value ? (
      <span className="text-green-600 font-semibold">Ativo</span>
    ) : (
      <span className="text-gray-400">Inativo</span>
    )}
  </div>
);

export default ProSettings;