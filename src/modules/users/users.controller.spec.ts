import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersCreateController } from './controllers/users-create.controller';
import { UsersFindAllController } from './controllers/users-findAll.controller';
import { UsersFindOneController } from './controllers/users-findOne.controller';
import { UsersUpdateController } from './controllers/users-update.controller';
import { UsersDeleteController } from './controllers/users-delete.controller';

describe('UsersController', () => {
  let createUser: UsersCreateController;
  let findAllController: UsersFindAllController;
  let findOneController: UsersFindOneController;
  let updateController: UsersUpdateController;
  let deleteController: UsersDeleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        UsersCreateController,
        UsersFindAllController,
        UsersFindOneController,
        UsersUpdateController,
        UsersDeleteController,
      ],
      providers: [UsersService],
    }).compile();

    createUser = module.get<UsersCreateController>(UsersCreateController);

    findAllController = module.get<UsersFindAllController>(
      UsersFindAllController,
    );

    findOneController = module.get<UsersFindOneController>(
      UsersFindOneController,
    );

    updateController = module.get<UsersUpdateController>(UsersUpdateController);

    deleteController = module.get<UsersDeleteController>(UsersDeleteController);
  });

  it('should be defined', () => {
    expect(createUser).toBeDefined();
    expect(findAllController).toBeDefined();
    expect(findOneController).toBeDefined();
    expect(updateController).toBeDefined();
    expect(deleteController).toBeDefined();
  });
});
