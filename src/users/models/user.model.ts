import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Roles } from 'src/auth/enums/role.enum';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id: string;

  @Prop({ type: String, required: [true, 'First Name is required!'] })
  first_name: string;

  @Prop({ type: String, required: [true, 'Last Name is required!'] })
  last_name: string;

  @Prop({ type: String, required: [true, 'Username is required!'] })
  username: string;

  @Prop({ type: String, required: [true, 'Email is required!'] })
  email: string;

  @Prop({ type: String, required: [true, 'Password is required!'] })
  password: string;

  @Prop({ type: String, required: [true, 'Role is required!'] })
  roles: Roles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
