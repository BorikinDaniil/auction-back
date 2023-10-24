import './env';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('AUCTION')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Borikin D.')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(SERVER_PORT);
}

init();
