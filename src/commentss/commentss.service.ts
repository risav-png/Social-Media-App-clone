import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { CreateCommentssDto } from './dto/create-commentss.dto';
import { UpdateCommentssDto } from './dto/update-commentss.dto';
import { Comment } from './entities/commentss.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/schemas/users.schema';

@Injectable()
export class CommentssService {
  constructor(@InjectModel(Comment.name) private readonly commentModel:Model<Comment>,
              @InjectModel(Post.name) private readonly postModel:Model<Post>,
              @InjectModel(User.name) private readonly userModel:Model<User>,
){}
  async create(createCommentssDto: CreateCommentssDto) {
    try {
      const {postId,content,user}= createCommentssDto;
      const existingUser = await this.userModel.findById(user);

      if(!existingUser){
        throw new NotFoundException('Sorry User not found');
      }
      const comment = new this.commentModel({
        user,
        post:postId,
        content,
      });
      await comment.save();

      const post = await this.postModel.findById(postId);
      if(post){
       // post.comments.push(comment.id);
        await post.save();

      } else {
        throw new Error('Post not saved');
      }
      return comment;

    }
    catch (error){
      throw new Error(error.message);
    }
  
  }

  findAll() {
    return this.commentModel.find().exec();
  }

  async findOne(id: string) {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: string, updateCommentssDto: UpdateCommentssDto) {
    const updatedComment = await this.commentModel.findByIdAndUpdate(id, updateCommentssDto, { new: true }).exec();
    if (!updatedComment) {
      throw new NotFoundException('Comment not found');
    }
    return updatedComment;
  }

  async remove(id: string) {
    const result = await this.commentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Comment not found');
    }
    return { message: 'Comment deleted successfully' };
  }
}