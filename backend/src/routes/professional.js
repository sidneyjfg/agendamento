// src/routes/professional.js
const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const professionalController = require('../controllers/professionalController');

// Rota para obter informações do profissional autenticado
router.get('/me', authenticateJWT, (req, res) => professionalController.getMe(req, res));

// Rota para atualizar configurações do profissional
router.put('/settings', authenticateJWT, (req, res) => professionalController.updateSettings(req, res));

// CRUD para serviços
router.post('/services', authenticateJWT, (req, res) => professionalController.createService(req, res));
router.put('/services/:serviceId', authenticateJWT, (req, res) => professionalController.updateService(req, res));
router.delete('/services/:serviceId', authenticateJWT, (req, res) => professionalController.deleteService(req, res));
router.get('/services', authenticateJWT, (req, res) => professionalController.getServices(req, res));

// CRUD para disponibilidades
router.post('/availabilities', authenticateJWT, (req, res) => professionalController.createAvailability(req, res));
router.put('/availabilities/:availabilityId', authenticateJWT, (req, res) => professionalController.updateAvailability(req, res));
router.delete('/availabilities/:availabilityId', authenticateJWT, (req, res) => professionalController.deleteAvailability(req, res));
router.get('/availabilities', authenticateJWT, (req, res) => professionalController.getAvailabilities(req, res));

// Rota para listar agendamentos do profissional
router.get('/appointments', authenticateJWT, (req, res) => professionalController.getAppointments(req, res));

// Rota para listar clientes do profissional
router.get('/customers', authenticateJWT, (req, res) => professionalController.getCustomers(req, res));

// Rota para abrir chamado para o admin
router.post('/support', authenticateJWT, (req, res) => professionalController.openSupportTicket(req, res));

module.exports = router;