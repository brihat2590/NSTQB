# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy Prisma schema before npm install
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY .env .env
COPY tsconfig.json ./

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Push schema to DB and start app
CMD ["sh", "-c", "npx prisma db push && npm start"]
