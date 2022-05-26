import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { Word } from '@app/common/entity/word.entity';
import { NextWord } from '@app/common/entity/next-word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, NextWord])],
  controllers: [GeneratorController],
  providers: [GeneratorService],
})
export class GeneratorModule {}
