const { PrismaClient, PlanType } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Criar plano gratuito
  const freePlan = await prisma.plan.upsert({
    where: { name: 'Agendou Grátis' },
    update: {},
    create: {
      name: 'Agendou Grátis',
      type: PlanType.FREE,
      price: 0,
      maxAppointments: 30,
      allowWhatsapp: false,
      allowCustomLink: false,
      allowCustomLogo: false,
      supportPriority: false
    }
  });

  console.log('Plano gratuito criado:', freePlan);

  // Criar plano premium
  const premiumPlan = await prisma.plan.upsert({
    where: { name: 'Agendou Premium' },
    update: {},
    create: {
      name: 'Agendou Premium',
      type: PlanType.PREMIUM,
      price: 49.90,
      maxAppointments: -1,
      allowWhatsapp: true,
      allowCustomLink: true,
      allowCustomLogo: true,
      supportPriority: true,
      stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID // Certifique-se de que essa variável de ambiente está definida
    }
  });

  console.log('Plano premium criado:', premiumPlan);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });