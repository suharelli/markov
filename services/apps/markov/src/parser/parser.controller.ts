import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { getEnv } from '@app/common/tools/getEnvVars';
import { sendMessage } from '@app/common/tools/msTools';

const env = getEnv();

@Controller()
export class ParserController {
  constructor(
    @Inject(env.QUEUE_PARSER) private readonly parserQueue: ClientProxy,
  ) {}

  @Get('/parse')
  parse(@Query('page') page: number, @Query('count') count: number) {
    return sendMessage(this.parserQueue, 'parse', {
      page: Number(page),
      count: Number(count),
    });
  }
}
