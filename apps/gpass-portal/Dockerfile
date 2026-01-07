# Base image
FROM node:20.18-alpine AS builder

# Set working directory
WORKDIR /app

# ENV vars
ENV NEXT_PUBLIC_XXX=default_value
ENV XXX=default_value

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

# Copy source code
COPY . .

# Build app
RUN yarn build

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

# ✅ Use --chown consistently
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# ✅ Copy entrypoint script (owned by nextjs)
# COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh

USER nextjs

# Expose port
EXPOSE $PORT

RUN chmod +x ./docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
