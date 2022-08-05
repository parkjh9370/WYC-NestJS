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

  async registerComment(users, id, comment): Promise<void> {
    await this.commentsRepository.save({
      user: users.id,
      board: id,
      comment: comment,
    });
  }

  async putComment(user, id, data): Promise<void> {
    await getRepository(CommentEntity)
      .createQueryBuilder()
      .update({
        comment: data.comment,
      })
      .where({
        user: user.id,
        id: id,
      })
      .execute();
  }

  async deleteComment(user, id) {
    return await getRepository(CommentEntity)
      .createQueryBuilder()
      .delete()
      .where({
        user: user.id,
        id: id,
      })
      .execute();
  }
}
