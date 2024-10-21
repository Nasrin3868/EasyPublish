import { Body, Controller, HttpException, HttpStatus, Param, Post, Get, UploadedFile, UseFilters, UseInterceptors, HttpCode, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { registrationDto } from './dto/registration.dto';
import { responseDto } from './dto/response.dto';
import { HttpStatusCodes } from 'src/common/customStatusCode';
import { CustomHttpExceptionFilter } from 'src/common/customHttpExceptionFilter';
import { verifyOtpDto } from './dto/verifyOtp.dto';
import { loginDto } from './dto/login.dto';
import { blogDto } from './dto/blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { displayBlogDto } from './dto/displayBlog.dto';
import { userDto } from './dto/user.dto';

    @Controller('user')
    @UseFilters(new CustomHttpExceptionFilter)
    export class UserController {
        constructor(
            private readonly _userService:UserService,
        ) {}

        @Post('userRegister')
        async userRegistration(@Body() registrationDto: registrationDto):Promise<responseDto>{
                console.log('user registration controller');
                const response=await this._userService.userRegistration(registrationDto)
                // If the response indicates an error, throw an HttpException
            if (response.status === HttpStatusCodes.BAD_REQUEST) {
                throw new HttpException(response.error, HttpStatus.BAD_REQUEST);
            }else{
                return response
            }
        }
        @Post('verifyOtp')
        async verifyOtp(@Body() verifyOtpDto:verifyOtpDto):Promise<responseDto>{
            console.log('verify otp controller',verifyOtpDto);
            return await this._userService.verifyOtp(verifyOtpDto)
        }
        @Post('login')
        async login(@Body() loginDto:loginDto):Promise<responseDto>{
            console.log('login controller');
            return await this._userService.login(loginDto)
        }
        @Post('refresh-token')
        @HttpCode(HttpStatus.OK)
        async refreshToken(@Body('refreshToken') refreshToken: string) {
          return await this._userService.refreshToken(refreshToken);
        }
        @Post('createBlog')
        async createBlog(@Body() blogDto:blogDto):Promise<responseDto>{
                console.log('createBlog controller',blogDto);
                return await this._userService.createBlog(blogDto)
        }
        @Post('editBlog')
        async editBlog(@Body() blogDto:blogDto):Promise<responseDto>{
                console.log('editBlog controller',blogDto);
                return await this._userService.editBlog(blogDto)
        }
        @Delete('deleteBlog/:blogId')
        async deleteBlog(@Param('blogId') blogId:string):Promise<responseDto>{
                console.log('deleteBlog controller',blogId);
                return await this._userService.deleteBlog(blogId)
        }
        @Get('PersonalBlogs/:userId')
        async PersonalBlogs(@Param('userId') userId:string):Promise<displayBlogDto[]>{
            console.log('PersonalBlogs controller');
            return await this._userService.PersonalBlogs(userId)
        }
        @Get('AllBlogs')
        async AllBlogs():Promise<displayBlogDto[]>{
            console.log('AllBlogs controller');
            return await this._userService.AllBlogs()
        }
        @Get('SingleBlog/:blogId')
        async SingleBlog(@Param('blogId') blogId:string):Promise<displayBlogDto>{
            console.log('SingleBlog controller');
            return await this._userService.SingleBlog(blogId)
        }
        @Get('userDetails/:_id')
        async userDetails(@Param('_id') _id:string):Promise<userDto>{
            console.log('userDetails controller');
            return await this._userService.userDetails(_id)
        }
        @Post('changeProfilePicture')
        async changeProfilePicture(@Body() userDto:userDto):Promise<responseDto>{
            console.log('changeProfilePicture controller');
            return await this._userService.changeProfilePicture(userDto)
        }
        @Post('editUserName')
        async editUserName(@Body() userDto:userDto):Promise<responseDto>{
            console.log('editUserName controller');
            return await this._userService.editUserName(userDto)
        }
        @Post('editUserEmail')
        async editUserEmail(@Body() userDto:userDto):Promise<responseDto>{
            console.log('editUserEmail controller');
            return await this._userService.editUserEmail(userDto)
        }
        @Post('verifyEmail')
        async verifyEmail(@Body() userDto:userDto):Promise<responseDto>{
            console.log('verifyEmail controller');
            return await this._userService.verifyEmail(userDto)
        }
        @Post('newPassword')
        async newPassword(@Body() userDto:userDto):Promise<responseDto>{
            console.log('newPassword controller');
            return await this._userService.newPassword(userDto)
        }
        
    }


