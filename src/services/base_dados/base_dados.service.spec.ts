import { Test, TestingModule } from '@nestjs/testing';
import { BaseDadosService } from './base_dados.service';

describe('BaseDadosService', () => {
  let service: BaseDadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseDadosService],
    }).compile();

    service = module.get<BaseDadosService>(BaseDadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
