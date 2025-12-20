<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

```bash
docker-compose up --build

npm install

cd .\apps\auth-service or tickets-service or users-service

npx prisma migrate dev --name init --config=prisma/prisma.config.ts
npx prisma generate --config=prisma/prisma.config.ts
npx prisma studio --config=prisma/prisma.config.ts

cd ../..

npm run start:dev auth-service 
npm run start:dev tickets-service
npm run start:dev users-service
```