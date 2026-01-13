FROM node:18-bookworm AS development
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

COPY package*.json ./
RUN npm ci

COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY apps/${SERVICE_NAME} ./apps/${SERVICE_NAME}

RUN npx prisma generate --schema=apps/${SERVICE_NAME}/prisma/schema.prisma

FROM development AS builder
RUN npx nest build ${SERVICE_NAME}

FROM node:18-bookworm-slim AS production
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

RUN apt-get update \
 && apt-get install -y openssl libssl3 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/${SERVICE_NAME}/prisma ./apps/${SERVICE_NAME}/prisma

CMD [ "sh", "-c", "npx prisma db push --schema=apps/${SERVICE_NAME}/prisma/schema.prisma && node dist/apps/${SERVICE_NAME}/main.js" ]