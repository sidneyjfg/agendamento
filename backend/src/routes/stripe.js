const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

// POST /api/stripe/checkout/session
router.post('/checkout/session', authenticateJWT, stripeController.createCheckoutSession);
// GET /api/stripe/session/:session_id
router.get('/session/:session_id', authenticateJWT, stripeController.handleCheckoutSuccess);


module.exports = router;
