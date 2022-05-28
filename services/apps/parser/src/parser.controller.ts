import { Controller } from '@nestjs/common';
import { ParserService } from './parser.service';
import { MessagePattern } from '@nestjs/microservices';
import { ParseDto } from './dto/parse.dto';

@Controller()
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @MessagePattern('parse')
  parse(dto: ParseDto) {
    return this.parserService.parse(dto.page, dto.count);
  }
}
