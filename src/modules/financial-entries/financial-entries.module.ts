import { Module } from '@nestjs/common';
import { FinancialEntriesService } from './financial-entries.service';
import { FinancialEntriesController } from './financial-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialEntry } from './entities/financial-entry.entity';
import { FinancialCategoriesModule } from '../financial-categories/financial-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialEntry]),
    FinancialCategoriesModule,
  ],
  controllers: [FinancialEntriesController],
  providers: [FinancialEntriesService],
  exports: [FinancialEntriesService],
})
export class FinancialEntriesModule {}
