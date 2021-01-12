import { Min, Max, IsEmail } from 'class-validator';

export class CreateUserDTO {
  first_name: string;
  last_name: string;

  @Max(25, { message: 'Username must have be less 25!' })
  username: string;

  @IsEmail()
  email: string;

  @Min(8, { message: 'Password must have be more 8!' })
  password: string;
}
