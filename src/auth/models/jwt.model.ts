import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JWTDocument = Document & JWT;

@Schema({ timestamps: true })
export class JWT {
  @Prop({ type: String, required: [true, 'User ID is required!'] })
  uID: string;

  @Prop({ type: String, required: [true, 'Acess Token is required!'] })
  access_token: string;

  @Prop({ type: String, required: [true, 'Refresh Token is required!'] })
  refresh_token: string;
}

export const JWTSchema = SchemaFactory.createForClass(JWT);
