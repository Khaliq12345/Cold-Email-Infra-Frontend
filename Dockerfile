# Step 1: Base Image
FROM node:current-slim AS base

# Install pnpm directly
RUN npm install -g pnpm

WORKDIR /app

# Step 2: Build Stage
FROM base AS build
COPY . .
# Using --prod=false ensures devDependencies (like nuxt) are installed for the build
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Step 3: Production Stage
FROM node:current-slim AS production
WORKDIR /app

# Only copy the necessary output
COPY --from=build /app/.output /app/.output

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
