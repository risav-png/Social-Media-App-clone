import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,Types} from "mongoose";

export type UserDocument =HydratedDocument<User>;

@Schema({timestamps:true, toJSON:{
    transform(doc,ret,options){
        delete ret["password"]

    },
}})
export class User{
    @Prop({required: true, unique:true })
    email:string;

    @Prop({required:true,unique:true})
    username:string;
    
    @Prop({required:true})
    password:string;

    @Prop({required:false})
    avatar:string;

    @Prop({required:false})
    bio:string;

    @Prop()
    profilePicture:string;

    @Prop({type:[String],default:[]})
    friends:string[];

}
export const UserSchema = SchemaFactory.createForClass(User);

