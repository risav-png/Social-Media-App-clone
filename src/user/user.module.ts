import { Inject, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schemas/users.schema';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';


@Module({
imports :[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
JwtModule.registerAsync({
  imports:[ConfigModule],
  useFactory:async(configService:ConfigService)=> ({
    secret:process.env.JWT_SECRET||'default_SECRET_KEY',
    signOptions:{expiresIn:'100m'},

  }),
  inject:[ConfigService]
  
    }),
],
controllers: [UserController],
providers: [UserService],
exports:[MongooseModule,JwtModule],

})
export class UserModule {}
