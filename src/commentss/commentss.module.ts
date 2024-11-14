import { Module} from '@nestjs/common';
import { CommentssService } from './commentss.service';
import { CommentssController } from './commentss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment,CommentSchema } from './entities/commentss.entity';
import {Post, PostSchema } from 'src/post/entities/post.entity';
import { User, UserSchema } from 'src/user/schemas/users.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Comment.name,schema:CommentSchema},
    {name:Post.name,schema:PostSchema},
    {name:User.name, schema:UserSchema}
  ])
],
  controllers: [CommentssController],
  providers: [CommentssService],
})
export class CommentssModule {}
