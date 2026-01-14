import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
      queue: 'users.events',
      queueOptions: {
        durable: true,
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API для управління користувачами')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.getHttpAdapter().get('/docs-json', (req, res) => {
    res.json(document);
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`🚀 Service User running on 👉 http://localhost:${port} 👈`);
  console.log(`🩺 Health check: http://localhost:${port}/health`);
}
bootstrap();
