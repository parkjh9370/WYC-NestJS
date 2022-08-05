import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ListService } from '../application/lists.service';
import { boardListQuery } from './dto/getBoard.request.dto';

@Controller('main')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class ListsController {
  constructor(private readonly listService: ListService) {}

  @ApiOperation({ summary: '게시글 불러오기 (전체, 카테고리)' })
  @Get()
  async mainBoard(@Query() query: boardListQuery) {
    return await this.listService.getMainBoard(query);
  }
}
