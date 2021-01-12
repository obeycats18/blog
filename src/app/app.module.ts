import { PostsModule } from './../posts/posts.module';
import { AuthModule } from './../auth/auth.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const DATABASE_HOST = configService.get<string>('DATABASE_HOST');
        const DATABASE_NAME = configService.get<string>('DATABASE_NAME');
        const DATABASE_CONNECTION_TIME_OUT = configService.get<number>(
          'DATABASE_CONNECTION_TIME_OUT',
        );

        return {
          uri: `mongodb://${DATABASE_HOST}/${DATABASE_NAME}`,
          connectTimeoutMS: DATABASE_CONNECTION_TIME_OUT,
        };
      },
    }),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
