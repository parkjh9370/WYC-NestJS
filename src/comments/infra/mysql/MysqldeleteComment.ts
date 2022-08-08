import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteCommentRepository } from '../DeleteCommentRepository';
import { CommentEntity } from '../entity/comments.entity';

@Injectable()
export class MysqldeleteComment implements DeleteCommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly deleteCommentRepository: Repository<CommentEntity>,
  ) {}

  async deleteComment(id, boardId) {
    return await this.deleteCommentRepository
      .createQueryBuilder()
      .delete()
      .where({
        user: id,
        id: boardId,
      })
      .execute();
  }
}
