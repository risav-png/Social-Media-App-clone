import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile,OnModuleInit } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as postModel } from './entities/post.entity';
import * as multer from 'multer';
import {FileInterceptor} from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

const storage = multer.diskStorage({
  destination:'./uploads',
  filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});

const upload= multer({storage});

@Controller('post')
export class PostController implements OnModuleInit {
  constructor(private readonly postService: PostService) {}
  onModuleInit() {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Uploads directory created');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file',{storage}))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile()file:Express.Multer.File,
):Promise<any> {
  if(file){
    console.log('Uploaded files:',file);
    createPostDto.file =`uploads/${file.filename}`;
  }
    const createdPost = await this.postService.create(createPostDto);
    return {
      status:'success',
      message:'Post created Successfully',
      data:createdPost,
    };

  }
  catch(error){
    console.error('Error during Post creation',error);
    throw new Error('failed to create Post');
  }


  @Get()
  async findAll():Promise<postModel[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<postModel> {
    return this.postService.findOne(id);
  }
  @Get('user/:userId')
  async findPostByUser(@Param('userId')userId:string):Promise<postModel[]>{
    return this.postService.findPostByUser(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto):Promise<postModel> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<postModel> {
    return this.postService.remove(id);
  }
}
