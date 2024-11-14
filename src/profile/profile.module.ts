import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserSchema,User } from 'src/user/schemas/users.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),UserModule],
  controllers: [ProfileController],
  providers: [ProfileService, UserService],
})
export class ProfileModule {}
