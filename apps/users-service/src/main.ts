import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Додаємо глобальний префікс
  app.setGlobalPrefix('api'); // Тепер всі routes будуть /api/...
  
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API для управління користувачами')
    .setVersion('1.0')
    .addBearerAuth() // Додаємо авторизацію в Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Змінив з 'docs' на 'api-docs'

  await app.listen(port);
  console.log(`🚀 Service User running on 👉 http://localhost:${port} 👈`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api-docs`);
  console.log(`🩺 Health check: http://localhost:${port}/health`);
}
bootstrap();
