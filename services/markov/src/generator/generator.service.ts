import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Word } from '../word/entity/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { END, START } from '../parser/consts';
import { NextWord } from '../word/entity/next-word.entity';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

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
    const nextWords = await this.nextWordRepository.find({
      where: { word: current },
      relations: ['nextWord'],
    });

    const seed = Math.floor(Math.random() * (current.count + 1));
    let n = 0;
    for (const next of nextWords) {
      n += next.count;
      if (n >= seed) {
        return next.nextWord;
      }
    }

    throw new RuntimeException('No next word found');
  }
}
