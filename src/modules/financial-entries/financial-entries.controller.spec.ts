import { Test, TestingModule } from '@nestjs/testing';
import { FinancialEntriesService } from './financial-entries.service';
import { FinancialEntriesCreateController } from './controllers/financial-entries-create.controller';
import { FinancialEntriesFindAllController } from './controllers/financial-entries-findAll.controller';
import { FinancialEntriesFindOneController } from './controllers/financial-entries-findOne.controller';
import { FinancialEntriesFindResumeController } from './controllers/financial-entries-findResume.controller';
import { FinancialEntriesUpdateController } from './controllers/financial-entries-update.controller';
import { FinancialEntriesDeleteController } from './controllers/financial-entries-delete.controller';

describe('FinancialEntriesController', () => {
  let createController: FinancialEntriesCreateController;
  let findAllController: FinancialEntriesFindAllController;
  let findOneController: FinancialEntriesFindOneController;
  let updateController: FinancialEntriesUpdateController;
  let deleteController: FinancialEntriesDeleteController;
  let findResumeController: FinancialEntriesFindResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        FinancialEntriesCreateController,
        FinancialEntriesFindAllController,
        FinancialEntriesFindOneController,
        FinancialEntriesUpdateController,
        FinancialEntriesDeleteController,
        FinancialEntriesFindResumeController,
      ],
      providers: [FinancialEntriesService],
    }).compile();

    createController = module.get<FinancialEntriesCreateController>(
      FinancialEntriesCreateController,
    );

    findAllController = module.get<FinancialEntriesFindAllController>(
      FinancialEntriesFindAllController,
    );

    findOneController = module.get<FinancialEntriesFindOneController>(
      FinancialEntriesFindOneController,
    );

    updateController = module.get<FinancialEntriesUpdateController>(
      FinancialEntriesUpdateController,
    );

    deleteController = module.get<FinancialEntriesDeleteController>(
      FinancialEntriesDeleteController,
    );

    findResumeController = module.get<FinancialEntriesFindResumeController>(
      FinancialEntriesFindResumeController,
    );
  });

  it('should be defined', () => {
    expect(createController).toBeDefined();
    expect(findAllController).toBeDefined();
    expect(findOneController).toBeDefined();
    expect(updateController).toBeDefined();
    expect(deleteController).toBeDefined();
    expect(findResumeController).toBeDefined();
  });
});
