export const PUT_COMMENT_REPOSITORY = Symbol('PUT_COMMENT_REPOSITORY');

export interface PutCommentRepository {
  putComment(id, boardId, data): Promise<void>;
}
