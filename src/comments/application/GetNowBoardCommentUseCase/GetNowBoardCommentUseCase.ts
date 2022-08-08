import { CommentRepository } from '../../infra/CommentRepository';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/core/presentation/UseCase';
import { GetNowBoardCommentUseCaseRequest } from './dto/GetNowBoardCommentUseCaseRequest';
import { GetNowBoardCommentUseCaseResponse } from './dto/GetNowBoardCommentUseCaseResponse';
import { REGISTER_COMMENT_REPOSITORY } from 'src/comments/infra/RegisterCommentRepository';
import { MysqlfindNowBoardCommentsRespository } from 'src/comments/infra/mysql/MysqlfindNowBoardCommentsRespository';

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
    private readonly mysqlfindNowBoardCommentsRepository: MysqlfindNowBoardCommentsRespository,
  ) {}

  async execute(
    id: GetNowBoardCommentUseCaseRequest,
  ): Promise<GetNowBoardCommentUseCaseResponse[]> {
    const commentQuery = await this.commentRepository.findNowBoardComments(id);
    const commentQuery1 =
      await this.mysqlfindNowBoardCommentsRepository.findNowBoardComment(id);
    // console.log(commentQuery1);

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
