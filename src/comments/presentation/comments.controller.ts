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
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { getRepository, Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';
import { CommentEntity } from '../infra/entity/comments.entity';
import { CommentService } from '../application/comments.service';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentEntity: Repository<CommentEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntity: Repository<BoardEntity>,
    private readonly commentsService: CommentService,
  ) {}

  // 현재 게시글 댓글 정보 불러오기
  @Get(':id')
  async getComment(@Param('id') id) {
    // const boardQuery = await getRepository(BoardEntity)
    // .createQueryBuilder('board')
    // .where({ id: id })
    // .select([
    //   'board.id',
    //   'user.nickname',
    //   'user.profile',
    //   'board.title',
    //   'board.content',
    //   'board.picture',
    //   'board.rating',
    //   'board.createdAt',
    // ])
    // .leftJoin('board.user', 'user')
    // .getOne();

    const commentQuery = await getRepository(CommentEntity)
      .createQueryBuilder('comment')
      .where({ board: id })
      .select([
        'comment.id',
        'comment.comment',
        'comment.createdAt',
        'comment.updatedAt',
        'user.nickname',
        'user.id',
        'user.profile',
      ])
      .leftJoin('comment.user', 'user')
      .orderBy({ 'comment.createdAt': 'DESC' })
      .getMany();

    // console.log(commentQuery);

    const comment = commentQuery.map((comment) => {
      return {
        id: comment.id,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        comment: comment.comment,
        userId: comment.user.id,
        nickname: comment.user.nickname,
        profile: comment.user.profile,
      };
    });

    return comment;
  }

  // 댓글 등록
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async postComment(@CurrentUser() users, @Param('id') id, @Body() body) {
    // console.log(users.id);
    const { comment } = body;

    await this.commentEntity.save({
      //   board: id,
      user: users.id,
      board: id,
      comment: comment,
    });

    return 'hi';
  }

  // 댓글 수정
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async putComment(@CurrentUser() user, @Param('id') id: string, @Body() data) {
    // console.log(data.comment);
    // console.log(id);
    //   const findComment = await this.commentEntity.update(
    //     comment: data.comment,
    // );
    // console.log(findComment);
    // findComment.comment = data.comment;
    // await this.commentEntity.save(findComment);

    const putComment = await getRepository(CommentEntity)
      .createQueryBuilder()
      .update({
        comment: data.comment,
      })
      .where({
        user: user.id,
        id: id,
      })
      .execute();

    return { message: '댓글 수정 완료' };
  }

  // 댓글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@CurrentUser() user, @Param('id') id: string) {
    const deleteComment = await getRepository(CommentEntity)
      .createQueryBuilder()
      .delete()
      .where({
        user: user.id,
        id: id,
      })
      .execute();
    return { message: '댓글이 삭제되었습니다.' };
  }
}
