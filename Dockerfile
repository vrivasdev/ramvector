# syntax=docker/dockerfile:1.4
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

EXPOSE 3000

FROM base AS development
ENV NODE_ENV=development

# Create cache directory and set ownership before dropping privileges
RUN mkdir -p /app/node_modules && chown -R node:node /app

COPY --chown=node:node package.json package-lock.json* ./

USER node

RUN npm ci

COPY --chown=node:node . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
