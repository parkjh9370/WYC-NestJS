import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from 'src/borads/entities/boards.entity';
import { UserEntity } from 'src/users/users.entity';
import { CommentsController } from './comments.controller';
import { CommentEntity } from './comments.entity';
import { CommentService } from './comments.service';

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
