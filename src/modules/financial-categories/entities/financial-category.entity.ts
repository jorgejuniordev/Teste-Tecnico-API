import { IsOptional } from 'class-validator';
import { FinancialEntry } from '../../financial-entries/entities/financial-entry.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('financial_categories')
export class FinancialCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @IsOptional()
  user: User;

  // para acessar diretamente
  @Column({ name: 'user_id', nullable: true })
  @IsOptional()
  user_id: number;

  @OneToMany(() => FinancialEntry, (entry) => entry.category)
  entries: FinancialEntry[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
