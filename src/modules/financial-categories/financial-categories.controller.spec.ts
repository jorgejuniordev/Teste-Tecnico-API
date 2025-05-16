import { Test, TestingModule } from '@nestjs/testing';
import { FinancialCategoriesController } from './financial-categories.controller';
import { FinancialCategoriesService } from './financial-categories.service';

describe('FinancialCategoriesController', () => {
  let controller: FinancialCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialCategoriesController],
      providers: [FinancialCategoriesService],
    }).compile();

    controller = module.get<FinancialCategoriesController>(FinancialCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
