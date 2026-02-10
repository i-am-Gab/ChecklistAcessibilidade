FROM node:20-alpine

WORKDIR /app

# Copia manifests primeiro (cache de deps)
COPY package*.json ./

RUN npm ci || npm install

# Copia o resto
COPY . .

# Vite usa 5173; CRA usa 3000
# Vou deixar 5173 por padrão; ajuste se precisar.
EXPOSE 5173

# Para Vite: precisa host 0.0.0.0 dentro do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3005"]