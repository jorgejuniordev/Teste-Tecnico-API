import { Controller, UseGuards, Get } from '@nestjs/common';
import { FinancialEntriesService } from '../financial-entries.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';

@Controller('financial-entries')
@UseGuards(JwtAuthGuard)
export class FinancialEntriesFindAllController {
  constructor(private readonly service: FinancialEntriesService) {}

  @Get()
  findAll() {
    const list = this.service.findAll();
    return list;
  }
}
