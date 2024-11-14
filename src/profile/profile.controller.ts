import { Body, Controller,Get,Param,Put,UseGuards,Req, Post, UseInterceptors, OnModuleInit, UploadedFile, Patch, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/users.schema';
import * as multer from 'multer';
import {FileInterceptor} from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

const storage = multer.diskStorage({
  destination:'./uploads/profileP',
  filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`);
  }

})

const upload = multer({storage});

@Controller('profile')
export class ProfileController implements OnModuleInit {
  constructor(private readonly profileService: ProfileService) {}
  onModuleInit() {
    const uploadDir = path.join(__dirname,'..','..','uploads','ProfilePicture');

    
  }

  @UseGuards(UserService)
  @Patch(':id/uploads')
  @UseInterceptors(FileInterceptor('file',{storage}))
  async uploadProfilePicture (
    @Param('id') userId:string,
    @UploadedFile() file:Express.Multer.File,
  ) {
    console.log(`Recieved request to upload profile picture for user id: ${userId}`);
    if(!file){
      throw new Error('file upload failed');
    }
    const filePath = file.path;
    console.log('=====', filePath)
    await this.profileService.updateProfile(userId,{profilePicture:filePath});
    return{message:'Profile Picture uploaded sucessfully',filePath};
    
  }
  
  @UseGuards(UserService)
  @Get(':id')
  async getUserProfile(@Param('id') userId:string){
    return this.profileService.getUserProfile(userId);
  }

  @UseGuards(UserService)
  @Put(':id')
  async UpdateProfile(@Param('id') userId:string,@Body() updateData:Partial<User>){
    return await this.profileService.updateProfile(userId,updateData);
  }

  @Post(':userId/add-friend/:friendID')
  async addFriend(
    @Param('userId')userId:string,
    @Param('friendId') friendId:string,

  ) {
    return await this.profileService.addFriend(userId,friendId);
  }

  @UseGuards(UserService)
  @Delete(':id/deleteProfilePicture')
  async deleteProfilePicture(@Param('id')userId:string){
    return this.profileService.deleteProfilePicture(userId);
  }

}