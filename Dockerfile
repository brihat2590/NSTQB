# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy Prisma schema before npm install
COPY prisma ./prisma

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
