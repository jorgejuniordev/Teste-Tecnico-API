import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    // verifica se o usuário existe
    const user = (await this.authService.signIn(dto.email, dto.password)) as {
      id: number;
      email: string;
    };
    return user;
  }
}
