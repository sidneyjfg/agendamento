// src/controllers/planController.js
const planService = require('../services/planService');

class PlanController {
  async getAllPlans(req, res) {
    try {
      const plans = await planService.getAllPlans();
      return res.json(plans);
    } catch (error) {
      console.error('Erro ao obter planos:', error);
      return res.status(500).json({ message: 'Erro ao obter planos', error });
    }
  }

  async subscribe(req, res) {
    const { planId } = req.params;
    const userId = req.user.id; // Obtendo o ID do usuário autenticado

    try {
      // Verifica se o plano existe
      const plan = await planService.getPlanById(planId);
      if (!plan) {
        return res.status(404).json({ message: 'Plano não encontrado' });
      }

      // Cria a assinatura no Stripe
      const subscription = await stripe.subscriptions.create({
        customer: req.user.stripeCustomerId, // Certifique-se de que o usuário tem um stripeCustomerId
        items: [{ price: plan.stripePriceId }], // O ID do preço do Stripe deve ser associado ao plano
      });

      // Salva a assinatura no banco de dados (opcional)
      await planService.createSubscription(userId, subscription.id, planId);

      return res.status(201).json(subscription);
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      return res.status(500).json({ message: 'Erro ao criar assinatura', error });
    }
  }
}

module.exports = new PlanController();