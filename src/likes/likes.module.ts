import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from 'src/borads/entities/boards.entity';
import { UserEntity } from 'src/users/users.entity';
import { LikesController } from './likes.controller';
import { LikeEntity } from './likes.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BoardEntity, LikeEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [],
})
export class LikesModule {}
