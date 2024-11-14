import { IsNotEmpty,IsString,IsOptional } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/user/schemas/users.schema";
export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    author:Types.ObjectId;

    @IsOptional()
    @IsString()
    file?: string;
    


}
