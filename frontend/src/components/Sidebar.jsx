// frontend/src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, LayoutDashboard, Users, MessageSquare, BarChart2, Settings, CalendarCheck, LogOut, ScissorsSquare, ClipboardList } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isAdmin }) => {
  const { logout } = useAuth(); // Função de logout do contexto de autenticação

  const handleLogout = () => {
    const response = logout(); // Chama a função de logout
    if (response === true) Navigate('/login')

  };

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col justify-between">
      {/* Topo */}
      <div>
        <div className="flex items-center justify-center h-16 border-b">
          <Scissors className="h-8 w-8 text-purple-600" />
          <span className="ml-2 text-xl font-semibold text-gray-800">BeautyCut</span>
        </div>

        {/* Navegação */}
        <nav className="mt-4 px-3 space-y-2">
          <SidebarItem to={isAdmin ? "/admin/dashboard" : "/pro/dashboard"} icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarItem to={isAdmin ? "/admin/users" : "/pro/services"} icon={isAdmin ? <Users size={18} /> : <ScissorsSquare size={18} />} label={isAdmin ? "Usuários" : "Serviços"} />
          <SidebarItem to={isAdmin ? "/admin/messages" : "/pro/appointments"} icon={isAdmin ? <MessageSquare size={18} /> : <ClipboardList size={18} />} label={isAdmin ? "Mensagens" : "Agendamentos"} />
          <SidebarItem to={isAdmin ? "/admin/statistics" : "/pro/settings"} icon={isAdmin ? <BarChart2 size={18} /> : <Settings size={18} />} label={isAdmin ? "Estatísticas" : "Configurações"} />
        </nav>
      </div>

      {/* Botão de Sair */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start gap-2 text-red-600 hover:bg-gray-100 px-3 py-2 rounded-md transition"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-lg transition-all"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default Sidebar;