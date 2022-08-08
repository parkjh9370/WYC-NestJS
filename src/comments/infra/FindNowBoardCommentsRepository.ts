import { CommentEntity } from './entity/comments.entity';

export const FIND_NOW_BOARD_COMMENT_REPOSITORY = Symbol(
  'FIND_NOW_BOARD_COMMENT_REPOSITORY',
);

export interface FindNowBoardCommentsRepository {
  findNowBoardComments(id);
  test();
}
