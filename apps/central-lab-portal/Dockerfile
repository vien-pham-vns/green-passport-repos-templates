# Base image
FROM node:20.18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm using npm
RUN npm install -g pnpm@10.16.1

# ENV vars
# ENV NEXT_PUBLIC_XXX=default_value
# ENV XXX=default_value
ENV DOMAIN=https://dt-dev.vnsilicon.cloud
ENV DEPLOYMENT_ENV=staging
ENV API_DOMAIN=https://dt-staging.bks.com/api/controller
ENV API_CORE_DOMAIN=https://dt-staging.bks.com/api/core
ENV API_DOMAIN_DIRECTUS=https://directus.dt-staging.vnsilicon.cloud
ENV EGAP_DOMAIN=https://egap.dt-dev.vnsilicon.cloud

# Copy monorepo configuration files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copy all workspace packages (needed for workspace dependencies)
COPY packages ./packages
COPY apps/central-lab-portal/package.json ./apps/central-lab-portal/

# Install dependencies for the entire monorepo (ignore scripts to skip husky in Docker)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the app source code
COPY apps/central-lab-portal ./apps/central-lab-portal

# Build the specific app
WORKDIR /app/apps/central-lab-portal
RUN pnpm build

# ----------------------------
# Runner image
FROM node:20.18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install gettext (includes envsubst)
RUN apk add --no-cache gettext

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/central-lab-portal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/central-lab-portal/.next/static ./apps/central-lab-portal/.next/static

# Copy public and messages folders if they exist
COPY --from=builder --chown=nextjs:nodejs /app/apps/central-lab-portal/public ./apps/central-lab-portal/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/central-lab-portal/messages ./apps/central-lab-portal/messages

USER nextjs

# Expose port
EXPOSE $PORT

# The standalone output includes the server.js at the app level
CMD ["node", "apps/central-lab-portal/server.js"]
