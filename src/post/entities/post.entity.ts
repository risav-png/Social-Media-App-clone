import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { User } from "src/user/schemas/users.schema";
import { Comment } from "src/commentss/entities/commentss.entity";

@Schema({timestamps:true})
export class Post extends Document {
    @Prop({required:true})
    content:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    author:User;

    @Prop()
    file?:string;

    @Prop({default:Date.now})
    createdAt:Date;

}

export const PostSchema =SchemaFactory.createForClass(Post);
