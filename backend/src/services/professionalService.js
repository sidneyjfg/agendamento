// src/services/professionalService.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

class ProfessionalService {
  async getProfessionalInfo(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        phone: true,
        role: true,
        brandName: true,
        logoUrl: true,
        slugPublicId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        plan: {
          select: {
            name: true,
            maxAppointments: true,
            allowWhatsapp: true,
            allowCustomLink: true,
            allowCustomLogo: true,
            supportPriority: true,
          }
        }
      }
    });
  }

  async updateSettings(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  // Implementar CRUD para serviços e disponibilidades
  async createService(professionalId, serviceData) {
    return await prisma.service.create({
      data: {
        ...serviceData,
        userId: professionalId,
      },
    });
  };

  async updateService(serviceId, serviceData) {
    return await prisma.service.update({
      where: { id: serviceId },
      data: serviceData,
    });
  }

  async deleteService(serviceId) {
    return await prisma.service.delete({
      where: { id: serviceId },
    });
  }

  async getServices(professionalId) {
    return await prisma.service.findMany({
      where: { userId: professionalId },
    });
  }

  // Implementar CRUD para disponibilidades
  async createAvailability(professionalId, availabilityData) {
    return await prisma.availability.create({
      data: {
        ...availabilityData,
        userId: professionalId,
      },
    });
  };

  async updateAvailability(availabilityId, availabilityData) {
    return await prisma.availability.update({
      where: { id: availabilityId },
      data: availabilityData,
    });
  };

  async deleteAvailability(availabilityId) {
    return await prisma.availability.delete({
      where: { id: availabilityId },
    });
  };

  async getAvailabilities(professionalId) {
    return await prisma.availability.findMany({
      where: { userId: professionalId },
    });
  };

  async getAppointments(professionalId, status) {
    return await prisma.appointment.findMany({
      where: {
        userId: professionalId,
        status,
      },
    });
  };

  async getCustomers(professionalId) {
    return await prisma.customer.findMany({
      where: { userId: professionalId },
    });
  };

  async openSupportTicket(professionalId, message) {
    return await prisma.supportTicket.create({
      data: {
        userId: professionalId,
        message,
      },
    });
  }
}
module.exports = new ProfessionalService();