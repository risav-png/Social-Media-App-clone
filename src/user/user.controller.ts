import { Controller,Body,Post, Get, Param } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from './user.service';
import { SignIndto } from './dto/signin.dto';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post("signup")
    async UserSignUp(@Body() authdto:AuthDto){
        return await this.userService.createUser(authdto)
    }

    @Post("signIn")
    async UserSignIn(@Body() signindto:SignIndto){
        return await this.userService.signIn(signindto)
    }

    @Get('fetch/:id')
    async fetchUser(@Param('id')userId:string){
        return await this.userService.fetchUser(userId)
    }
}
