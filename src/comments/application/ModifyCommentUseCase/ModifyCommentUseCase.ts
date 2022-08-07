import { UseCase } from 'src/common/core/presentation/UseCase';
import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/comments/infra/CommentRepository';
import { ModifyCommentUseCaseResponse } from './dto/ModifyCommentUseCaseResponse';

interface Comment {
  comment: string;
}

@Injectable()
export class ModifyCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(
    id: string,
    boardId: string,
    data: Comment,
  ): Promise<ModifyCommentUseCaseResponse> {
    await this.commentRepository.putComment(id, boardId, data);
    return { message: '댓글 수정 완료' };
  }
}
