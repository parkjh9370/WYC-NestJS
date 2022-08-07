import { CommentRepository } from '../../infra/CommentRepository';
import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/core/presentation/UseCase';
import { GetNowBoardCommentUseCaseRequest } from './dto/GetNowBoardCommentUseCaseRequest';
import { GetNowBoardCommentUseCaseResponse } from './dto/GetNowBoardCommentUseCaseResponse';

@Injectable()
export class GetNowBoardCommentUseCase
  implements
    UseCase<
      GetNowBoardCommentUseCaseRequest,
      Promise<GetNowBoardCommentUseCaseResponse[]>
    >
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(
    id: GetNowBoardCommentUseCaseRequest,
  ): Promise<GetNowBoardCommentUseCaseResponse[]> {
    const commentQuery = await this.commentRepository.findNowBoardComments(id);

    const comment = commentQuery.map((comment) => {
      return {
        id: comment.id,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        comment: comment.comment,
        userId: comment.user.id,
        nickname: comment.user.nickname,
        profile: comment.user.profile,
      };
    });

    return comment;
  }
}
