// tests/integration/professionalRoutes.test.js
const request = require('supertest');
const app = require('../../src/server');
const { setup, teardown } = require('../setup');

let professionalToken;
let adminToken;
let professionalId;
let adminId;
let serviceId;
let availabilityId;

beforeAll(async () => {
  await setup();

  // Registrar um profissional de teste com role 'PROFESSIONAL'
  const professionalResponse = await request(app)
    .post('/auth/register')
    .send({
      name: 'Test Professional',
      email: 'test-professional@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'PROFESSIONAL',
      slugPublicId: 'test-professional',
      planId: 'f7323647-cd2a-4a8d-a27e-02a755fd39ff',
    });
  professionalId = professionalResponse.body.id;

  // Login do profissional
  const loginResponse = await request(app)
    .post('/auth/login')
    .send({
      email: 'test-professional@example.com',
      password: 'password123',
    });
  professionalToken = loginResponse.body.token;

  // Registrar um profissional de teste com role 'ADMIN'
  const adminResponse = await request(app)
    .post('/auth/register')
    .send({
      name: 'Test Admin',
      email: 'test-admin@example.com',
      password: 'password123',
      phone: '9876543210',
      role: 'ADMIN',
      slugPublicId: 'test-admin',
      planId: 'f7323647-cd2a-4a8d-a27e-02a755fd39ff',
    });
  adminId = adminResponse.body.id;

  // Login do admin
  const adminLoginResponse = await request(app)
    .post('/auth/login')
    .send({
      email: 'test-admin@example.com',
      password: 'password123',
    });
  adminToken = adminLoginResponse.body.token;
});

afterAll(async () => {
  await teardown();
});

describe('Professional Routes', () => {
  it('Deve retornar as informações do profissional autenticado', async () => {
    const response = await request(app)
      .get('/professional/me')
      .set('Authorization', `Bearer ${professionalToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.role).toBe('PROFESSIONAL');
  });

  it('Deve permitir atualizar configurações do profissional', async () => {
    const updatedData = { phone: '1122334455' };
    const response = await request(app)
      .put('/professional/settings')
      .set('Authorization', `Bearer ${professionalToken}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.phone).toBe(updatedData.phone);
  });

  it('Deve criar um serviço para o profissional', async () => {
    const serviceData = {
      name: 'Corte de cabelo',
      description: 'Serviço de corte',
      price: 50.0,
      duration: 30,
      category: 'Corte',
    };

    const response = await request(app)
      .post('/professional/services')
      .set('Authorization', `Bearer ${professionalToken}`)
      .send(serviceData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    serviceId = response.body.id; // Armazena o id do serviço criado
  });

  it('Deve atualizar um serviço do profissional', async () => {
    const updatedServiceData = { price: 60.0 };

    const response = await request(app)
      .put(`/professional/services/${serviceId}`)
      .set('Authorization', `Bearer ${professionalToken}`)
      .send(updatedServiceData);

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(updatedServiceData.price);
  });

  it('Deve deletar um serviço do profissional', async () => {
    const response = await request(app)
      .delete(`/professional/services/${serviceId}`)
      .set('Authorization', `Bearer ${professionalToken}`);

    expect(response.status).toBe(204); // Sem conteúdo, indicando sucesso
  });

  it('Deve criar uma disponibilidade para o profissional', async () => {
    const availabilityData = {
      weekday: 'MONDAY',
      startTime: '09:00',
      endTime: '18:00',
    };

    const response = await request(app)
      .post('/professional/availabilities')
      .set('Authorization', `Bearer ${professionalToken}`)
      .send(availabilityData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    availabilityId = response.body.id; // Armazena o id da disponibilidade criada
  });

  it('Deve permitir ao profissional obter suas disponibilidades', async () => {
    const response = await request(app)
      .get('/professional/availabilities')
      .set('Authorization', `Bearer ${professionalToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve atualizar uma disponibilidade do profissional', async () => {
    const updatedAvailability = { startTime: '10:00' };

    const response = await request(app)
      .put(`/professional/availabilities/${availabilityId}`)
      .set('Authorization', `Bearer ${professionalToken}`)
      .send(updatedAvailability);

    expect(response.status).toBe(200);
    expect(response.body.startTime).toBe(updatedAvailability.startTime);
  });

  it('Deve deletar uma disponibilidade do profissional', async () => {
    const response = await request(app)
      .delete(`/professional/availabilities/${availabilityId}`)
      .set('Authorization', `Bearer ${professionalToken}`);

    expect(response.status).toBe(204); // Sem conteúdo
  });

  it('Deve permitir ao profissional obter seus agendamentos', async () => {
    const response = await request(app)
      .get('/professional/appointments')
      .set('Authorization', `Bearer ${professionalToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve permitir ao profissional obter seus clientes', async () => {
    const response = await request(app)
      .get('/professional/customers')
      .set('Authorization', `Bearer ${professionalToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve permitir ao profissional abrir um chamado de suporte', async () => {
    const response = await request(app)
      .post('/professional/support')
      .set('Authorization', `Bearer ${professionalToken}`)
      .send({ message: 'Teste de suporte' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Verifica se o ID do chamado foi retornado
  });
});