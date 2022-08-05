import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';
import { LikeEntity } from 'src/likes/infra/entity/likes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardEntitiy: Repository<BoardEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeEntity: Repository<LikeEntity>,
  ) {}

  async allBoardFind(pages, limit) {
    return await this.boardEntitiy.find({
      relations: ['user', 'comment'],
      skip: (pages - 1) * 12,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async allBoardCount(boardsId, i) {
    return this.likeEntity.count({
      where: {
        board: boardsId[i],
      },
    });
  }

  async categoryBoardFind(pages, limit) {
    return await this.boardEntitiy.find({
      relations: ['user', 'comment', 'boardData'],
      skip: (pages - 1) * 12,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async categoryBoardCount(boardsId, i) {
    await this.likeEntity.count({
      where: {
        board: boardsId[i],
      },
    });
  }
}
