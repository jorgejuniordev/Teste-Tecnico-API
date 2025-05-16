import {
  Controller,
  Patch,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersUpdateController {
  constructor(private readonly service: UsersService) {}

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const user = await this.service.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.service.emailExistsWithDifferentId(
        dto.email, // Usa o novo email do DTO
        id,
      );

      if (emailExists) {
        throw new BadRequestException('Email já cadastrado');
      }
    }

    await this.service.update(id, dto);

    return {
      message: 'Usuário atualizado com sucesso',
      user: await this.service.findOne(id), // Retorna os dados atualizados
    };
  }
}
