import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { NextWord } from '@app/common/entity/next-word.entity';
import { Word } from '@app/common/entity/word.entity';
import { END, START } from '@app/common/consts';

@Injectable()
export class GeneratorService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
    @InjectRepository(NextWord)
    private readonly nextWordRepository: Repository<NextWord>,
  ) {}
  async generate(): Promise<string> {
    const generatedPhases = [];

    let word = await this.getNextWord(
      await this.wordRepository.findOne({ phrase: START }),
    );

    while (word.phrase !== END) {
      generatedPhases.push(word.phrase);
      word = await this.getNextWord(word);
    }

    return generatedPhases.join(' ');
  }

  private async getNextWord(current: Word): Promise<Word> {
    const nextWords = await this.getNextWords(current);

    const seed = Math.floor(Math.random() * (current.count + 1));
    let n = 0;
    for (const next of nextWords) {
      n += next.count;
      if (n >= seed) {
        return (
          await this.nextWordRepository.findOne({
            where: { id: next.id },
            relations: ['nextWord'],
          })
        ).nextWord;
      }
    }

    throw new RuntimeException('No next word found');
  }

  private getNextWords(word: Word): Promise<NextWord[]> {
    return this.nextWordRepository
      .createQueryBuilder()
      .where({ word })
      .orderBy('RANDOM()')
      .getMany();
  }
}
