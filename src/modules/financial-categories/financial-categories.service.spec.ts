import { Test, TestingModule } from '@nestjs/testing';
import { FinancialCategoriesService } from './financial-categories.service';

describe('FinancialCategoriesService', () => {
  let service: FinancialCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialCategoriesService],
    }).compile();

    service = module.get<FinancialCategoriesService>(FinancialCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
