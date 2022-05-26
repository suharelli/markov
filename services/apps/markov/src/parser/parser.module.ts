import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { Word } from '@app/common/entity/word.entity';
import { NextWord } from '@app/common/entity/next-word.entity';
import { Title } from '@app/common/entity/title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, NextWord, Title])],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
