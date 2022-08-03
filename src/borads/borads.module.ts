import { LocationEntity } from './entities/locations.entity';
import { BoardDataEntity } from './entities/board-datas.entity';
import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entities/boards.entity';
import { BoardsRepository } from './boards.repository';

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
    // UsersService,
    // UsersRepository,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
  exports: [],
})
export class BoradsModule {}
