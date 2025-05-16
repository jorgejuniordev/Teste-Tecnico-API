import { Controller, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { FinancialCategoriesService } from '../financial-categories.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('financial-categories')
@UseGuards(JwtAuthGuard)
export class FinancialCategoriesDeleteController {
  constructor(
    private readonly financialCategoriesService: FinancialCategoriesService,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.financialCategoriesService.removeByUser(id, user.userId);
  }
}
