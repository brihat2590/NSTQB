# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy Prisma schema before npm install
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./

# Copy package files and install dependencies.
# Skip lifecycle scripts at build time so Prisma does not require DATABASE_URL during image build.
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy the rest of your app
COPY . .

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Generate Prisma client and apply existing migrations at runtime (non-destructive), then start app.
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start"]