import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { getPgRealTypeOrmModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '@app/common/entity/word.entity';
import { NextWord } from '@app/common/entity/next-word.entity';
import { Title } from '@app/common/entity/title.entity';

@Module({
  imports: [
    getPgRealTypeOrmModule(),
    TypeOrmModule.forFeature([Word, NextWord, Title]),
  ],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
