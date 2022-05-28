import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getEnv } from '@app/common/tools/getEnvVars';

const env = getEnv();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: env.QUEUE_PARSER,
        transport: Transport.RMQ,
        options: {
          urls: [env.RABBIT_URL],
          queue: env.QUEUE_PARSER,
        },
      },
    ]),
  ],
  controllers: [ParserController],
  providers: [],
})
export class ParserModule {}
