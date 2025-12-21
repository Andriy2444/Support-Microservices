import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Ticket Microservice')
    .setDescription('REST API DOCUMENTATION')
    .setVersion("1.0.0")
    .addTag("ULBI TV")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(port);
  console.log(`🚀🤤🤫 Service Tickets running on 👉 http://localhost:${port} 👈 🤫🤤🚀`);
}

bootstrap();