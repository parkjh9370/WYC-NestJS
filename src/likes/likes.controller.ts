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
import { LikeEntity } from './likes.entity';
import { LikesService } from './likes.service';
import { getRepository, Repository } from 'typeorm';

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

  // 현재 게시글 좋아요 정보
  @Get(':id')
  async getNotLike(@CurrentUser() user, @Param('id') boardId) {
    // console.log(boardId);
    // console.log(user);
    let like = false;
    getRepository;
    const isLike = await this.likeEntity.findOne({
      where: {
        user: user.id,
        board: boardId,
      },
    });

    if (isLike) {
      like = true;
    }

    return { like, message: '게시글의 좋아요 정보 입니다.' };
  }

  @Post()
  async addLike(@CurrentUser() user, @Body() boardId) {
    // console.log(user);
    // console.log(boardId);
    const { id } = boardId;
    await this.likeEntity.save({
      user: user.id,
      board: id,
    });
    return { message: `좋아요 추가했습니다.` };
  }

  @Delete()
  async deleteLike(@CurrentUser() user, @Body() boardId) {
    const { id } = boardId;

    await this.likeEntity.delete({
      user: user.id,
      board: id,
    });
    return { message: `좋아요 삭제했습니다.` };
  }
}
