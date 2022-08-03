import { LocationEntity } from './entities/locations.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { BoardEntity } from './entities/boards.entity';
import { BoardDataEntity } from './entities/board-datas.entity';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntitiy: Repository<BoardEntity>,
    @InjectRepository(BoardDataEntity)
    private readonly boardDataEntity: Repository<BoardDataEntity>,
    @InjectRepository(LocationEntity)
    private readonly LocationEntity: Repository<LocationEntity>,
    private readonly boardsRepository: BoardsRepository,
  ) {}

  // async uploadImg(cat: UserEntity, files: Express.Multer.File[]) {
  //   // console.log('dd');
  //   // console.log(files);
  //   const fileName = `cats/${files[0].filename}`;
  //   console.log(fileName);
  //   console.log(fileName);
  //   // const newCat = await this.catsRepository.findByIdAndUpdateImg(
  //   //   cat.id,
  //   //   fileName,
  //   // );
  //   // console.log(newCat);
  //   return 'hi';
  // }

  async postBoard(user, data) {
    const { title, content, picture, location, siteInfo, rating } = data;
    const board = await this.boardsRepository.saveBoard(
      title,
      content,
      picture,
      location,
      siteInfo,
      rating,
      user.id,
    );
    console.log(board);
    // return;
    return { boardId: board, message: '게시물 생성이 완료되었습니다.' };
  }
}
