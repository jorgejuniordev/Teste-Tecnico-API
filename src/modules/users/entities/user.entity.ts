import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { FinancialCategory } from '../../financial-categories/entities/financial-category.entity';
import { FinancialEntry } from '../../financial-entries/entities/financial-entry.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => FinancialCategory, (category) => category.user)
  categories: FinancialCategory[];

  @OneToMany(() => FinancialEntry, (entry) => entry.user)
  entries: FinancialEntry[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
