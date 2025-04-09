// src/services/planService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PlanService {
  async getAllPlans() {
    return await prisma.plan.findMany();
  }

  async getPlanById(planId) {
    return await prisma.plan.findUnique({
      where: { id: planId },
    });
  }

  async createSubscription(userId, subscriptionId, planId) {
    return await prisma.subscription.create({
      data: {
        userId,
        subscriptionId,
        planId,
      },
    });
  }
}

module.exports = new PlanService(); // Exportando uma instância da classe