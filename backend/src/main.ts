import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  try {
    const serviceAccount = require(process.env.FIREBASE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_URL,
    });
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    process.exit(1);
  }
  // app.enableCors({
  //   allowedHeaders: 'Content-Type, Accept, Access-Control-Allow-Origin',
  //   methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  //   credentials: true,
  //   origin: true,
  // });
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
