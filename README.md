# ✨ Fullstack NodeJS ✨ <!-- omit in toc -->

Highlights:

- 🌟 Tech stack: NodeJS + PostgreSQL + Prisma ORM, and JWT Authentication.

## Setup

### Initial Project and Install npm packages

```bash
npm init -y
npm install express bcryptjs jsonwebtoken pg prisma @prisma/client pg
```

### Create Prisma Client

```bash
npx prisma init
npx prisma generate
```

### Dockerized

```bash
# Build Docker Image
docker compose build

# Create PostgreSQL migrations
docker compose run app npx prisma migrate dev --name init

# Boost up Docker containers
docker compose up
```
