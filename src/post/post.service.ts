import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model, Types } from 'mongoose';
import { Post } from './entities/post.entity';


@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name)private postModel:Model<Post>){}

  async create(createPostDto: CreatePostDto):Promise<Post> {
    console.log('Creating Post with PostDto',createPostDto);
    if(!Types.ObjectId.isValid(createPostDto.author)){
      throw new BadRequestException('Invalid Author Id');
    }
    const newPost = new this.postModel(createPostDto);
    return newPost.save();

  }


  async findAll():Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string):Promise<Post> {
    const findPost = await (await this.postModel.findById(id));
    if(!findPost){
      throw new NotFoundException(`post with ${id} not found`);

    }

    return findPost;
  }


  async update(id:string, updatePostDto: UpdatePostDto):Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id,updatePostDto,{
      new:true,

    }).exec();
    if(!updatedPost){
      throw new NotFoundException(`Post with ${id} not found`);
    }
    return updatedPost;
  }

  async findPostByUser(userId:string):Promise<Post[]>{
    if(!Types.ObjectId.isValid(userId)){
      throw new BadRequestException('Invalid user Id');
    }
    return this.postModel.find({author:userId}).exec();

  }


    remove(id: string):Promise<Post> {

    const deletedPost =this.postModel.findByIdAndDelete(id).exec();
    if(!deletedPost){
      throw new NotFoundException(`Post with ${id} not found`);
    }
    return null
  }
}
