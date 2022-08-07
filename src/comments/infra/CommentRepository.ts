import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { getRepository, Repository } from 'typeorm';
import { CommentEntity } from './entity/comments.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async findNowBoardComments(id: string) {
    return await getRepository(CommentEntity)
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
  }

  async registerComment(id, boardId, comment): Promise<void> {
    await this.commentsRepository.save({
      user: id,
      board: boardId,
      comment: comment,
    });
  }

  async putComment(id, boardId, data): Promise<void> {
    await getRepository(CommentEntity)
      .createQueryBuilder()
      .update({
        comment: data.comment,
      })
      .where({
        user: id,
        id: boardId,
      })
      .execute();
  }

  async deleteComment(id, boardId) {
    return await getRepository(CommentEntity)
      .createQueryBuilder()
      .delete()
      .where({
        user: id,
        id: boardId,
      })
      .execute();
  }
}
