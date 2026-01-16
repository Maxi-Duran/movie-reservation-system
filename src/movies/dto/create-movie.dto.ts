import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  image: string;
}
