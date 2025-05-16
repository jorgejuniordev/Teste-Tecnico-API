import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FinancialEntriesService } from './financial-entries.service';
import { CreateFinancialEntryDto } from './dto/create-financial-entry.dto';
import { UpdateFinancialEntryDto } from './dto/update-financial-entry.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';
import { FinancialCategoriesService } from '../financial-categories/financial-categories.service';

@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesController {
  constructor(
    private readonly service: FinancialEntriesService,
    private readonly categoriesService: FinancialCategoriesService,
  ) {}

  @Post()
  async create(
    @Body() createFinancialEntryDto: CreateFinancialEntryDto,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: number };

    // caso não tenha usuário, retorna erro
    if (!user) {
      throw new BadRequestException('Usuário não autenticado.');
    }

    // verifica se existe a categoria
    const category = await this.categoriesService.findOneByUserAndNull(
      createFinancialEntryDto.category_id,
      user.userId,
    );

    // caso não tenha categoria, retorna erro
    if (!category) {
      throw new BadRequestException('Categoria não encontrada.');
    }

    // insere o user_id no createFinancialEntryDto
    createFinancialEntryDto.user_id = user.userId;

    return this.service.create(createFinancialEntryDto);
  }

  @Get()
  findAll() {
    const list = this.service.findAll();
    return list;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('resume/:startDate/:endDate')
  async findResume(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: number };
    const start = new Date(startDate);
    // insere um time na data de fim para que seja considerado o horário de fim do dia
    const end = new Date(endDate + 'T23:59:59.999Z');

    // pesquisa os registros financeiros
    const list = await this.service.findResume(start, end, user.userId);

    // total de receitas
    const totalIncome = list.reduce((acc, curr) => {
      if (curr.type === 'income') {
        return acc + curr.value;
      }
      return acc;
    }, 0);

    // total de despesas
    const totalExpense = list.reduce((acc, curr) => {
      if (curr.type === 'expense') {
        return acc + curr.value;
      }
      return acc;
    }, 0);

    // calcula o saldo
    const balance = totalIncome - totalExpense;

    return {
      total_income: totalIncome,
      total_expense: totalExpense,
      balance: balance,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFinancialEntryDto: UpdateFinancialEntryDto,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: number };
    const financialEntry = await this.service.findOne(id);

    if (
      financialEntry &&
      (financialEntry.user_id === null ||
        financialEntry.user_id !== user.userId)
    ) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este registro financeiro.',
      );
    }

    return this.service.update(id, updateFinancialEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
