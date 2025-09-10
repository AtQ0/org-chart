# syntax=docker/dockerfile:1

# ---------- base ----------
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# native deps for things like bcrypt, sharp, etc.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# ---------- deps for development ----------
FROM base AS deps_dev
COPY package*.json ./
RUN npm ci

# ---------- deps for production (no devDeps) ----------
FROM base AS deps_prod
COPY package*.json ./
RUN npm ci --omit=dev

# ---------- development runtime (used by compose with bind mount) ----------
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps_dev /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm","run","dev"]

# ---------- build (creates .next) ----------
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps_dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- production runner ----------
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Copy only what we need at runtime
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=deps_prod /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm","start"]
