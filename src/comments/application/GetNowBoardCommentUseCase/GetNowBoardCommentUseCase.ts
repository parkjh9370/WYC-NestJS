import { CommentRepository } from '../../infra/CommentRepository';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/core/presentation/UseCase';
import { GetNowBoardCommentUseCaseRequest } from './dto/GetNowBoardCommentUseCaseRequest';
import { GetNowBoardCommentUseCaseResponse } from './dto/GetNowBoardCommentUseCaseResponse';
import { REGISTER_COMMENT_REPOSITORY } from 'src/comments/infra/RegisterCommentRepository';
import { FindNowBoardCommentsRepository } from 'src/comments/infra/FindNowBoardCommentsRepository';

@Injectable()
export class GetNowBoardCommentUseCase
  implements
    UseCase<
      GetNowBoardCommentUseCaseRequest,
      Promise<GetNowBoardCommentUseCaseResponse[]>
    >
{
  constructor(
    private readonly commentRepository: CommentRepository,
    @Inject(REGISTER_COMMENT_REPOSITORY)
    private readonly findNowBoardCommentsRepository: FindNowBoardCommentsRepository,
  ) {}

  async execute(
    id: GetNowBoardCommentUseCaseRequest,
  ): Promise<GetNowBoardCommentUseCaseResponse[]> {
    const commentQuery = await this.commentRepository.findNowBoardComments(id);

    // try {
    //   const test =
    //     await this.findNowBoardCommentsRepository.findNowBoardComments(id);
    //   console.log(test);
    // } catch (err) {
    //   console.log(err);
    // }

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
