import { isNotEmpty, IsNotEmpty,IsString } from "class-validator";
import { Types } from "mongoose";
export class CreateLikeDto {
    @IsNotEmpty()
    user:Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    @IsString()
    reaction:string;
    

}

