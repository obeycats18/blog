import { IsEmail, Min, Max } from 'class-validator';

export class RegistrationDTO {
  first_name: string;
  last_name: string;

  @Max(25)
  username: string;
  @IsEmail()
  email: string;
  @Min(8)
  password: string;
}
