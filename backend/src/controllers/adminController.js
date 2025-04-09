// src/controllers/adminController.js
const adminService = require('../services/adminService');

class AdminController {
  async getDashboard(req, res) {
    try {
      const statistics = await adminService.getDashboardStatistics();
      return res.json(statistics);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter estatísticas do dashboard', error });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await adminService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter usuários', error });
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await adminService.getOpenMessages();
      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter mensagens', error });
    }
  }

  async getRevenue(req, res) {
    try {
      const revenueReport = await adminService.getRevenueReport();
      return res.json(revenueReport);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter relatório de receita', error });
    }
  }
}

module.exports = new AdminController();