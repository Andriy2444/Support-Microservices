import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
     .setTitle('Ticket Service')
     .setVersion("1.0.0")
     .setBasePath('tickets')
     .addBearerAuth()
     .addServer('/tickets')
     .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)

  app.getHttpAdapter().get('/docs-json', (req, res) => {
    res.json(document);
  });

  await app.listen(port);
  console.log(
    `🚀🤤🤫 Service Tickets running on 👉 http://localhost:${port} 👈 🤫🤤🚀`,
  );
}

bootstrap();
