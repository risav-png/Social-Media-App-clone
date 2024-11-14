import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/user/schemas/users.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
