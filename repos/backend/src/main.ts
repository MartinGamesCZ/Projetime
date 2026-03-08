import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Database } from './database/database';

import 'reflect-metadata';

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { APP_HOST, APP_NAME, APP_PORT, IS_DEV } from './config';
import { AppExceptionFilter } from './filters/exception.filter';
import { ElectronAuthGuard } from './guards/electron-auth.guard';

async function bootstrap() {
  let dbInitialized = false;

  while (!dbInitialized) {
    Logger.log('Initializing db...');

    await Database.initialize()
      .catch(() => (dbInitialized = false))
      .then(() => (dbInitialized = true));

    await new Promise((r) => setTimeout(r, 500));
  }

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`${APP_NAME} API spec`)
    .setVersion('1.0')
    //.addBearerAuth()
    //.addSecurityRequirements('bearer')
    .build();

  try {
    const metadataPath = './metadata';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const metadata = await import(metadataPath);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await SwaggerModule.loadPluginMetadata(metadata.default);
  } catch {}

  if (IS_DEV)
    SwaggerModule.setup('/api/swagger', app, () =>
      SwaggerModule.createDocument(app, swaggerConfig),
    );

  app.enableCors('*');
  app.useGlobalGuards(new ElectronAuthGuard());
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());

  await app.listen(APP_PORT, APP_HOST);
}

bootstrap();
