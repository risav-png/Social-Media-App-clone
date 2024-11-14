import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentssService } from './commentss.service';
import { CreateCommentssDto } from './dto/create-commentss.dto';
import { UpdateCommentssDto } from './dto/update-commentss.dto';
import { Comment } from './entities/commentss.entity';

@Controller('comments')
export class CommentssController {
  constructor(private readonly commentssService: CommentssService) {}

  @Post()
  create(@Body() createCommentssDto: CreateCommentssDto): Promise<Comment> {
    return this.commentssService.create(createCommentssDto);
  }

  @Get()
  findAll() {
    return this.commentssService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentssService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentssDto: UpdateCommentssDto) {
    return this.commentssService.update(id, updateCommentssDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentssService.remove(id);
  }
}
