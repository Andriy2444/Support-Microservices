<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.postimg.cc/qq9StNtr/server-icon1.jpg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

```bash
docker-compose -f docker/docker-compose.yml up --build

npm install

cd .\apps\auth-service
OR 
cd .\apps\tickets-service 
OR
cd .\apps\users-service

npx prisma migrate dev --name init --config=prisma/prisma.config.ts
npx prisma generate --config=prisma/prisma.config.ts
npx prisma studio --config=prisma/prisma.config.ts

cd ../..

npm run start:dev auth-service 
OR
npm run start:dev tickets-service
OR
npm run start:dev users-service
```