# Base image
FROM node:20.18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm using npm
RUN npm install -g pnpm@10.16.1

# ENV vars
ENV NEXT_PUBLIC_XXX=default_value
ENV XXX=default_value

# Copy monorepo configuration files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copy all workspace packages (needed for workspace dependencies)
COPY packages ./packages
COPY apps/gpass-portal/package.json ./apps/gpass-portal/

# Install dependencies for the entire monorepo
RUN pnpm install --frozen-lockfile

# Copy the app source code
COPY apps/gpass-portal ./apps/gpass-portal

# Build the specific app
WORKDIR /app/apps/gpass-portal
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
COPY --from=builder --chown=nextjs:nodejs /app/apps/gpass-portal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/gpass-portal/.next/static ./apps/gpass-portal/.next/static

# Copy public and messages folders if they exist
COPY --from=builder --chown=nextjs:nodejs /app/apps/gpass-portal/public ./apps/gpass-portal/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/gpass-portal/messages ./apps/gpass-portal/messages

USER nextjs

# Expose port
EXPOSE $PORT

# The standalone output includes the server.js at the app level
CMD ["node", "apps/gpass-portal/server.js"]
