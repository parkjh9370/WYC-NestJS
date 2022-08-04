import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardDataEntity } from 'src/borads/entities/board-datas.entity';
import { BoardEntity } from 'src/borads/entities/boards.entity';
import { CommentEntity } from 'src/comments/comments.entity';
import { LikeEntity } from 'src/likes/likes.entity';
import { UserEntity } from 'src/users/users.entity';
import { ListsController } from './lists.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BoardEntity,
      BoardDataEntity,
      CommentEntity,
      LikeEntity,
    ]),
  ],
  controllers: [ListsController],
})
export class ListsModule {}
