// frontend/src/pages/ProDashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const ProLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar isAdmin={false} />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard do Profissional</h1>
        {/* Conteúdo do dashboard aqui */}
        <Outlet /> {/* Aqui é onde as rotas filhas como /pro/services aparecem */}
      </main>
    </div>
  );
};

export default ProLayout;
