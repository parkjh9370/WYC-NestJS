import { LocationEntity } from './entities/locations.entity';
import { BoardEntity } from './entities/boards.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../../users/infra/entity/users.entity';
import { BoardDataEntity } from './entities/board-datas.entity';
import { Location, SiteInfo } from '../presentation/dto/post.board.request.dto';
import { NowUser } from 'src/auth/dto/user.validated.dto';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntitiy: Repository<BoardEntity>,
    @InjectRepository(BoardDataEntity)
    private readonly boardDataEntity: Repository<BoardDataEntity>,
    @InjectRepository(LocationEntity)
    private readonly LocationEntity: Repository<LocationEntity>,
  ) {}

  async saveBoard(
    title: string,
    content: string,
    picture: string,
    location: Location,
    siteInfo: SiteInfo,
    rating: number,
    user: NowUser,
  ): Promise<string> {
    const board = await this.boardEntitiy
      .save({
        user,
        title,
        content,
        picture,
        rating,
      })
      .then((board) => {
        this.boardDataEntity.save({
          board,
          area: siteInfo.area,
          wifi: siteInfo.internet,
          parking: siteInfo.parking,
          electricity: siteInfo.electronic,
          toiletType: siteInfo.toilet,
        });
        this.LocationEntity.save({
          board,
          latitude: location.latitude,
          longitude: location.longitude,
          roadAdd: location.roadAdd,
          lotAdd: location.lotAdd,
        });
        return board;
      });

    return board.id;
  }

  async board(id: string) {
    return await getRepository(BoardEntity)
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
  }

  async boardData(id: string) {
    return await getRepository(BoardDataEntity).findOne({
      where: { board: id },
    });
  }

  async locationData(id: string) {
    return await getRepository(LocationEntity).findOne({
      where: { board: id },
    });
  }
}
