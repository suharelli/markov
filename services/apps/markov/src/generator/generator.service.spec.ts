import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorService } from './generator.service';
import { Repository } from 'typeorm';
import { Word } from '@app/common/entity/word.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NextWord } from '@app/common/entity/next-word.entity';

describe('GeneratorController', () => {
  let generatorService: GeneratorService;
  let wordRepo: Repository<Word>;
  let nextWordRepo: Repository<NextWord>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneratorService,
        {
          provide: getRepositoryToken(Word),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(NextWord),
          useClass: Repository,
        },
      ],
    }).compile();

    generatorService = module.get<GeneratorService>(GeneratorService);
    wordRepo = module.get<Repository<Word>>(getRepositoryToken(Word));
    nextWordRepo = module.get<Repository<NextWord>>(
      getRepositoryToken(NextWord),
    );
  });

  it('should be defined', () => {
    expect(generatorService).toBeDefined();
  });
});
