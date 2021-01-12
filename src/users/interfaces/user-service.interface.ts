import { User } from './../models/user.model';
import { RegistrationDTO } from './../../auth/dto/registration.dto';

export type SelectOptions = {
  exclude?: string;
};

export interface UserServiceI {
  getUserByEmail: (
    email: string,
    options?: SelectOptions,
  ) => User | Promise<User>;
  createUser: (payload: RegistrationDTO) => User | Promise<User>;
  deleteUser: (email: string) => void;
  updateUser: (email: string, payload: any) => void;
}
