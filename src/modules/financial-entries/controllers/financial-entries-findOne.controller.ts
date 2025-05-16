import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { FinancialEntriesService } from '../financial-entries.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';

@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesFindOneController {
  constructor(private readonly service: FinancialEntriesService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }
}
