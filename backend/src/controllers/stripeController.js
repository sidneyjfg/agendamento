const stripeService = require('../services/stripeService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FRONTEND_URL = `${process.env.FRONTEND_URL}`;

// (opcional) Verifique se o usuário tem permissão para trocar de plano
class StripeController {
    async createCheckoutSession(req, res) {
        const userId = req.user.id;
        try {
            await stripeService.createSession(userId);
            const prices = await stripe.prices.list({
                lookup_keys: [req.body.lookup_key],
                expand: ['data.product'],
            });
            const session = await stripe.checkout.sessions.create({
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: prices.data[0].id,
                        // For metered billing, do not pass quantity
                        quantity: 1,

                    },
                ],
                mode: 'subscription',
                success_url: `${FRONTEND_URL}/sucesso/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${FRONTEND_URL}/cancelado`,
            });
            return res.status(200).json({ url: session.url });
        } catch (error) {
            console.error('Erro ao criar sessão de checkout:', error);
            return res.status(500).json({ message: 'Erro ao criar sessão de pagamento' });
        }
    }
    async handleCheckoutSuccess(req, res) {
        const { session_id } = req.params;

        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);

            if (session.payment_status !== 'paid') {
                return res.status(400).json({ message: 'Pagamento não confirmado' });
            }

            const customerId = session.customer;
            const subscriptionId = session.subscription;

            const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
            const priceId = stripeSubscription.items.data[0].price.id;

            // 🔎 Busca o plano correspondente no seu banco
            const plan = await prisma.plan.findFirst({
                where: { stripePriceId: priceId },
            });

            if (!plan) {
                return res.status(404).json({ message: 'Plano correspondente não encontrado' });
            }

            // Cria ou atualiza a assinatura
            const userId = req.user.id;

            // Remove outras assinaturas ativas (opcional)
            await prisma.subscription.updateMany({
                where: { userId, status: 'ACTIVE' },
                data: { status: 'CANCELLED' },
            });

            await prisma.subscription.create({
                data: {
                    userId,
                    planId: plan.id,
                    status: 'ACTIVE',
                    stripeSubscriptionId: subscriptionId,
                    paymentMethod: session.payment_method_types[0],
                    startDate: new Date(stripeSubscription.start_date * 1000),
                    endDate: new Date(stripeSubscription.current_period_end * 1000),
                },
            });

            // Atualiza o usuário com o novo plano e Stripe ID
            await prisma.user.update({
                where: { id: userId },
                data: {
                    planId: plan.id,
                    stripeCustomerId: customerId,
                },
            });

            return res.status(200).json({ message: 'Plano atualizado com sucesso', planName: plan.name });
        } catch (error) {
            console.error('Erro ao confirmar sessão do Stripe:', error);
            return res.status(500).json({ message: 'Erro ao finalizar pagamento' });
        }
    }

}
module.exports = new StripeController(); // Exportando uma instância da classe

