import { hash } from './../utils/hash';
import { JWTService } from './jwt.service';
import { UsersService } from './../../users/users.service';
import { AuthServiceI } from './../interfaces/auth-service.interface';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto';
import { RegistrationDTO } from '../dto/registration.dto';

import { JWTServiceI } from '../interfaces/jwt-service.interface';
import { UserServiceI } from '../../users/interfaces/user-service.interface';

import { compareSync } from 'bcrypt';
import { UserDocument } from 'src/users/models/user.model';

@Injectable()
export class AuthService implements AuthServiceI {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JWTService,
  ) {}

  async login(payload: LoginDTO) {
    const user = await this._userService.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordCorrect = compareSync(
      payload.password,
      user.password.toString(),
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const tokens = await this._jwtService.createToken(user);

    return { tokens, user };
  }

  async registration(payload: RegistrationDTO) {
    const user = await this._userService.getUserByEmail(payload.email);
    if (user) {
      throw new ConflictException('User is existed!');
    }

    const hashPassword = hash(payload.password);

    const userToStorage = { ...payload, password: hashPassword };
    await this._userService.createUser(userToStorage);
  }
  logout() {}
  async getMe(token: string) {
    const decodedToken = this._jwtService.vefiryToken(token);
    if (!decodedToken) {
      throw new ForbiddenException('Token is invalid');
    }

    return await this._userService.getUserByEmail(decodedToken.email, {
      exclude: '-password',
    });
  }
  async changePassword(token: string, newPassword: string) {
    const decodedToken = this._jwtService.vefiryToken(token);
    if (!decodedToken) {
      throw new ForbiddenException('Token is invalid');
    }

    const hashPassword = hash(newPassword);

    await this._userService.updateUser(decodedToken.email, {
      password: hashPassword,
    });
  }
}
