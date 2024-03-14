import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const PORT = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Tasks 26-2-2024')
    .setDescription('Description document for Rest API')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Admin: Khoản lý tài khoản người dùng')
    .addTag('Users')
    .addTag('Birthday')
    .addTag('Position')
    .addTag('Permission')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log(
      `SERVER STARTED ON PORT ${PORT}. ENDPOINT ON http://localhost:${PORT}`,
    );
  });
}
bootstrap();
