FROM node:18-bookworm AS development
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY . .

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

RUN npx prisma generate --schema=apps/${SERVICE_NAME}/prisma/schema.prisma

FROM development AS builder
RUN npx nest build

FROM node:18-bookworm-slim AS production
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

RUN apt-get update \
 && apt-get install -y openssl libssl3 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/${SERVICE_NAME} ./dist/apps/${SERVICE_NAME}
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/${SERVICE_NAME}/prisma ./apps/${SERVICE_NAME}/prisma

CMD sh -c "npx prisma db push --schema=apps/${SERVICE_NAME}/prisma/schema.prisma && node dist/apps/${SERVICE_NAME}/main.js"