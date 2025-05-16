import { Injectable } from '@nestjs/common';
import { CreateFinancialEntryDto } from './dto/create-financial-entry.dto';
import { UpdateFinancialEntryDto } from './dto/update-financial-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialEntry } from './entities/financial-entry.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class FinancialEntriesService {
  constructor(
    @InjectRepository(FinancialEntry)
    private readonly repository: Repository<FinancialEntry>,
  ) {}

  async create(createFinancialEntryDto: CreateFinancialEntryDto) {
    const financialEntry = this.repository.create(createFinancialEntryDto);
    return this.repository.save(financialEntry);
  }

  findAll() {
    return this.repository.find({
      relations: ['user', 'category'],
    });
  }

  findResume(startDate: Date, endDate: Date, userId: number) {
    return this.repository.find({
      relations: ['user', 'category'],
      where: {
        user: { id: userId },
        date_entry: Between(startDate, endDate),
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateFinancialEntryDto: UpdateFinancialEntryDto) {
    const financialEntry = this.repository.create(updateFinancialEntryDto);
    return this.repository.update(id, financialEntry);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
