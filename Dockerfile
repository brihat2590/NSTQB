# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
# Copy source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
