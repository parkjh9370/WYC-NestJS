import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { getRepository, Repository } from 'typeorm';
import { LikeEntity } from '../infra/entity/likes.entity';
import { LikesService } from '../application/likes.service';
import { ApiOperation } from '@nestjs/swagger';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { LikeBoardId } from './dto/likes.dto';

@Controller('likes')
@UseGuards(JwtAuthGuard)
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    @InjectRepository(LikeEntity)
    private readonly likeEntity: Repository<LikeEntity>,
  ) {}

  @ApiOperation({ summary: '현재 게시글 좋아요 유무' })
  @Get(':id')
  async getNowLike(@CurrentUser() user: NowUser, @Param('id') boardId: string) {
    return await this.likesService.isNowBoardLike(user, boardId);
  }

  @ApiOperation({ summary: '좋아요 등록' })
  @Post()
  async addLike(@CurrentUser() user: NowUser, @Body() boardId: LikeBoardId) {
    return await this.likesService.addLike(user, boardId);
  }

  @ApiOperation({ summary: '좋아요 취소' })
  @Delete()
  async deleteLike(@CurrentUser() user: NowUser, @Body() boardId: LikeBoardId) {
    return await this.likesService.deleteLike(user, boardId);
  }
}
