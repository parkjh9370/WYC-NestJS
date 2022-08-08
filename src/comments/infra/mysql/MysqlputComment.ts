import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entity/comments.entity';
import { PutCommentRepository } from '../PutCommentRepository';

@Injectable()
export class MysqlputCommentRepository implements PutCommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly putCommentRepository: Repository<CommentEntity>,
  ) {}

  async putComment(id, boardId, data): Promise<void> {
    await this.putCommentRepository
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
}
