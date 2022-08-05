import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { Repository } from 'typeorm';
import { LikeEntity } from '../infra/entity/likes.entity';
import { LikeRepository } from '../infra/likes.respository';
import { LikeBoardId } from '../presentation/dto/likes.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeEntity: Repository<LikeEntity>,
    private readonly likeRepository: LikeRepository,
  ) {}

  async isNowBoardLike(user: NowUser, boardId: string) {
    let like = false;
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

  async addLike(user: NowUser, boardId: LikeBoardId) {
    const { id } = boardId;
    await this.likeRepository.addLike(user, id);
    return { message: `좋아요 추가했습니다.` };
  }

  async deleteLike(user: NowUser, boardId: LikeBoardId) {
    const { id } = boardId;

    await this.likeRepository.deleteLike(user, id);
    return { message: `좋아요 삭제했습니다.` };
  }
}
