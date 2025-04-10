// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthService {

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Senha incorreta');
    }

    // Geração do token JWT com role
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        planId: user.planId,
        brandName: user.brandName,
        logoUrl: user.logoUrl,
        stripeCustomerId: user.stripeCustomerId,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }

  async register(name, email, password, phone, role = 'PROFESSIONAL') {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Verifica se o plano existe
    const plan = await prisma.plan.findFirst({
      where: {
        name: 'Agendou Grátis', // Supondo que o nome do plano gratuito seja 'Plano Grátis'
      },
    });
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        phone: phone,
        role,
        slugPublicId: name,
        planId: plan.id,
      },
    });
    return {
      id: '',
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      planId: '',
      brandName: '', // Campo vazio
      logoUrl: '', // Campo vazio
      stripeCustomerId: '', // Campo vazio
      status: newUser.status,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

}

module.exports = new AuthService();