import { Controller, Get, Query } from '@nestjs/common';
import { ParserService } from './parser.service';

@Controller()
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/parse')
  parse(@Query('page') page: number, @Query('count') count: number) {
    return this.parserService.parse(Number(page), Number(count));
  }
}
