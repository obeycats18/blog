import { JWTResponseDTO } from './../dto/jwt-response.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { JWTDocument, JWT } from '../models/jwt.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JWTServiceI } from '../interfaces/jwt-service.interface';

import * as jwt from 'jsonwebtoken';
import { JWTPayloadDTO } from '../dto/jwt-payload.dto';

@Injectable()
export class JWTService implements JWTServiceI {
  private accessToken: string;
  private refreshToken: string;

  constructor(
    @InjectModel(JWT.name) private _jwtModel: Model<JWTDocument>,
    private readonly _configService: ConfigService,
  ) {}

  private readonly ACCESS_EXPIRES_TIME = this._configService.get<number>(
    'ACCESS_TOKEN_EXPIRES_TIME',
  );
  private readonly REFRESH_EXPIRES_TIME = this._configService.get<number>(
    'REFRESH_TOKEN_EXPIRES_TIME',
  );
  private readonly SECRET_KEY = this._configService.get<string>(
    'TOKEN_SECRET_KEY',
  );

  async createToken(payload: JWTPayloadDTO) {
    const jwtPayload = {
      _id: payload._id,
      email: payload.email,
      username: payload.username,
    };

    this.accessToken = this.signInToken(jwtPayload, {
      expiresIn: this.REFRESH_EXPIRES_TIME,
    });
    this.refreshToken = this.signInToken(jwtPayload, {
      expiresIn: this.ACCESS_EXPIRES_TIME,
    });

    const tokens: JWTResponseDTO = {
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
    };

    await this._jwtModel.updateOne(
      { uID: jwtPayload._id },
      { access_token: this.accessToken, refresh_token: this.refreshToken },
      { upsert: true, omitUndefined: true },
    );

    return tokens;
  }
  deleteAccesshToken(payload: JWTPayloadDTO, token: any) {}
  deleteRefreshToken(payload: JWTPayloadDTO, token: any) {}

  vefiryToken(token: string, options?: jwt.VerifyOptions) {
    const decodedToken = jwt.verify(token, this.SECRET_KEY) as JWTPayloadDTO;

    return decodedToken;
  }

  signInToken(payload: JWTPayloadDTO, options?: jwt.SignOptions) {
    const token = jwt.sign(payload, this.SECRET_KEY, {
      expiresIn: options.expiresIn || this.ACCESS_EXPIRES_TIME,
    });
    return token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }
}
