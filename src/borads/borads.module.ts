import { PostBoardUseCase } from './application/PostBoardUseCase/PostBoardUseCase';
import { LocationEntity } from './infra/entities/locations.entity';
import { BoardDataEntity } from './infra/entities/board-datas.entity';
import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardsController } from './presentation/boards.controller';
import { BoardEntity } from './infra/entities/boards.entity';
import { BoardsRepository } from './infra/boards.repository';
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
  ],
  exports: [],
})
export class BoradsModule {}
