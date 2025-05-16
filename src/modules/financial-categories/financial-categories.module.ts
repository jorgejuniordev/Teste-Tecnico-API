import { Module } from '@nestjs/common';
import { FinancialCategoriesService } from './financial-categories.service';
import { FinancialCategoriesController } from './financial-categories.controller';
import { FinancialCategory } from './entities/financial-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialCategory]), UsersModule],
  controllers: [FinancialCategoriesController],
  providers: [FinancialCategoriesService],
  exports: [FinancialCategoriesService],
})
export class FinancialCategoriesModule {}
