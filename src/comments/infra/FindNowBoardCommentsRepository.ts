export const FIND_NOW_BOARD_COMMENT_REPOSITORY = Symbol(
  'FIND_NOW_BOARD_COMMENT_REPOSITORY',
);

export interface FindNowBoardCommentsRepository {
  findNowBoardComment(id: string);
}
