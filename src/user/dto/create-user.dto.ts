import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  role: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
