import { IsNotEmpty, IsEmail,MinLength } from "class-validator";

export class SignIndto{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)
    password:string;
}
