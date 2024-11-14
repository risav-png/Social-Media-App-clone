import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
import { Like } from './entities/like.entity';
import { User } from 'src/user/schemas/users.schema';
import { Comment } from 'src/commentss/entities/commentss.entity';

@Injectable()
export class LikesService {

  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Like.name) private readonly likeModel: Model<Like>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    const { user, content, postId, reaction } = createLikeDto;

    
    const existingUser = await this.userModel.findById(user);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

   
    let target: Post | Comment;

    if (content === 'Post') {
      target = await this.postModel.findById(postId);
    } else if (content === 'Comment') {
      target = await this.commentModel.findById(postId);
    } else {
      throw new Error('Invalid content type');
    }

    if (!target) {
      throw new NotFoundException(`${content} not found`);
    }

    
    const existingReaction = await this.likeModel.findOne({ user, post: postId });

    if (existingReaction) {
      if (existingReaction.reaction === reaction) {
        await this.likeModel.deleteOne({ _id: existingReaction._id });
        return { message: 'Reaction removed successfully' };
      } else {
        existingReaction.reaction = reaction;
        await existingReaction.save();
        return existingReaction;
      }
    } else {
   
      const like = new this.likeModel({
        user,
        content,
        post: postId,
        reaction
      });
      await like.save();
      return like;
    }
  }

  async getReactionsForPost(postId: string) {
    const reactions = await this.likeModel
      .find({ post: postId })
      .populate('user', 'username');

    if (!reactions || reactions.length === 0) {
      throw new NotFoundException('No reactions found for this post');
    }

    return reactions;
  }
}
