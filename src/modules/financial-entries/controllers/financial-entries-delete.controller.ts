import { Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { FinancialEntriesService } from '../financial-entries.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';

@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesDeleteController {
  constructor(private readonly service: FinancialEntriesService) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
