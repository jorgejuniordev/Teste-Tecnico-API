import { Controller, UseGuards, Get, Param, Req } from '@nestjs/common';
import { FinancialEntriesService } from '../financial-entries.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';
@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesFindResumeController {
  constructor(private readonly service: FinancialEntriesService) {}

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
}
