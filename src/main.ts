import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.use('/uploads', express.static('uploads'));
  app.enableCors();
  // app.useStaticAssets(join(__dirname, '...','/uploads'));

  await app.listen(3001,()=>{console.log(process.env.PORT)});
}
bootstrap();
