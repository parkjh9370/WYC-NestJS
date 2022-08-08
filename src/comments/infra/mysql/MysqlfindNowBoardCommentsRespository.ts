import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entity/comments.entity';
import { FindNowBoardCommentsRepository } from '../FindNowBoardCommentsRepository';

@Injectable()
export class MysqlfindNowBoardCommentsRespository
  implements FindNowBoardCommentsRepository
{
  constructor(
    @InjectRepository(CommentEntity)
    private readonly findNowBoardCommentRespository: Repository<CommentEntity>,
  ) {}

  async findNowBoardComments(id: string) {
    return await this.findNowBoardCommentRespository
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

  async test() {
    console.log('any');
    return;
  }
}
