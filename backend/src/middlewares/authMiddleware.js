// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtendo o token do cabeçalho

  if (!token) {
    return res.sendStatus(403); // Acesso negado se não houver token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token inválido
    }
    req.user = user; // Armazenando informações do usuário na requisição
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403); // Acesso negado se a role não estiver autorizada
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };