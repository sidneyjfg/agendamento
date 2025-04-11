# frontend/Dockerfile

FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Aqui você define a variável do backend no build do React/Vite
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=http://189.126.106.206:3008/api
RUN npm run build

# Fase de produção (serve com nginx)
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove config padrão e copia a sua (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
