import { Test, TestingModule } from '@nestjs/testing';
import { FinancialCategoriesController } from './financial-categories.controller';
import { FinancialCategoriesService } from './financial-categories.service';
import { FinancialCategoriesCreateController } from './controllers/financial-categories-create.controller';
import { FinancialCategoriesFindAllController } from './controllers/financial-categories-findAll.controller';
import { FinancialCategoriesFindOneController } from './controllers/financial-categories-findOne.controller';
import { FinancialCategoriesUpdateController } from './controllers/financial-categories-update.controller';
import { FinancialCategoriesDeleteController } from './controllers/financial-categories-delete.controller';

describe('FinancialCategoriesController', () => {
  let createController: FinancialCategoriesCreateController;
  let findAllController: FinancialCategoriesFindAllController;
  let findOneController: FinancialCategoriesFindOneController;
  let updateController: FinancialCategoriesUpdateController;
  let deleteController: FinancialCategoriesDeleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        FinancialCategoriesCreateController,
        FinancialCategoriesFindAllController,
        FinancialCategoriesFindOneController,
        FinancialCategoriesUpdateController,
        FinancialCategoriesDeleteController,
      ],
      providers: [FinancialCategoriesService],
    }).compile();

    createController = module.get<FinancialCategoriesCreateController>(
      FinancialCategoriesCreateController,
    );

    deleteController = module.get<FinancialCategoriesDeleteController>(
      FinancialCategoriesDeleteController,
    );

    findAllController = module.get<FinancialCategoriesFindAllController>(
      FinancialCategoriesFindAllController,
    );

    findOneController = module.get<FinancialCategoriesFindOneController>(
      FinancialCategoriesFindOneController,
    );

    updateController = module.get<FinancialCategoriesUpdateController>(
      FinancialCategoriesUpdateController,
    );
  });

  it('should be defined', () => {
    expect(createController).toBeDefined();
    expect(deleteController).toBeDefined();
    expect(findAllController).toBeDefined();
    expect(findOneController).toBeDefined();
    expect(updateController).toBeDefined();
  });
});
