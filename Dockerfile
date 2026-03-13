# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy prisma files
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy project
COPY . .

RUN npx prisma generate

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Run migrations and start
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]