import React, { useState } from 'react';
import { Scissors, Mail, Lock, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProLogin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { isAdmin, email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Logo and Welcome Section */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Scissors className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">BeautyCut</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-600">Entre com sua conta para continuar</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              !isAdmin
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setIsAdmin(false)}
          >
            <div className="flex items-center justify-center">
              <User className="h-4 w-4 mr-2" />
              Cliente
            </div>
          </button>
          <button
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              isAdmin
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setIsAdmin(true)}
          >
            <div className="flex items-center justify-center">
              <Building className="h-4 w-4 mr-2" />
              Administrador
            </div>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder={isAdmin ? "admin@beautycut.com" : "seu@email.com"}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium transition duration-200"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        {!isAdmin && (
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="/register" className="font-medium text-purple-600 hover:text-purple-500">
                Cadastre-se
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProLogin;