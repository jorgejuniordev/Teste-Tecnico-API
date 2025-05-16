import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateController } from './controllers/users-create.controller';
import { UsersFindAllController } from './controllers/users-findAll.controller';
import { UsersFindOneController } from './controllers/users-findOne.controller';
import { UsersUpdateController } from './controllers/users-update.controller';
import { UsersDeleteController } from './controllers/users-delete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    UsersCreateController,
    UsersFindAllController,
    UsersFindOneController,
    UsersUpdateController,
    UsersDeleteController,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
