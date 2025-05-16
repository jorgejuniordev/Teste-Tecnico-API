import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FinancialCategoriesService } from '../financial-categories.service';
import { CreateFinancialCategoryDto } from '../dto/create-financial-category.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('financial-categories')
@UseGuards(JwtAuthGuard)
export class FinancialCategoriesCreateController {
  constructor(
    private readonly financialCategoriesService: FinancialCategoriesService,
  ) {}

  @Post()
  create(
    @Body() createFinancialCategoryDto: CreateFinancialCategoryDto,
    @Req() req: Request,
  ) {
    // pega o user_id do usuário logado
    const user = req.user as { userId: number };

    // insere o user_id no createFinancialCategoryDto
    createFinancialCategoryDto.user_id = user.userId;

    return this.financialCategoriesService.create(createFinancialCategoryDto);
  }
}
