import { User } from 'src/users/models/user.model';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PostDocument = Document & Post;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    auto: true,
  })
  _id: string;

  @Prop({ type: String, required: [true, 'Title is required!'] })
  title: string;

  @Prop({ type: String, required: [true, 'Body is required!'] })
  body: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: [true, 'Author is required!'],
  })
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
