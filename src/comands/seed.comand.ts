import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FinancialCategory } from '../modules/financial-categories/entities/financial-category.entity';

@Injectable()
@Command({ name: 'seed', description: 'Seed the database with initial data' })
export class SeedCommand extends CommandRunner {
  constructor(private dataSource: DataSource) {
    super();
  }

  async run(): Promise<void> {
    try {
      await this.seedUsers();
      await this.seedCategories();
    } catch (error) {
      console.error('erro:', error);
    } finally {
      await this.dataSource.destroy();
    }
  }

  private async seedUsers() {
    const userRepository = this.dataSource.getRepository(User);

    const name = 'Admin';
    const email = 'admin@admin.com';
    const password = '123456';

    // Verifica se já existe um usuário com o email padrão
    const existingUser = await userRepository.findOneBy({
      email: email,
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const defaultUser = userRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      await userRepository.save(defaultUser);
      console.log('Usuário administrador geral criado com sucesso!');
    } else {
      console.log('Usuário administrador geral já existe!');
    }
  }

  private async seedCategories() {
    const categoryRepository = this.dataSource.getRepository(FinancialCategory);

    const categories = [
      {
        name: 'Alimentação',
        description: 'Gastos com alimentação',
      },
      {
        name: 'Transporte',
        description: 'Gastos com transporte',
      },
      {
        name: 'Salário',
        description: 'Gastos com salário',
      },
    ];

    // Verifica se as categorias já existem
    const existingCategories = await categoryRepository.find({
      where: {
        name: In(categories.map((category) => category.name)),
      },
    });

    // Filtra as categorias que não existem
    const categoriesToCreate = categories.filter(
      (category) => !existingCategories.some((c) => c.name === category.name),
    );

    // Cria as categorias que não existem
    if (categoriesToCreate.length > 0) {
      await categoryRepository.save(categoriesToCreate);
      console.log('Categorias criadas com sucesso!');
    } else {
      console.log('Categorias já existem!');
    }
  }
}
