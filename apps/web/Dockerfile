FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/ ./
COPY . .
RUN pnpm run build:web
