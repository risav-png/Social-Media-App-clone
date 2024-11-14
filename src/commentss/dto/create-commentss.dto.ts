import {  IsNotEmpty,IsString } from "class-validator";
import { Types } from "mongoose";
export class CreateCommentssDto {
    @IsNotEmpty()
    user:Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsNotEmpty()
    @IsString()
    content:string;
    

}
