// src/services/adminService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdminService {
  async getDashboardStatistics() {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({ where: { status: 'ACTIVE' } });
    const inactiveUsers = await prisma.user.count({ where: { status: 'INACTIVE' } });
    const totalAppointments = await prisma.appointment.count();
    const totalRevenue = await prisma.subscription.aggregate({
      _sum: {
        amount: true,
      },
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalAppointments,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: false,
        name: true,
        plan: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async getOpenMessages() {
    return await prisma.message.findMany({
      where: { status: 'OPEN' },
      include: { professional: true }, // Inclui informações do profissional
    });
  }

  async getRevenueReport() {
    // Implementar lógica para obter relatório de ganhos com Stripe
    // Exemplo fictício:
    return await prisma.subscription.findMany();
  }
}

module.exports = new AdminService(); // Exportando uma instância da classe