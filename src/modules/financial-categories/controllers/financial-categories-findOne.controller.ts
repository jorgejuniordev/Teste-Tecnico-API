import { Controller, UseGuards, Req, Get, Param } from '@nestjs/common';
import { FinancialCategoriesService } from '../financial-categories.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('financial-categories')
@UseGuards(JwtAuthGuard)
export class FinancialCategoriesFindOneController {
  constructor(
    private readonly financialCategoriesService: FinancialCategoriesService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.financialCategoriesService.findOneByUserAndNull(
      id,
      user.userId,
    );
  }
}
