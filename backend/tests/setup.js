// tests/setup.js
require('dotenv').config({ path: '.env.test' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error; // Lança o erro para interromper os testes
  }
};

//Função para limpar o banco de dados antes de cada teste
const clearDatabase = async () => {
  // Excluindo os registros dependentes primeiro
  try {
    await prisma.appointment.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.availability.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.notification.deleteMany({});
    await prisma.supportTicket.deleteMany({});
    await prisma.subscription.deleteMany({});
    // Agora pode excluir os usuários
    await prisma.user.deleteMany({});
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
    throw error;
  }
};


// Função para configurar o ambiente de testes
const setup = async () => {
  await testConnection(); // Testa a conexão antes de limpar o banco de dados
  await clearDatabase();
};

// Função para fechar a conexão com o banco de dados após os testes
const teardown = async () => {
  await prisma.$disconnect();
};

module.exports = { setup, teardown };