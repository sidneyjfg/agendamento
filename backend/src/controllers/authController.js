// src/controllers/authController.js
const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    console.log(`email: ${email}, password: ${password}`);
    try {
      const { token, user } = await authService.login(email, password);
      return res.json({ token, user: user });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async register(req, res) {
    const { name, email, password, phone } = req.body; // Adicionando role no registro
    console.log(`name: ${name}, email: ${email}, password: ${password}, phone: ${phone}`);
    // Validação dos campos obrigatórios
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Nome, email, senha e telefone são obrigatórios.' });
    } try {
      const newUser = await authService.register(name, email, password, phone);
      return res.status(201).json({ status: 201, user: newUser, message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error); // Log do erro
      return res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
  }
}

module.exports = new AuthController(); // Exportando uma instância da classe