import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { END, START } from './consts';
import { Word } from '@app/common/entity/word.entity';
import { NextWord } from '@app/common/entity/next-word.entity';
import { Title } from '@app/common/entity/title.entity';

@Injectable()
export class ParserService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRepository(NextWord)
    private readonly nextWordRepository: Repository<NextWord>,
    @InjectRepository(Title)
    private readonly titleRepository: Repository<Title>,
  ) {}
  async parse(page: number, count: number) {
    try {
      for (let currentPage = page; currentPage < page + count; currentPage++) {
        const titles = await this.getTitles(currentPage);

        for (const title of titles) {
          const savedTitle = await this.titleRepository.findOne({ title });

          if (!savedTitle) {
            await this.parseTitle(title);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async getTitles(page: number): Promise<string[]> {
    try {
      const res = await axios.get(`http://breakingmad.me/ru/?page=${page}`);
      return [...(await res.data.matchAll(/\<h2\>([^\<]+)/gm))].map(
        (m) => m[1],
      );
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  private async parseTitle(title: string) {
    await this.titleRepository.save({ title });

    const words = title.split(' ');

    for (const [i, wordString] of words.entries()) {
      if (i === 0) {
        const word = await this.findOrCreateWord(START);
        const nextWord = await this.findOrCreateWord(wordString);
        await this.processWordRelation(word, nextWord);
      }

      if (i === words.length - 1) {
        const word = await this.findOrCreateWord(wordString);
        const nextWord = await this.findOrCreateWord(END);
        await this.processWordRelation(word, nextWord);
        return;
      }

      const word = await this.findOrCreateWord(wordString);
      const nextWord = await this.findOrCreateWord(words[i + 1]);
      await this.processWordRelation(word, nextWord);
    }
  }

  private async processWordRelation(word: Word, nextWord: Word) {
    const nextWordRelation = await this.findOrCreateNextWord(word, nextWord);
    nextWordRelation.count += 1;
    word.count += 1;
    await this.wordRepository.save(word);
    await this.nextWordRepository.save(nextWordRelation);
  }

  private async findOrCreateWord(word: string): Promise<Word> {
    return (
      (await this.wordRepository.findOne({ phrase: word })) ||
      (await this.wordRepository.save({ phrase: word, count: 0 }))
    );
  }

  private async findOrCreateNextWord(
    word: Word,
    nextWord: Word,
  ): Promise<NextWord> {
    return (
      (await this.nextWordRepository.findOne({ word, nextWord })) ||
      (await this.nextWordRepository.save({ word, nextWord, count: 0 }))
    );
  }
}
