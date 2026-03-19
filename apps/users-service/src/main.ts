import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
      queue: 'users.events',
      queueOptions: { durable: true },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Users Service API')
    .setDescription('API для управління користувачами')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/users')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('/docs-json', (req, res) => {
    res.json(document);
  });

  SwaggerModule.setup('api-docs', app, document);

  await app.startAllMicroservices();
  await app.listen(port);

  console.log(`🚀 Users Service running at http://localhost:${port}/api-docs`);
  console.log(`🩺 Health check: http://localhost:${port}/health`);
}

bootstrap();