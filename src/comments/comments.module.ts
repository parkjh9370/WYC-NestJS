import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { CommentEntity } from './infra/entity/comments.entity';
import { CommentService } from './application/comments.service';
import { CommentsController } from './presentation/comments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, BoardEntity, UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [],
})
export class CommentsModule {}
