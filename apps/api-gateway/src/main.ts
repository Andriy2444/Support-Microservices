import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.enableCors();

  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth-service:3001',
      changeOrigin: true,
    }),
  );

  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://users-service:3002',
      changeOrigin: true,
    }),
  );

  app.use(
    '/tickets',
    createProxyMiddleware({
      target: 'http://tickets-service:3003',
      changeOrigin: true,
    }),
  );

  const dummyDocument: OpenAPIObject = {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway',
      version: '1.0.0',
      description: 'Головний вхід до мікросервісів',
    },
    paths: {},
    components: {},
  };

  SwaggerModule.setup('docs', app, dummyDocument, {
    explorer: true,
    swaggerOptions: {
      urls: [
        { url: '/auth/docs-json', name: 'Auth Service' },
        { url: '/users/docs-json', name: 'Users Service' },
        { url: '/tickets/docs-json', name: 'Tickets Service' },
      ],
    },
  });

  const PORT = 3000;
  await app.listen(PORT);
  console.log(`🚀 Gateway running at http://localhost:${PORT}/docs`);
}

bootstrap();
