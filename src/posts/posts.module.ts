import { JWT, JWTSchema } from './../auth/models/jwt.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTService } from './../auth/services/jwt.service';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { Post, PostSchema } from './models/posts.model';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {}
