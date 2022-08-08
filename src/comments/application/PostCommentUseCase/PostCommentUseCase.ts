import { Inject, Injectable } from '@nestjs/common';
import {
  RegisterCommentRepository,
  REGISTER_COMMENT_REPOSITORY,
} from 'src/comments/infra/RegisterCommentRepository';
import { PostCommentUseCaseResponse } from './dto/PostCommentUseCaseResponse';

interface Comment {
  comment: string;
}

@Injectable()
export class PostCommentUseCase {
  constructor(
    @Inject(REGISTER_COMMENT_REPOSITORY)
    private readonly registerCommentRepository: RegisterCommentRepository,
  ) {}

  async execute(
    id: string,
    boardId: string,
    body: Comment,
  ): Promise<PostCommentUseCaseResponse> {
    const { comment } = body;
    await this.registerCommentRepository.registerComment(id, boardId, comment);
    return { mesasage: '댓글 등록이 완료되었습니다.' };
  }
}
