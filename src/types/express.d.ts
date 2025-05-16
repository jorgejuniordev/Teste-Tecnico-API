import { User } from '../users/entities/user.entity'; // Ajuste o caminho

declare global {
  namespace Express {
    interface Request {
      user?: User; // Ou o tipo do seu usuário
    }
  }
}
