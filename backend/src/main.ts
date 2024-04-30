import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  admin.initializeApp({
    credential: admin.credential.cert(
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    ),
    storageBucket: process.env.FIREBASE_URL,
  });
  app.enableCors();
  app.use(
    cors({
      origin: 'http://localhost:5173',
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );
  await app.listen(PORT, () => {
    console.log(`Application is running on: http://localhost:${PORT}`);
  });
}
bootstrap();
