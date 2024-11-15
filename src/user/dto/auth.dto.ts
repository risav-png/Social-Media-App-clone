import { IsEmail,IsNotEmpty,MinLength } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @MinLength(8)
    password:string;

}