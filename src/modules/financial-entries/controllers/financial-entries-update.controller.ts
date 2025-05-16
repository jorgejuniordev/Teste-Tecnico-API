import {
  Controller,
  UseGuards,
  Param,
  Patch,
  Body,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { FinancialEntriesService } from '../financial-entries.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';
import { UpdateFinancialEntryDto } from '../dto/update-financial-entry.dto';

@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesUpdateController {
  constructor(private readonly service: FinancialEntriesService) {}

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
}
