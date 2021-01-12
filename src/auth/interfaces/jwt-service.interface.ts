import { JWTPayloadDTO } from '../dto/jwt-payload.dto';

import type {SignOptions, VerifyOptions} from 'jsonwebtoken'
import { JWTResponseDTO } from '../dto/jwt-response.dto';

export interface JWTServiceI {
  getAccessToken: () => string;
  getRefreshToken: () => string;

  createToken: (payload: JWTPayloadDTO) => JWTResponseDTO | Promise<JWTResponseDTO>;
  deleteAccesshToken: (payload: JWTPayloadDTO, token: string) => void;
  deleteRefreshToken: (payload: JWTPayloadDTO, token: string) => void;
  vefiryToken: (token: string, options?: VerifyOptions) => JWTPayloadDTO;
  signInToken: (payload: JWTPayloadDTO, options?: SignOptions) => string;
}
