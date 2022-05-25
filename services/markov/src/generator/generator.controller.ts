import { Controller, Get } from '@nestjs/common';
import { GeneratorService } from './generator.service';

@Controller()
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get('/generate')
  generate() {
    return this.generatorService.generate();
  }
}
