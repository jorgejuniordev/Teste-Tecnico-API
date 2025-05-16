import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // midlware para validar os dados da requisição
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  // enable cors
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Se estiver usando cookies/tokens
  });
  // midlware para serializar os dados da resposta
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get('Reflector')),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
