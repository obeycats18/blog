import { User as UserModel } from 'src/users/models/user.model';
import { UpdatePostDTO } from './dto/update-post.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { RoleGuard } from './../auth/guards/role.quard';
import { JWTAuthGuard } from './../auth/guards/jwt.guard';
import { PostService } from './posts.service';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/auth/enums/role.enum';
import { Cookie } from 'src/auth/decorators/cookie.decorator';
import { User } from '../auth/decorators/user.decorator';

@UseGuards(JWTAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Role(Roles.Admin)
  @UseGuards(RoleGuard)
  create(@User() user: UserModel, @Body() payload: CreatePostDTO) {
    this.postService.create(user, payload);
    return { message: 'Created Successfully!' };
  }

  @Put(':id')
  @Role(Roles.Admin)
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() payload: UpdatePostDTO) {
    this.postService.update(id, payload);
    return { message: 'Update Successfully!' };
  }

  @Delete(':id')
  @Role(Roles.Admin)
  @UseGuards(RoleGuard)
  delete(@Param('id') id: string) {
    this.postService.delete(id);
    return { message: 'Delete Successfully!' };
  }

  @Get(':authorID')
  @Role(Roles.Admin)
  @UseGuards(RoleGuard)
  getMyself(@User() user: UserModel) {
    return this.postService.getMyself(user);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  @Get(':authorID')
  getByAuthorId(@Param('authorID') authorID: string) {
    return this.postService.getByAuthor(authorID);
  }
}
