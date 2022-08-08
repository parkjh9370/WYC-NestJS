import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entity/comments.entity';
import { RegisterCommentRepository } from '../RegisterCommentRepository';

@Injectable()
export class MysqlregisterCommentRepository
  implements RegisterCommentRepository
{
  constructor(
    @InjectRepository(CommentEntity)
    private readonly registerCommentRepository: Repository<CommentEntity>,
  ) {}

  async registerComment(id, boardId, comment): Promise<void> {
    await this.registerCommentRepository.save({
      user: id,
      board: boardId,
      comment: comment,
    });
  }
}
