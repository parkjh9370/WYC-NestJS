import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/comments/infra/CommentRepository';
import { PostCommentUseCaseResponse } from './dto/PostCommentUseCaseResponse';

interface Comment {
  comment: string;
}

@Injectable()
export class PostCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(
    id: string,
    boardId: string,
    body: Comment,
  ): Promise<PostCommentUseCaseResponse> {
    const { comment } = body;
    await this.commentRepository.registerComment(id, boardId, comment);
    return { mesasage: '댓글 등록이 완료되었습니다.' };
  }
}
