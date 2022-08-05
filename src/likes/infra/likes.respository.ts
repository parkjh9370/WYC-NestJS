import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { getRepository, Repository } from 'typeorm';
import { LikeEntity } from './entity/likes.entity';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeEntity: Repository<LikeEntity>,
  ) {}

  async isLike(user, boardId) {
    await this.likeEntity.findOne({
      where: {
        user: user.id,
        board: boardId,
      },
    });
  }

  async addLike(user, id) {
    await this.likeEntity.save({
      user: user.id,
      board: id,
    });
  }

  async deleteLike(user, id) {
    await this.likeEntity.delete({
      user: user.id,
      board: id,
    });
  }
}
