// src/controllers/professionalController.js
const professionalService = require('../services/professionalService');

class ProfessionalController {
  // Função para obter informações do profissional autenticado
  async getMe(req, res) {
    const professionalId = req.user.id;
    try {
      const professional = await professionalService.getProfessionalInfo(professionalId);
      if (!professional) {
        return res.status(404).json({ message: 'Profissional não encontrado' });
      }
      console.log(professional);
      return res.json(professional);
    } catch (error) {
      console.error('Erro ao obter informações do profissional:', error);
      return res.status(500).json({ message: 'Erro ao obter informações do profissional', error });
    }
  }

  // Função para atualizar configurações do profissional
  async updateSettings(req, res) {
    const professionalId = req.user.id;
    const data = req.body;

    // Validação simples para garantir que campos essenciais estejam presentes
    if (!data.phone && !data.email) {
      return res.status(400).json({ message: 'É necessário fornecer ao menos um campo de atualização (telefone ou e-mail)' });
    }

    try {
      const updatedProfessional = await professionalService.updateSettings(professionalId, data);
      return res.json(updatedProfessional);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      return res.status(500).json({ message: 'Erro ao atualizar configurações', error });
    }
  }

  // Função para criar um serviço
  async createService(req, res) {
    const professionalId = req.user.id;
    const serviceData = req.body;

    // Validação básica para campos obrigatórios
    if (!serviceData.name || !serviceData.price || !serviceData.duration) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando: name, price, duration' });
    }

    try {
      const newService = await professionalService.createService(professionalId, serviceData);
      return res.status(201).json(newService);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      return res.status(500).json({ message: 'Erro ao criar serviço', error });
    }
  }

  // Função para atualizar um serviço
  async updateService(req, res) {
    const { serviceId } = req.params;
    const serviceData = req.body;

    try {
      const updatedService = await professionalService.updateService(serviceId, serviceData);
      return res.json(updatedService);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      return res.status(500).json({ message: 'Erro ao atualizar serviço', error });
    }
  }

  // Função para deletar um serviço
  async deleteService(req, res) {
    const { serviceId } = req.params;
    try {
      await professionalService.deleteService(serviceId);
      return res.sendStatus(204); // No content
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      return res.status(500).json({ message: 'Erro ao deletar serviço', error });
    }
  }

  // Função para obter os serviços
  async getServices(req, res) {
    const professionalId = req.user.id;
    try {
      const services = await professionalService.getServices(professionalId);
      return res.json(services);
    } catch (error) {
      console.error('Erro ao obter serviços:', error);
      return res.status(500).json({ message: 'Erro ao obter serviços', error });
    }
  }

  // Função para criar disponibilidade
  async createAvailability(req, res) {
    const professionalId = req.user.id;
    const availabilityData = req.body;

    if (!availabilityData.weekday || !availabilityData.startTime || !availabilityData.endTime) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando: weekday, startTime, endTime' });
    }

    try {
      const newAvailability = await professionalService.createAvailability(professionalId, availabilityData);
      return res.status(201).json(newAvailability);
    } catch (error) {
      console.error('Erro ao criar disponibilidade:', error);
      return res.status(500).json({ message: 'Erro ao criar disponibilidade', error });
    }
  }

  // Função para atualizar disponibilidade
  async updateAvailability(req, res) {
    const { availabilityId } = req.params;
    const availabilityData = req.body;

    if (!availabilityData.startTime && !availabilityData.endTime) {
      return res.status(400).json({ message: `Campos obrigatórios faltando: ${availabilityData.startTime ? 'endTime' : 'startTime'}` });
    }

    try {
      const updatedAvailability = await professionalService.updateAvailability(availabilityId, availabilityData);
      return res.json(updatedAvailability);
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade:', error);
      return res.status(500).json({ message: 'Erro ao atualizar disponibilidade', error });
    }
  }

  // Função para deletar disponibilidade
  async deleteAvailability(req, res) {
    const { availabilityId } = req.params;
    try {
      await professionalService.deleteAvailability(availabilityId);
      return res.sendStatus(204); // No content
    } catch (error) {
      console.error('Erro ao deletar disponibilidade:', error);
      return res.status(500).json({ message: 'Erro ao deletar disponibilidade', error });
    }
  }

  // Função para obter disponibilidades
  async getAvailabilities(req, res) {
    const professionalId = req.user.id;
    try {
      const availabilities = await professionalService.getAvailabilities(professionalId);
      return res.json(availabilities);
    } catch (error) {
      console.error('Erro ao obter disponibilidades:', error);
      return res.status(500).json({ message: 'Erro ao obter disponibilidades', error });
    }
  }

  // Função para obter agendamentos
  async getAppointments(req, res) {
    const professionalId = req.user.id;
    const { status } = req.query;
    try {
      const appointments = await professionalService.getAppointments(professionalId, status);
      return res.json(appointments);
    } catch (error) {
      console.error('Erro ao obter agendamentos:', error);
      return res.status(500).json({ message: 'Erro ao obter agendamentos', error });
    }
  }

  // Função para obter clientes
  async getCustomers(req, res) {
    const professionalId = req.user.id;
    try {
      const customers = await professionalService.getCustomers(professionalId);
      return res.json(customers);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
      return res.status(500).json({ message: 'Erro ao obter clientes', error });
    }
  }

  // Função para abrir um chamado de suporte
  async openSupportTicket(req, res) {
    const professionalId = req.user.id;
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'O campo de mensagem é obrigatório' });
    }

    try {
      const ticket = await professionalService.openSupportTicket(professionalId, message);
      return res.status(201).json(ticket);
    } catch (error) {
      console.error('Erro ao abrir chamado de suporte:', error);
      return res.status(500).json({ message: 'Erro ao abrir chamado', error });
    }
  }
}

module.exports = new ProfessionalController(); // Exportando uma instância da classe
