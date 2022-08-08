export const REGISTER_COMMENT_REPOSITORY = Symbol(
  'REGISTER_COMMENT_REPOSITORY',
);

export interface RegisterCommentRepository {
  registerComment(id, boardId, comment): Promise<void>;
}
