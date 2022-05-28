import { NestFactory } from '@nestjs/core';
import { ParserModule } from './parser.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getEnv } from '@app/common/tools/getEnvVars';
import { ValidationPipe } from '@nestjs/common';

const env = getEnv();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ParserModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [env.RABBIT_URL!],
        queue: env.QUEUE_PARSER,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
