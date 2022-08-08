import { Inject, Injectable } from '@nestjs/common';
import {
  DeleteCommentRepository,
  DELETE_COMMENT_REPOSITORY,
} from 'src/comments/infra/DeleteCommentRepository';
import { DeleteCommentUseCaseResponse } from './dto/DeleteCommentUseCaseResponse';

@Injectable()
export class DeleteCommentUseCase {
  constructor(
    @Inject(DELETE_COMMENT_REPOSITORY)
    private readonly deleteCommentRepository: DeleteCommentRepository,
  ) {}

  async execute(
    id: string,
    boardId: string,
  ): Promise<DeleteCommentUseCaseResponse> {
    await this.deleteCommentRepository.deleteComment(id, boardId);
    return { message: '댓글이 삭제되었습니다.' };
  }
}
