import { IsEmail, Min } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;
  @Min(8)
  password: string;
}
