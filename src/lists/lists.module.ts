import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardDataEntity } from 'src/borads/infra/entities/board-datas.entity';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';
import { CommentEntity } from 'src/comments/infra/entity/comments.entity';
import { LikeEntity } from 'src/likes/infra/entity/likes.entity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
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
