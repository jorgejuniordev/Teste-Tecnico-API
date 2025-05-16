import { Injectable } from '@nestjs/common';
import { CreateFinancialCategoryDto } from './dto/create-financial-category.dto';
import { UpdateFinancialCategoryDto } from './dto/update-financial-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialCategory } from './entities/financial-category.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class FinancialCategoriesService {
  constructor(
    @InjectRepository(FinancialCategory)
    private readonly repository: Repository<FinancialCategory>,
  ) {}

  create(createFinancialCategoryDto: CreateFinancialCategoryDto) {
    const financialCategory = this.repository.create(
      createFinancialCategoryDto,
    );
    return this.repository.save(financialCategory);
  }

  findAllByUserAndNull(user_id: number) {
    return this.repository.find({
      where: [{ user_id }, { user_id: IsNull() }],
      order: {
        id: 'ASC',
      },
    });
  }

  findAll() {
    return this.repository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  findOneByUserAndNull(id: number, user_id: number) {
    return this.repository.findOneBy([
      {
        id: id,
        user_id: user_id,
      },
      {
        id: id,
        user_id: IsNull(),
      },
    ]);
  }

  update(id: number, updateFinancialCategoryDto: UpdateFinancialCategoryDto) {
    return this.repository.update(id, updateFinancialCategoryDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  removeByUser(id: number, user_id: number) {
    return this.repository.softDelete({
      id: id,
      user_id: user_id,
    });
  }
}
