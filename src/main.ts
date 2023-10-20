import './env';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import { AppModule } from './app.module';

async function init() {
  const { SERVER_PORT } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);

  app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(SERVER_PORT);
}

init();
