# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Enable pnpm (this project is pinned to pnpm via "packageManager" in package.json)
RUN corepack enable

# Copy files needed to install dependencies first (better layer caching)
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts tsconfig.json ./

# Install dependencies (--ignore-scripts skips husky, which needs a .git folder
# that isn't present in the build context)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the project
COPY . .

# Generate the Prisma client and build Next.js
RUN pnpm exec prisma generate
RUN pnpm run build

# Expose port
EXPOSE 3000

# Apply pending migrations, then start the app
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm start"]
