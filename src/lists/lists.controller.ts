import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDataEntity } from 'src/borads/infra/entities/board-datas.entity';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';
import { CommentEntity } from 'src/comments/infra/entity/comments.entity';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { LikeEntity } from 'src/likes/infra/entity/likes.entity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { getRepository, Repository } from 'typeorm';

@Controller('main')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class ListsController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntitiy: Repository<BoardEntity>,
    @InjectRepository(BoardDataEntity)
    private readonly boaardDataEntity: Repository<BoardDataEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentEntity: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeEntity: Repository<LikeEntity>,
  ) {}

  @Get()
  async mainBoard(@Query() query) {
    const { category, pages, limit } = query;

    if (category === '전체') {
      const boards = await getRepository(BoardEntity).find({
        relations: ['user', 'comment'],
        skip: (pages - 1) * 12,
        take: limit,
        order: {
          id: 'DESC',
        },
      });

      const boardsId = boards.map((board) => {
        return board.id;
      });

      const counting = [];
      for (let i = 0; i < boardsId.length; i++) {
        const count = await getRepository(LikeEntity).count({
          where: {
            board: boardsId[i],
          },
        });
        counting.push(count);
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['totalLike'] = counting[i];
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['nickname'] = boards[i].user.nickname;
      }

      return boards;
    } else if (category) {
      const boardsData = await getRepository(BoardEntity).find({
        relations: ['user', 'comment', 'boardData'],
        skip: (pages - 1) * 12,
        take: limit,
        order: {
          id: 'DESC',
        },
      });

      const boards = boardsData.filter(
        (board) => board.boardData[0].area === category,
      );

      const boardsId = boards.map((board) => {
        return board.id;
      });

      const counting = [];
      for (let i = 0; i < boardsId.length; i++) {
        const count = await getRepository(LikeEntity).count({
          where: {
            board: boardsId[i],
          },
        });
        counting.push(count);
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['totalLike'] = counting[i];
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['nickname'] = boards[i].user.nickname;
      }

      return boards;
    }
  }
}
