import { Module } from '@nestjs/common';
import { ParserModule } from './parser/parser.module';
import { GeneratorModule } from './generator/generator.module';
import { getPgRealTypeOrmModule } from '@app/common';

@Module({
  imports: [getPgRealTypeOrmModule(), ParserModule, GeneratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
