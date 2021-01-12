import { User } from 'src/users/models/user.model';
import { JWTService } from './../auth/services/jwt.service';
import { UpdatePostDTO } from './dto/update-post.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, Post } from './models/posts.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(
    user: User,
    createPostDTO: CreatePostDTO,
  ): Promise<PostDocument> {
    const post = { ...createPostDTO, author: user._id };

    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async getByAuthor(authorID: string): Promise<PostDocument> {
    return this.postModel.findOne({ author: authorID });
  }

  async getById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id);
  }

  async getAll(): Promise<PostDocument[]> {
    return this.postModel.find();
  }

  async getMyself(user: User): Promise<PostDocument> {
    return this.postModel.findOne({ author: user._id });
  }

  async update(
    id: string,
    updatePostDTO: UpdatePostDTO,
  ): Promise<PostDocument> {
    return this.postModel.findByIdAndUpdate(id, updatePostDTO);
  }

  async delete(id: string): Promise<PostDocument> {
    return this.postModel.findByIdAndDelete(id);
  }
}
