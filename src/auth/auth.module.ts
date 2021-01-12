import { JWTService } from './services/jwt.service';
import { AuthService } from './services/auth.service';
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

import { User, UserSchema } from 'src/users/models/user.model';
import { JWT, JWTSchema } from './models/jwt.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: JWT.name, schema: JWTSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTService, UsersService],
})
export class AuthModule {}
