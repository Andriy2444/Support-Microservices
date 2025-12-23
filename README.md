<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.postimg.cc/qq9StNtr/server-icon1.jpg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

```bash
docker-compose -f docker/docker-compose.yml up --build

cd .\apps\auth-service
OR 
cd .\apps\tickets-service 
OR
cd .\apps\users-service

npm install

npx prisma migrate dev
npx prisma generate
npx prisma studio

npm run start:dev auth-service 
OR
npm run start:dev tickets-service
OR
npm run start:dev users-service
```

docker exec -it sts-postgres psql -U admin -d auth_db