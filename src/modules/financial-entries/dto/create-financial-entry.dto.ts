import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFinancialEntryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: 'income' | 'expense';

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNumber()
  @IsOptional()
  user_id: number;

  @IsNotEmpty()
  date_entry: Date;
}
