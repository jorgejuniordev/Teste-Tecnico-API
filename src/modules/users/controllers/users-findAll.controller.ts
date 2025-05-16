import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersFindAllController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll() {
    const exists = await this.service.findAll();
    if (exists.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }
    return exists;
  }
}
