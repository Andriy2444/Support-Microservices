<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.postimg.cc/qq9StNtr/server-icon1.jpg" width="120" alt="Nest Logo" /></a>
</p>

# Support Microservices Project

---

## 🏗 Architecture Overview
This project implements a Support Ticket System using a microservices pattern. Each service is isolated, has its own database, and communicates asynchronously via RabbitMQ.

- **API Gateway:** Single entry point, routing, and Swagger aggregation.

- **Auth Service:** Identity management, JWT, and security.

- **Users Service:** Profile management and RBAC (Role-Based Access Control).

- **Tickets Service:** Core business logic for support requests.

- **Event Bus:** RabbitMQ for decoupled service communication.

### 🛠 Tech Stack

- **Framework:** NestJS

- **ORM:** Prisma (PostgreSQL)

- **DevOps:** Docker, Kubernetes (K8s), GitHub Actions (CI)
---
## 📁 Project Structure
```
.
├── apps/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── users-service/
│   └── tickets-service/
│       ├── prisma/
│       ├── src/
|       ├── Dockerfile
│       └── .env.example
├── docker/
│   ├── docker-compose.yaml
│   └── .env.example
├── k8s/
│   ├── config.yaml
│   ├── databases.yaml
│   ├── gateway.yaml
│   ├── rabbitmq-deployment.yaml
│   ├── services.yaml
│   └── secrets.yaml.example
├── .github/workflows/
│   └── docker-image.yml
├── package.json
└── nest-cli.json
```
---

## 🐋 Local Setup (Docker)

### 1. **Clone the repository:**
```bash
git clone https://github.com/Cyxariki-team/Support-Microservices.git
cd Support-Microservices
```
### 2. **Create .env from service and docker**
Copy ```.env.exemple``` to ```.env``` and change to your data.

From:
- ```Support-Microservices\docker\.env```
- ```Support-Microservices\apps\service\.env```
### 3. **Install dependencies:**
```bash
npm install
```
### 4. **Generate Prisma clients for each service:**
```bash
npx prisma generate --schema=apps/auth-service/prisma/schema.prisma
npx prisma generate --schema=apps/users-service/prisma/schema.prisma
npx prisma generate --schema=apps/tickets-service/prisma/schema.prisma
```
### 5. **Start Docker services:**
```bash
cd docker
docker-compose up --build
```
### 6. **Run API Gateway locally:**
```bash
nest start api-gateway --watch
```
Swagger Documentation are running from http://localhost:3000/docs

---

## 💎 K8s Setup
### 1. **Build docker**
```bash
docker build -t docker-auth-service:latest . --build-arg SERVICE_NAME=auth-service -f apps/auth-service/Dockerfile
docker build -t docker-users-service:latest . --build-arg SERVICE_NAME=users-service -f apps/users-service/Dockerfile
docker build -t docker-tickets-service:latest . --build-arg SERVICE_NAME=tickets-service -f apps/tickets-service/Dockerfile
docker build -t docker-api-gateway:latest . --build-arg SERVICE_NAME=api-gateway -f apps/api-gateway/Dockerfile
```
### 2. **Create secrets.yaml**
Copy ```secrets.yaml.exemple``` to ```secrets.yaml``` and change to your data.

From:
- ```Support-Microservices\k8s\secrets.yaml```
### 3. **Apply k8s**
```bash
kubectl apply -f k8s/
```
### 4. **Check**
```bash
kubectl get pods
kubectl get svc
kubectl port-forward svc/api-gateway-service 3000:3000
```
Swagger Documentation are running from http://localhost:3000/docs

---

## Team 👥

- **Жмурко Андрій** - **System Architect & DevOps**
  - _Architecture, API Gateway, K8s & Docker._

- **Осадець Орест** - **Backend Developer**
  - _Tickets service & GitHub CI_

- **Назаркевич Олександр** - **Backend Developer**
  - _Users service_

- **Куронав Артем** - **Backend Developer**
  - _Auth service_
