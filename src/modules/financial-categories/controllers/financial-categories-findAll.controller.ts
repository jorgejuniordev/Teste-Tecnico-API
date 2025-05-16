import { Controller, UseGuards, Req, Get } from '@nestjs/common';
import { FinancialCategoriesService } from '../financial-categories.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('financial-categories')
@UseGuards(JwtAuthGuard)
export class FinancialCategoriesFindAllController {
  constructor(
    private readonly financialCategoriesService: FinancialCategoriesService,
  ) {}

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as { userId: number };
    return this.financialCategoriesService.findAllByUserAndNull(user.userId);
  }
}
