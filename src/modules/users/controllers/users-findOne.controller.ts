import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersFindOneController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const exists = await this.service.findOne(id);
    if (!exists) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return exists;
  }
}
