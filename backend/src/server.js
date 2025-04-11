// src/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const professionalRoutes = require('./routes/professional');
const planRoutes = require('./routes/plan'); // Importando as rotas de planos
const stripeRoutes = require('./routes/stripe');
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/plans', planRoutes); // Usando as rotas de planos
app.use('/api/stripe', stripeRoutes);
app.use('/api/professional', professionalRoutes);


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app; // Exporta o app para testes