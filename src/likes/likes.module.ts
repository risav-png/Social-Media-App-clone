import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment,CommentSchema } from 'src/commentss/entities/commentss.entity';
import { Post,PostSchema } from 'src/post/entities/post.entity';
import { User,UserSchema } from 'src/user/schemas/users.schema';
import { Like, LikeSchema } from './entities/like.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Comment.name,schema:CommentSchema},
    {name:Post.name,schema:PostSchema},
    {name:User.name, schema:UserSchema},
    {name:Like.name,schema:LikeSchema},
  ])
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
