// tests/integration/authRoutes.test.js
const request = require('supertest');
const app = require('../../src/server'); // Certifique-se de que o app está exportado corretamente
const { setup, teardown } = require('../setup'); // Importando as funções de setup e teardown

beforeAll(async () => {
  await setup(); // Configura o ambiente de testes, limpa o banco e popula com plano de teste
});

afterAll(async () => {
  await teardown(); // Limpa após os testes
});

describe('Auth Routes', () => {
  it('Registra um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'PROFESSIONAL',
        slugPublicId: 'test-user',
        planId: '85ac1000-5512-4a7f-bde4-d4092a0b5ce2',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Verifica se o ID do usuário foi retornado
    expect(response.body.name).toBe('Test User'); // Verifica se o nome está correto
    expect(response.body.email).toBe('test@example.com'); // Verifica se o email está correto
  });

  it('Retorna erro se campos obrigatórios estão faltando', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'PROFESSIONAL',
        slugPublicId: 'test-user',
        planId: '85ac1000-5512-4a7f-bde4-d4092a0b5ce2',
      });

    expect(response.status).toBe(400); // Verifica se o status é 400
    expect(response.body.message).toBe('Nome, email, senha e telefone são obrigatórios.'); // Verifica a mensagem de erro
  });

  it('Faz login de um usuário existente', async () => {
        // Agora, faça o login com as credenciais
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
      
    expect(loginResponse.status).toBe(200); // Espera um retorno 200 (OK)
    expect(loginResponse.body).toHaveProperty('token'); // Verifica se o token foi retornado
    expect(typeof loginResponse.body.token).toBe('string'); // Verifica se o token é uma string
  });
});
