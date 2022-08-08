import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { CommentEntity } from './infra/entity/comments.entity';
import { CommentsController } from './presentation/CommentController';
import { CommentRepository } from './infra/CommentRepository';
import { GetNowBoardCommentUseCase } from './application/GetNowBoardCommentUseCase/GetNowBoardCommentUseCase';
import { PostCommentUseCase } from './application/PostCommentUseCase/PostCommentUseCase';
import { ModifyCommentUseCase } from './application/ModifyCommentUseCase/ModifyCommentUseCase';
import { DeleteCommentUseCase } from './application/DeleteCommentUseCase/DeleteCommentUseCase';
import { REGISTER_COMMENT_REPOSITORY } from './infra/RegisterCommentRepository';
import { MysqlregisterCommentRepository } from './infra/mysql/MysqlregisterComment';
import { PUT_COMMENT_REPOSITORY } from './infra/PutCommentRepository';
import { MysqlputCommentRepository } from './infra/mysql/MysqlputComment';
import { FIND_NOW_BOARD_COMMENT_REPOSITORY } from './infra/FindNowBoardCommentsRepository';
import { MysqlfindNowBoardCommentsRespository } from './infra/mysql/MysqlfindNowBoardCommentsRespository';
import { DELETE_COMMENT_REPOSITORY } from './infra/DeleteCommentRepository';
import { MysqldeleteComment } from './infra/mysql/MysqldeleteComment';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, BoardEntity, UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CommentsController],
  providers: [
    CommentRepository,
    GetNowBoardCommentUseCase,
    PostCommentUseCase,
    ModifyCommentUseCase,
    DeleteCommentUseCase,
    {
      provide: REGISTER_COMMENT_REPOSITORY,
      useClass: MysqlregisterCommentRepository,
    },
    {
      provide: PUT_COMMENT_REPOSITORY,
      useClass: MysqlputCommentRepository,
    },
    {
      provide: FIND_NOW_BOARD_COMMENT_REPOSITORY,
      useClass: MysqlfindNowBoardCommentsRespository,
    },
    {
      provide: DELETE_COMMENT_REPOSITORY,
      useClass: MysqldeleteComment,
    },
  ],
  exports: [],
})
export class CommentsModule {}
