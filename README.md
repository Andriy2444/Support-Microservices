<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.postimg.cc/qq9StNtr/server-icon1.jpg" width="120" alt="Nest Logo" /></a>
</p>

# Support Microservices Project

This project is a **support ticket system** built with **NestJS**, **Prisma**, **PostgreSQL**, **RabbitMQ**, **JWT authentication**, and containerized using **Docker**. It follows a **microservices architecture** with separate services for **authentication**, **users**, and **tickets**.

---

## Architecture

- **API Gateway** – Handles incoming requests and routes them to the appropriate microservice.  
- **Auth Service** – Manages user authentication and JWT token issuance.  
- **Users Service** – Manages user data and roles.  
- **Tickets Service** – Manages tickets, messages, and ticket-user relationships.  
- **RabbitMQ** – Used for inter-service communication (events, such as user creation).  
- **PostgreSQL** – Each service has its own database:  
  - `auth_db` for Auth service  
  - `users_db` for Users service  
  - `tickets_db` for Tickets service  
- **Guards & Roles** – JWT authentication and role-based access control (Admin, Support, User).

**Technologies:**  
NestJS (microservices), Prisma (ORM for PostgreSQL), JWT authentication, Docker & Docker Compose, RabbitMQ for events, Swagger for API documentation.

---

## Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Cyxariki-team/Support-Microservices.git
cd Support-Microservices
```
2. **Install dependencies:**
```bash
npm install
```
3. **Generate Prisma clients for each service:**
```bash
npx prisma generate --schema=apps/auth-service/prisma/schema.prisma
npx prisma generate --schema=apps/users-service/prisma/schema.prisma
npx prisma generate --schema=apps/tickets-service/prisma/schema.prisma
```
4. **Start Docker services:**
```bash
cd docker
docker-compose up --build
```
5. **Run API Gateway locally:**
```bash
nest start api-gateway --watch
```
Swagger Documentation are running from http://localhost:3000/docs

## K8s Setup
soon