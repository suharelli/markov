import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../word/entity/word.entity';
import { NextWord } from '../word/entity/next-word.entity';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word, NextWord])],
  controllers: [GeneratorController],
  providers: [GeneratorService],
})
export class GeneratorModule {}
