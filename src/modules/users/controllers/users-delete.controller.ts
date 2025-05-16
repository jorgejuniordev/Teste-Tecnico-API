import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersDeleteController {
  constructor(private readonly service: UsersService) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const exists = await this.service.findOne(id);
    if (!exists) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.service.remove(id);
    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
