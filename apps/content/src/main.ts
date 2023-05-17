import moduleAlias from 'module-alias';
moduleAlias(process.cwd()); // needed to find the package.json and extract _moduleAliases

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@make.org/content/src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env } from '@make.org/content/src/env';
import { Logger } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Make content')
    .setDescription('The Make content API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  const port = env.port() || 3000;
  if (port) {
    Logger.log(`Start on PORT ${port}`, 'InstanceLoader');
    await app.listen(port);
  } else {
    throw new Error('PORT env is not defined. Server not start.');
  }
};

bootstrap();
