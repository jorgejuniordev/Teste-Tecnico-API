import { FinancialCategory } from '../../financial-categories/entities/financial-category.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('financial_entries')
export class FinancialEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  value: number;

  @Column()
  description: string;

  @Column()
  type: 'income' | 'expense';

  @ManyToOne(() => FinancialCategory, (category) => category.entries)
  @JoinColumn({ name: 'category_id' })
  category: FinancialCategory;

  // para acessar diretamente
  @Column({ name: 'category_id' })
  category_id: number;

  @Index()
  @ManyToOne(() => User, (user) => user.entries)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // para acessar diretamente
  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'date_entry' })
  date_entry: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
