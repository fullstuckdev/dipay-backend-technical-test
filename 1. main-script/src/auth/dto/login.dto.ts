import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly password: string;
}
