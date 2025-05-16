import {
  Controller,
  UseGuards,
  Req,
  Param,
  NotFoundException,
  Body,
  Patch,
} from '@nestjs/common';
import { FinancialCategoriesService } from '../financial-categories.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';
import { UpdateFinancialCategoryDto } from '../dto/update-financial-category.dto';

@Controller('financial-categories')
@UseGuards(JwtAuthGuard)
export class FinancialCategoriesUpdateController {
  constructor(
    private readonly financialCategoriesService: FinancialCategoriesService,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFinancialCategoryDto: UpdateFinancialCategoryDto,
    @Req() req: Request,
  ) {
    const user = req.user as { userId: number };

    // verifica se o usuário é o dono da categoria
    const category = await this.financialCategoriesService.findOneByUserAndNull(
      id,
      user.userId,
    );

    // caso não tenha categoria, retorna erro
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return this.financialCategoriesService.update(
      id,
      updateFinancialCategoryDto,
    );
  }
}
