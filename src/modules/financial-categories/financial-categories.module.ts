import { Module } from '@nestjs/common';
import { FinancialCategoriesService } from './financial-categories.service';
import { FinancialCategory } from './entities/financial-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { FinancialCategoriesCreateController } from './controllers/financial-categories-create.controller';
import { FinancialCategoriesFindAllController } from './controllers/financial-categories-findAll.controller';
import { FinancialCategoriesFindOneController } from './controllers/financial-categories-findOne.controller';
import { FinancialCategoriesUpdateController } from './controllers/financial-categories-update.controller';
import { FinancialCategoriesDeleteController } from './controllers/financial-categories-delete.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialCategory]), UsersModule],
  controllers: [
    FinancialCategoriesCreateController,
    FinancialCategoriesFindAllController,
    FinancialCategoriesFindOneController,
    FinancialCategoriesUpdateController,
    FinancialCategoriesDeleteController,
  ],
  providers: [FinancialCategoriesService],
  exports: [FinancialCategoriesService],
})
export class FinancialCategoriesModule {}
