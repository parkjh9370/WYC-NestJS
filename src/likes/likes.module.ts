import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';
import { UserEntity } from 'src/users/infra/entity/users.entity';
// import { LikesController } from './likes.controller';
import { LikeEntity } from './infra/entity/likes.entity';
import { LikesService } from './application/likes.service';
import { LikesController } from './presentation/likes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BoardEntity, LikeEntity]),
    // forwardRef(() => AuthModule),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [],
})
export class LikesModule {}
