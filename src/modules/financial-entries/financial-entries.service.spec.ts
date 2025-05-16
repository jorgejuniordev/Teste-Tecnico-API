import { Test, TestingModule } from '@nestjs/testing';
import { FinancialEntriesService } from './financial-entries.service';

describe('FinancialEntriesService', () => {
  let service: FinancialEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialEntriesService],
    }).compile();

    service = module.get<FinancialEntriesService>(FinancialEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
