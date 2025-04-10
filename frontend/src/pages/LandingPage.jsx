import React from 'react';
import { Calendar, Clock, Users, Scissors, MessageSquare, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



function LandingPage() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redireciona para a página de login
    };

    const handleRegister = () => {
        navigate('/register'); // Redireciona para a página de registro
    };
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-purple-600 to-indigo-600">
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Scissors className="h-8 w-8 text-white" />
                            <span className="ml-2 text-2xl font-bold text-white">BeautyCut</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#features" className="text-white hover:text-gray-200">Recursos</a>
                            <a href="#pricing" className="text-white hover:text-gray-200">Preços</a>
                            <a href="#contact" className="text-white hover:text-gray-200">Contato</a>
                        </div>
                        <button onClick={handleLogin} className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                            Começar Agora
                        </button>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-24">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2">
                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                Simplifique seus agendamentos
                            </h1>
                            <p className="mt-6 text-xl text-gray-200">
                                Gerencie sua agenda, clientes e pagamentos em um só lugar. A solução completa para barbearias e salões.
                            </p>
                            <div className="mt-8 flex space-x-4">
                                <button onClick={handleRegister} className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 flex items-center">
                                    Teste Grátis <ChevronRight className="ml-2 h-5 w-5" />
                                </button>
                                <button onClick={handleRegister} className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                                    Ver Demo
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-12 md:mt-0">
                            <img
                                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
                                alt="Barbershop Interior"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
                        Tudo que você precisa para crescer seu negócio
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <Calendar className="h-12 w-12 text-purple-600 mb-6" />
                            <h3 className="text-xl font-semibold mb-4">Agendamento Online</h3>
                            <p className="text-gray-600">Seus clientes podem agendar 24/7 através do nosso sistema intuitivo.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <Users className="h-12 w-12 text-purple-600 mb-6" />
                            <h3 className="text-xl font-semibold mb-4">Gestão de Clientes</h3>
                            <p className="text-gray-600">Mantenha um histórico completo e fidelize seus clientes.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <MessageSquare className="h-12 w-12 text-purple-600 mb-6" />
                            <h3 className="text-xl font-semibold mb-4">Lembretes Automáticos</h3>
                            <p className="text-gray-600">Reduza faltas com lembretes por SMS e WhatsApp.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
                        O que nossos clientes dizem
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-xl shadow border">
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80"
                                    alt="Client"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-4">
                                    <h4 className="font-semibold">Carlos Silva</h4>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "Desde que começamos a usar o BeautyCut, nossa agenda está sempre cheia e organizada. Os clientes adoram a facilidade de marcar horários!"
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow border">
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                                    alt="Client"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-4">
                                    <h4 className="font-semibold">Ana Paula</h4>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "O sistema de lembretes automáticos reduziu nossas faltas em mais de 60%. Melhor investimento que fizemos para o salão!"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-purple-600 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        Comece a transformar seu negócio hoje
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                        14 dias de teste grátis. Sem compromisso.
                    </p>
                    <button onClick={handleRegister} className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                        Começar Agora
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center">
                                <Scissors className="h-6 w-6" />
                                <span className="ml-2 text-xl font-bold">BeautyCut</span>
                            </div>
                            <p className="mt-4 text-gray-400">
                                Transformando a gestão de salões e barbearias.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Produto</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Recursos</a></li>
                                <li><a href="#" className="hover:text-white">Preços</a></li>
                                <li><a href="#" className="hover:text-white">Demo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Empresa</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Sobre</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Contato</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                                <li><a href="#" className="hover:text-white">Termos</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>© 2025 BeautyCut. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;