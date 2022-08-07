import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/comments/infra/CommentRepository';
import { UseCase } from 'src/common/core/presentation/UseCase';
import { DeleteCommentUseCaseRequest } from './dto/DeleteCommentUseCaseRequest';
import { DeleteCommentUseCaseResponse } from './dto/DeleteCommentUseCaseResponse';

@Injectable()
export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(
    id: string,
    boardId: string,
  ): Promise<DeleteCommentUseCaseResponse> {
    await this.commentRepository.deleteComment(id, boardId);
    return { message: '댓글이 삭제되었습니다.' };
  }
}
