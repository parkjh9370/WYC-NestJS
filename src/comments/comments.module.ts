import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { CommentEntity } from './infra/entity/comments.entity';
import { CommentService } from './application/comments.service';
import { CommentsController } from './presentation/comments.controller';
import { CommentRepository } from './infra/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, BoardEntity, UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CommentsController],
  providers: [CommentService, CommentRepository],
  exports: [],
})
export class CommentsModule {}
