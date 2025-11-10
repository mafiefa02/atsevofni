FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
CMD ["ls"]
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/ ./
COPY . .
RUN pnpm run build:web
