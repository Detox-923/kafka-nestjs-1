import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from "config";
import { kafkaOptions } from './kafka/configuration/kafka.options';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('bootstrap');

  const port = config.get<number>('configuration.server.port');

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(kafkaOptions);
  await app.startAllMicroservices();
  

  await app.listen(port);
  logger.log(`Application listening on port ${port}`); 
}
bootstrap();
