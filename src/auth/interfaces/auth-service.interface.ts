import { RegistrationDTO } from './../dto/registration.dto';
import { LoginResponseDTO } from './../dto/login-response.dto';
import { LoginDTO } from './../dto/login.dto';
import { User, UserDocument } from 'src/users/models/user.model';

export interface AuthServiceI {
  login: (payload: LoginDTO) => LoginResponseDTO | Promise<LoginResponseDTO>;
  registration: (payload: RegistrationDTO) => void;
  logout: () => void;
  getMe: (token: string) => User | Promise<User>;
  changePassword: (token: string, newPassword: string) => void;
}
