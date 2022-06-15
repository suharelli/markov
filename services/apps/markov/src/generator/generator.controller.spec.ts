import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';

describe('GeneratorController', () => {
  let generatorController: GeneratorController;
  const expected = 'ok';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratorController],
    })
      .useMocker((token) => {
        if (token === GeneratorService) {
          return { generate: jest.fn().mockResolvedValue(expected) };
        }
      })
      .compile();

    generatorController = module.get<GeneratorController>(GeneratorController);
  });

  it('should be defined', () => {
    expect(generatorController).toBeDefined();
  });

  it('should return value from service', async () => {
    const actual = await generatorController.generate();

    expect(actual).toBe(expected);
  });
});
