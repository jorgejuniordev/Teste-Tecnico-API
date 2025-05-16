import { Module } from '@nestjs/common';
import { FinancialEntriesService } from './financial-entries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialEntry } from './entities/financial-entry.entity';
import { FinancialCategoriesModule } from '../financial-categories/financial-categories.module';
import { FinancialEntriesCreateController } from './controllers/financial-entries-create.controller';
import { FinancialEntriesFindAllController } from './controllers/financial-entries-findAll.controller';
import { FinancialEntriesFindOneController } from './controllers/financial-entries-findOne.controller';
import { FinancialEntriesUpdateController } from './controllers/financial-entries-update.controller';
import { FinancialEntriesDeleteController } from './controllers/financial-entries-delete.controller';
import { FinancialEntriesFindResumeController } from './controllers/financial-entries-findResume.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialEntry]),
    FinancialCategoriesModule,
  ],
  controllers: [
    FinancialEntriesCreateController,
    FinancialEntriesFindAllController,
    FinancialEntriesFindOneController,
    FinancialEntriesUpdateController,
    FinancialEntriesDeleteController,
    FinancialEntriesFindResumeController,
  ],
  providers: [FinancialEntriesService],
  exports: [FinancialEntriesService],
})
export class FinancialEntriesModule {}
