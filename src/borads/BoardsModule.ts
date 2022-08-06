import { MysqlBoardBoardDataLoactionRepository } from './infra/mysql/MysqlBoardBoardDataLoactionRepository';
import { PostBoardUseCase } from './application/PostBoardUseCase/PostBoardUseCase';
import { LocationEntity } from './infra/entities/BoardsLoationDataEntity';
import { BoardDataEntity } from './infra/entities/BoardsDataEntity';
import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardsController } from './presentation/BoardsController';
import { BoardEntity } from './infra/entities/BoardEntity';
import {
  BoardsRepository,
  BOARD_BOARDDATA_LOCATION_REPOSITORY,
} from './infra/BoardRepository';
import { UploadedBoardPathUseCase } from './application/UploadedBoardPathUseCase/UploadedBoardPathUseCase';
import { GetDetailBoardDataUseCase } from './application/GetDetailBoardData/GetDetailBoardDataUseCase';

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
  providers: [
    BoardsRepository,
    UploadedBoardPathUseCase,
    PostBoardUseCase,
    GetDetailBoardDataUseCase,
    {
      provide: BOARD_BOARDDATA_LOCATION_REPOSITORY,
      useClass: MysqlBoardBoardDataLoactionRepository,
    },
  ],
  exports: [],
})
export class BoradsModule {}
