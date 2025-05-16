import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    if (await this.service.emailExists(dto.email)) {
      throw new BadRequestException('Email já cadastrado');
    }
    const user = await this.service.create(dto);
    return {
      message: 'Usuário criado com sucesso',
      user,
    };
  }

  // Não há necessidade do método findAll, pois não usuaremos a listagem de usuários
  @Get()
  async findAll() {
    const exists = await this.service.findAll();
    if (exists.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado');
    }
    return exists;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const exists = await this.service.findOne(id);
    if (!exists) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return exists;
  }

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

  async validateUser(email: string, password: string) {
    const user = await this.service.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida');
    }

    return user;
  }
}
