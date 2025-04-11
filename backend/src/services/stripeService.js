const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class StripeService {

    async createSession(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
    }
}
module.exports = new StripeService();