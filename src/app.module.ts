import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentssModule } from './commentss/commentss.module';
import { LikesModule } from './likes/likes.module';
import { ProfileModule } from './profile/profile.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './search/search.module';




@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://<UserName>:<Password>"),UserModule,PostModule,
   
    CommentssModule,
    LikesModule,
    ProfileModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads','profilePicture'),
      serveRoot:'./uploads/profilePicture',
    }),
    ConfigModule.forRoot(),
    SearchModule,
    
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
