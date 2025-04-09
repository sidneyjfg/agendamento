// src/routes/planRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const planController = require('../controllers/planController'); // Importando o controller

// Rota para listar todos os planos
router.get('/plans', async (req, res) => planController.getAllPlans(req, res));

// Rota para criar uma nova assinatura
router.post('/subscribe/:planId', authenticateJWT, async (req, res) => planController.subscribe(req, res));

module.exports = router;