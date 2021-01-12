import { User, UserDocument } from './../../users/models/user.model';
export class LoginResponseDTO {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  user: UserDocument;
}
