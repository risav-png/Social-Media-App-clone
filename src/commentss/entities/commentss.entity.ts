import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/schemas/users.schema";
import { Post } from "src/post/entities/post.entity";
import { types } from "util";

@Schema({timestamps:true})
export class Comment extends Document{
    @Prop({required:true,type:Types.ObjectId,ref:User.name})
    user:Types.ObjectId;

    @Prop({required:true})
    content:string;
    
    @Prop({required:true})
    createdAt:Date;

    @Prop({types:Types.ObjectId,ref:Post.name,required:true})
    post:Types.ObjectId;
}
export const CommentSchema =SchemaFactory.createForClass(Comment);

