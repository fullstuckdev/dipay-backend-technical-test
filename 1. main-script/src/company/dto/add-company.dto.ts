import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CompanyAddDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly company_name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  readonly telephone_number: string | null;

  @IsBoolean()
  readonly is_active: boolean = false;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  readonly address: string;
}
