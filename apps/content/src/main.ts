import moduleAlias from 'module-alias';
moduleAlias(process.cwd()); // needed to find the package.json and extract _moduleAliases

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@make.org/content/src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env } from '@make.org/content/src/env';
import { Logger as MakeLogger } from '@make.org/content/src/logger';
import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceServer } from '@make.org/api/ApiService/ApiService.server';
import compression from 'compression';
import { NextFunction, Response } from 'express';

const bootstrap = async () => {
  const logger = env.isProduction() ? new MakeLogger() : new NestLogger();

  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors({
    origin: [
      /https:\/\/.*\.makeorg\.tech$/,
      /^https:\/\/.*.make\.org$/,
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use((req: unknown, res: Response, next: NextFunction) => {
    res.header('x-powered-by', 'MakeArmada');
    res.header(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '0');
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.header('X-Frame-Options', 'deny');
    next();
  });
  app.use(compression());
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Make content')
    .setDescription('The Make content API description')
    .addBearerAuth(undefined, 'AccessToken')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  ApiService.strategy = new ApiServiceServer(env.makeApiUrl() as string);

  const port = env.port() || 3000;
  if (port) {
    logger.log(`PORT from env:${port}`, 'InstanceLoader');
    await app.listen(port);
  } else {
    throw new Error('PORT env is not defined. Server not start.');
  }
};

bootstrap();
