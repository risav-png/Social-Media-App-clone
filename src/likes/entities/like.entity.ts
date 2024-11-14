import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { Types,Document } from "mongoose";
import { Post } from "src/post/entities/post.entity";
import { Comment } from "src/commentss/entities/commentss.entity";

@Schema({timestamps:true})
export class Like extends Document{
    @Prop({required:true})
    user:Types.ObjectId;

    @Prop({required:true, enum:['post','comment']})
    content:string;

    @Prop({type:Types.ObjectId, ref:'Post',required:false})
    post:Types.ObjectId;

    @Prop({type:Types.ObjectId,ref:'Comment',required:false})
    comment:Types.ObjectId;

    @Prop({required:true,enum:['like','wow','angry','sad','laughing']})
    reaction:string;
    


}

export const LikeSchema = SchemaFactory.createForClass(Like);
