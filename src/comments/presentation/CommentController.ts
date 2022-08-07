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
import { ApiOperation } from '@nestjs/swagger';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { CommentBody } from './dto/comment.request.dto';
import { GetNowBoardCommentUseCase } from '../application/GetNowBoardCommentUseCase/GetNowBoardCommentUseCase';
import { PostCommentUseCase } from '../application/PostCommentUseCase/PostCommentUseCase';
import { ModifyCommentUseCase } from '../application/ModifyCommentUseCase/ModifyCommentUseCase';
import { DeleteCommentUseCase } from '../application/DeleteCommentUseCase/DeleteCommentUseCase';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(
    private readonly getNowBoardCommentUseCase: GetNowBoardCommentUseCase,
    private readonly postCommentUseCase: PostCommentUseCase,
    private readonly modifyCommentUseCase: ModifyCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  @ApiOperation({ summary: '현재 댓글 정보 불러오기 ' })
  @Get(':id')
  async getComment(@Param('id') id: string) {
    return this.getNowBoardCommentUseCase.execute(id);
  }

  @ApiOperation({ summary: '댓글 등록 ' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async postComment(
    @CurrentUser() user: NowUser,
    @Param('id') boardId: string,
    @Body() body: CommentBody,
  ) {
    const { id } = user;
    return this.postCommentUseCase.execute(id, boardId, body);
  }

  @ApiOperation({ summary: '댓글 수정 ' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async putComment(
    @CurrentUser() user: NowUser,
    @Param('id') boardId: string,
    @Body() data: CommentBody,
  ) {
    const { id } = user;
    return await this.modifyCommentUseCase.execute(id, boardId, data);
  }

  @ApiOperation({ summary: '댓글 삭제 ' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(
    @CurrentUser() user: NowUser,
    @Param('id') boardId: string,
  ) {
    const { id } = user;
    return await this.deleteCommentUseCase.execute(id, boardId);
  }
}
