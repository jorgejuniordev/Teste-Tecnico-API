import { ThrottlerGuard } from '@nestjs/throttler';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    // retorna o erro de limite de requisições
    throw new HttpException(
      {
        statusCode: 429,
        error: 'Limite de Requisições Excedido',
        message: 'Você fez muitas requisições em um curto período. Por favor, aguarde e tente novamente mais tarde.',
      },
      429,
    );
  }
}
