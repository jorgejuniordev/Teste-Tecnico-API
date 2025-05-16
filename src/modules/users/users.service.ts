import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.repository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.repository.create(updateUserDto);
    return this.repository.update(id, user);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  emailExists(email: string) {
    return this.repository.findOneBy({ email });
  }

  emailExistsWithDifferentId(email: string, id: number) {
    return this.repository.findOneBy({ email: email, id: Not(id) });
  }
}
