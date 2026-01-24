# Step 1: Base Image
FROM node:current-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Step 2: Build Stage
FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Step 3: Production Stage
FROM node:current-slim AS production
WORKDIR /app

# Copy the output from the build stage (.output is the default for Nuxt 3)
COPY --from=build /app/.output /app/.output

# Nuxt runs on port 3000 by default
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Start the Nitro server
CMD ["node", ".output/server/index.mjs"]
