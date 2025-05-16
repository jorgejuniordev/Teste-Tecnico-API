import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FinancialEntriesService } from '../financial-entries.service';
import { CreateFinancialEntryDto } from '../dto/create-financial-entry.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';
import { FinancialCategoriesService } from '../../financial-categories/financial-categories.service';

@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesCreateController {
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
}
