import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    // caso não tenha usuário, retorna erro
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          statusCode: 401,
          error: 'Não autorizado',
          message: 'Acesso negado. Token inválido ou expirado.',
        })
      );
    }

    // retorna o usuário
    return user;
  }
}
