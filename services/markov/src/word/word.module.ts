import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { NextWord } from './entity/next-word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, NextWord])],
  controllers: [],
  providers: [],
})
export class WordModule {}
