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
  ],
  exports: [],
})
export class CommentsModule {}
