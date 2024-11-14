import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { compare, hash } from 'bcrypt';
import { SignIndto } from './dto/signin.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService:JwtService
    ) {}

    async createUser(data: AuthDto) {
        try {
            console.log(data);
            const findUser = await this.getUserByEmail({ email: data.email });
            if (findUser) {
                throw new BadRequestException("User already exists");
            }

            const hashedPassword = await hash(data.password, 10);
            console.log(hashedPassword);

            const newUser = new this.userModel({
                email: data.email,
                username:data.username,
                password: hashedPassword
            });
            console.log(newUser, "user");

            await newUser.save();
            return {
                success: true,
                message: 'User created successfully'
            };
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            throw new BadRequestException(err.message);
        }
    }

    async signIn(data:SignIndto){
        try{
            const user = await this.getUserByEmail({email:data.email});
            if(!user){
                throw new UnauthorizedException(`Sorry,Invalid User`);
            }
            const validatePassword = await compare(data.password,user.password);
            if(!validatePassword){
                throw new UnauthorizedException('Sorry,check your password');
            }
            const payload = { email: user.email, sub: user._id };
            const token = this.jwtService.sign(payload);

            return {
                success:true,
                message:'Sign-In successful',
                user,
                token,

            };
        }
        catch(error){
            const err = error as Error;
            console.log(err.message);
            throw new BadRequestException(err.message);

        } 
    }

    async getUserByEmail(query: { email: string }): Promise<UserDocument | null> {
        return this.userModel.findOne(query).exec();
    }

    async fetchUser(userId:string):Promise<UserDocument|null>{
        try{
            const user = await this.userModel.findById(userId).exec();
            if(!user){
                throw new BadRequestException('User not found');
            }
            return user;

        }
        catch(error){
            const err = error as Error;
            console.log(err.message);
            throw new BadRequestException(err.message);
        }

    }
}
