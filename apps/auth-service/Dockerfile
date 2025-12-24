FROM node:18-bookworm AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY nest-cli.json ./
COPY tsconfig*.json ./

COPY . .

ARG SERVICE_NAME

RUN npx prisma generate --schema=apps/${SERVICE_NAME}/prisma/schema.prisma
RUN npx nest build ${SERVICE_NAME}

# --- Stage 2: Run ---
FROM node:18-bookworm-slim
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

RUN apt-get update && apt-get install -y openssl libssl3 ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/${SERVICE_NAME} ./dist
COPY --from=builder /app/package*.json ./

COPY --from=builder /app/apps/${SERVICE_NAME}/prisma ./apps/${SERVICE_NAME}/prisma
COPY --from=builder /app/apps/${SERVICE_NAME}/src/generated ./apps/${SERVICE_NAME}/src/generated

RUN npx prisma generate --schema=apps/${SERVICE_NAME}/prisma/schema.prisma

ENV PORT=3000
EXPOSE ${PORT}

CMD npx prisma db push --schema=apps/${SERVICE_NAME}/prisma/schema.prisma && node dist/main.js