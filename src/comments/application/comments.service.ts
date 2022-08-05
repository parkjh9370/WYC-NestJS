import { Injectable } from '@nestjs/common';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { CommentRepository } from '../infra/comments.repository';
import { CommentBody } from '../presentation/dto/comment.request.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getNowBoardComment(id: string) {
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

  async postComment(users: NowUser, id: string, body: CommentBody) {
    const { comment } = body;
    await this.commentRepository.registerComment(users, id, comment);
    return { mesasage: '댓글 등록이 완료되었습니다.' };
  }

  async modifyComment(user: NowUser, id: string, data: CommentBody) {
    await this.commentRepository.putComment(user, id, data);
    return { message: '댓글 수정 완료' };
  }

  async deleteComment(user: NowUser, id: string) {
    await this.commentRepository.deleteComment(user, id);
    return { message: '댓글이 삭제되었습니다.' };
  }
}
