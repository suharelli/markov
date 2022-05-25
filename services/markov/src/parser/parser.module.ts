import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../word/entity/word.entity';
import { NextWord } from '../word/entity/next-word.entity';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { Title } from './entity/title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, NextWord, Title])],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
