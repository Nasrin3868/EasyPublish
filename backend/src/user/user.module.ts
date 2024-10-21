import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.Strategy';
import { Blog, BlogSchema } from './schema/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.jwt_secret_key ||'9645743868', // Use a secure key and store it in environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [UserService,JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
