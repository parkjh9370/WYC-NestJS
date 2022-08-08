export const DELETE_COMMENT_REPOSITORY = Symbol('DELETE_COMMENT_REPOSITORY');

export interface DeleteCommentRepository {
  deleteComment(id, boardId);
}
