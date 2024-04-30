import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class JWTAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
