// src/routes/admin.js
const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// Rota para obter estatísticas do dashboard
router.get('/dashboard', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => adminController.getDashboard(req, res));

// Rota para listar todos os usuários
router.get('/users', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => adminController.getUsers(req, res));

// Rota para listar chamados abertos por profissionais
router.get('/messages', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => adminController.getMessages(req, res));

// Rota para obter relatório de receita
router.get('/revenue', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => adminController.getRevenue(req, res));

module.exports = router;