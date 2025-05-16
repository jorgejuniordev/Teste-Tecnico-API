import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { FinancialCategoriesService } from './financial-categories.service';
import { CreateFinancialCategoryDto } from './dto/create-financial-category.dto';
import { UpdateFinancialCategoryDto } from './dto/update-financial-category.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('financial-categories')
@UseGuards(JwtAuthGuard)
export class FinancialCategoriesController {
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

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as { userId: number };
    return this.financialCategoriesService.findAllByUserAndNull(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.financialCategoriesService.findOneByUserAndNull(
      id,
      user.userId,
    );
  }

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

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.financialCategoriesService.removeByUser(id, user.userId);
  }
}
