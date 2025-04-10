// src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login auth/login
router.post('/login', (req, res) => authController.login(req, res));

// Rota de registro auth/register
router.post('/register', (req, res) => authController.register(req, res));

module.exports = router;