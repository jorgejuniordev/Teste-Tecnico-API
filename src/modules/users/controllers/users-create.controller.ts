import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersCreateController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    if (await this.service.emailExists(dto.email)) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    const user = await this.service.create(dto);
    return {
      message: 'Usuário criado com sucesso',
      user,
    };
  }
}
