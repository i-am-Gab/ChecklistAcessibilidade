FROM node:22-alpine

WORKDIR /app

# Copia manifests primeiro (cache de deps)
COPY package*.json ./

RUN npm ci --include=dev

# Copia o resto
COPY . .

# Porta de desenvolvimento usada também pelo Docker Compose
EXPOSE 3005

# Para Vite: precisa host 0.0.0.0 dentro do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3005"]
