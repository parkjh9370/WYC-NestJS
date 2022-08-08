import { UseCase } from 'src/common/core/presentation/UseCase';
import { Inject, Injectable } from '@nestjs/common';
import { ModifyCommentUseCaseResponse } from './dto/ModifyCommentUseCaseResponse';
import {
  PutCommentRepository,
  PUT_COMMENT_REPOSITORY,
} from 'src/comments/infra/PutCommentRepository';

interface Comment {
  comment: string;
}

@Injectable()
export class ModifyCommentUseCase {
  constructor(
    @Inject(PUT_COMMENT_REPOSITORY)
    private readonly putCommentRepository: PutCommentRepository,
  ) {}

  async execute(
    id: string,
    boardId: string,
    data: Comment,
  ): Promise<ModifyCommentUseCaseResponse> {
    await this.putCommentRepository.putComment(id, boardId, data);
    return { message: '댓글 수정 완료' };
  }
}
