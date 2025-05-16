import { CommandFactory } from 'nest-commander';
import { CommandsModule } from './comands/commands.module';

async function bootstrap() {
  await CommandFactory.run(CommandsModule, ['warn', 'error']);
}

bootstrap();
