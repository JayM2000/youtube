# Base image (Ubuntu)
# ---------------------------
FROM ubuntu:22.04 AS base

ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies + Node.js
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    libc6 \
  && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g yarn \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---------------------------
# Dependencies stage
# ---------------------------
FROM base AS deps

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------------------------
# Build stage
# ---------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY prod.env .env.production

RUN yarn build

# ---------------------------
# Runtime stage
# ---------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN groupadd -g 1001 nodejs \
  && useradd -u 1001 -g nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]