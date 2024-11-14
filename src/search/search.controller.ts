import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { query } from 'express';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users')
  async searchUsers(@Query('query')query:string){
    return this.searchService.searchUsers(query);
  }
}
