import { LocationEntity } from 'src/borads/infra/entities/locations.entity';
import {
  Body,
  Query,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utills/multer.options';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardsService } from '../application/boards.service';
import { BoardDataEntity } from '../infra/entities/board-datas.entity';
import { BoardEntity } from '../infra/entities/boards.entity';
import { getManager, getRepository, Repository } from 'typeorm';

@Controller('boards')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntitiy: Repository<BoardEntity>,
    @InjectRepository(BoardDataEntity)
    private readonly boardEntity: Repository<BoardDataEntity>,
    @InjectRepository(LocationEntity)
    private readonly LocationEntity: Repository<LocationEntity>,
    private readonly authService: AuthService,
    private readonly boardsService: BoardsService,
  ) {}

  @ApiOperation({ summary: '장소 이미지 업로드' })
  // 프론트에서 전송해주는 키 이름으로 인자 설정,
  // 사진 업로드 갯수 제한
  // 파일 업로드 조건(upload/cats 라는 폴더에 사진 파일 저장)
  @UseInterceptors(FileInterceptor('image', multerOptions('image')))
  // @UseGuards(JwtAuthGuard)
  @Post('img')
  uploadBoardImg(@UploadedFile() files: Express.Multer.File) {
    return { location: `http://localhost:8000/media/image/${files.filename}` };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postBoard(@CurrentUser() user, @Body() data) {
    // console.log(user);
    // console.log(data);
    return this.boardsService.postBoard(user, data);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDetailBoard(@CurrentUser() user, @Param('id') id: string) {
    // console.log(id);

    // const entityManager = getManager();
    // const [data] = await entityManager.query(
    //   // `select * from boards B join users U on B.userId = U.id where B.id = ${id}`,
    //   // `select * from boards B join users U on B.userId = U.id`,
    //   `select * from boards where id = ${id}`,
    // );
    // console.log(data);

    // const board = getRepository(BoardEntity)
    //   .createQueryBuilder('board')
    //   .leftJoinAndSelect('board.userId', 'userId')
    //   .where('board.id = :id', { id })
    //   .getOne();

    // const board = await getRepository(BoardEntity)
    //   .createQueryBuilder('board')
    //   .where('board.id = :id', { id: id })
    //   .getOne();

    // const board = await getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.boards', 'boards')
    //   .where('boards.id = :id', { id: id })
    //   .getOne();
    // console.log(board);

    const boardQuery = await getRepository(BoardEntity)
      .createQueryBuilder('board')
      .where({ id: id })
      .select([
        'board.id',
        'user.nickname',
        'user.profile',
        'board.title',
        'board.content',
        'board.picture',
        'board.rating',
        'board.createdAt',
      ])
      .leftJoin('board.user', 'user')
      .getOne();

    const board = {
      ...boardQuery,
      nickname: `${boardQuery.user.nickname}`,
      profile: `${boardQuery.user.profile}`,
    };

    // console.log(board);

    const boardData = await getRepository(BoardDataEntity).findOne({
      where: { board: id },
    });

    const findLocation = await getRepository(LocationEntity).findOne({
      where: { board: id },
    });

    // console.log(findLocation);

    const location = {
      id: findLocation.id,
      latitude: parseFloat(findLocation.latitude),
      longitude: parseFloat(findLocation.longitude),
      roadAdd: findLocation.roadAdd,
      lotAdd: findLocation.lotAdd,
    };

    return { board, boardData, location, message: '게시물을 가져왔습니다.' };
  }
}
