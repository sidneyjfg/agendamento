#!/bin/sh

echo "📦 Prisma: Gerando client..."
npx prisma generate --schema=src/prisma/schema.prisma

echo "📂 Prisma: Aplicando migrações..."
npx prisma migrate deploy --schema=src/prisma/schema.prisma

echo "🚀 Iniciando backend..."
exec node src/server.js