import { LocationEntity } from './infra/entities/locations.entity';
import { BoardDataEntity } from './infra/entities/board-datas.entity';
import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardsController } from './presentation/boards.controller';
import { BoardsService } from './application/boards.service';
import { BoardEntity } from './infra/entities/boards.entity';
import { BoardsRepository } from './infra/boards.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      BoardEntity,
      BoardDataEntity,
      LocationEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
  exports: [],
})
export class BoradsModule {}
