import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Juan', description: 'Nombre completo' })
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Perez', description: 'Primer apellido' })
  lastname: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  role: string;
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
