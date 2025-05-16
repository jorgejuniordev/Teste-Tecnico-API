import { Test, TestingModule } from '@nestjs/testing';
import { FinancialEntriesController } from './financial-entries.controller';
import { FinancialEntriesService } from './financial-entries.service';

describe('FinancialEntriesController', () => {
  let controller: FinancialEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialEntriesController],
      providers: [FinancialEntriesService],
    }).compile();

    controller = module.get<FinancialEntriesController>(FinancialEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
