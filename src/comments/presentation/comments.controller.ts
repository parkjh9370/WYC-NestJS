import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CommentService } from '../application/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { CommentBody } from './dto/comment.request.dto';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentService) {}

  @ApiOperation({ summary: '현재 댓글 정보 불러오기 ' })
  @Get(':id')
  async getComment(@Param('id') id: string) {
    return this.commentsService.getNowBoardComment(id);
  }

  @ApiOperation({ summary: '댓글 등록 ' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async postComment(
    @CurrentUser() users: NowUser,
    @Param('id') id: string,
    @Body() body: CommentBody,
  ) {
    return this.commentsService.postComment(users, id, body);
  }

  @ApiOperation({ summary: '댓글 수정 ' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async putComment(
    @CurrentUser() user: NowUser,
    @Param('id') id: string,
    @Body() data: CommentBody,
  ) {
    return await this.commentsService.modifyComment(user, id, data);
  }

  @ApiOperation({ summary: '댓글 삭제 ' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@CurrentUser() user: NowUser, @Param('id') id: string) {
    return await this.commentsService.deleteComment(user, id);
  }
}
