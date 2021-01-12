import { User, UserDocument } from './models/user.model';
import {
  SelectOptions,
  UserServiceI,
} from './interfaces/user-service.interface';
import { Injectable } from '@nestjs/common';
import { RegistrationDTO } from 'src/auth/dto/registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService implements UserServiceI {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string, options?: SelectOptions) {
    const user = await this._userModel
      .findOne({ email })
      .select(options ? options.exclude : '');
    return user;
  }
  async createUser(payload: RegistrationDTO) {
    const createdUser = new this._userModel(payload);
    return createdUser.save();
  }
  async updateUser(email: string, payload: any) {
    await this._userModel.updateOne({ email }, payload);
  }
  async deleteUser(email: string) {
    await this._userModel.deleteOne({ email });
  }
}
