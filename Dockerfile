# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy Prisma schema BEFORE npm install
COPY prisma ./prisma

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Generate Prisma client (in case postinstall didn't run)
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
