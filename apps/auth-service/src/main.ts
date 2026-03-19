import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setVersion('1.0.0')
    .setBasePath('auth')
    .addServer('/auth')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('/docs-json', (req, res) => {
    res.json(document);
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(
    `🚀 Auth Service running at http://localhost:${port}/docs`
  );
}

bootstrap();