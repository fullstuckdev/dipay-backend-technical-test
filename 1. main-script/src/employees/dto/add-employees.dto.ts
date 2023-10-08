import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmpty,
  IsEnum,
} from 'class-validator';
import { Company } from '../../company/schemas/company.schema';
import { JobTitle } from '../schemas/employees.schema';


export class EmployeeAdd {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  readonly phone_number: string

  @IsNotEmpty()
  @IsEnum(JobTitle, { message: 'Please enter correct category.' })
  readonly jobtitle: JobTitle;

  @IsEmpty({ message: 'You cannot pass company id' })
  readonly company_id: Company;
}
