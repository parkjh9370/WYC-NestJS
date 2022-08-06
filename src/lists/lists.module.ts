import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardDataEntity } from 'src/borads/infra/entities/BoardsDataEntity';
import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';
import { CommentEntity } from 'src/comments/infra/entity/comments.entity';
import { LikeEntity } from 'src/likes/infra/entity/likes.entity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { ListService } from './application/lists.service';
import { ListRepository } from './infra/lists.repository';
import { ListsController } from './presentation/lists.controller';

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
  providers: [ListService, ListRepository],
})
export class ListsModule {}
