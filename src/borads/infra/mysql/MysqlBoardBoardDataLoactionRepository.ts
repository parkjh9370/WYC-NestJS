import { InjectRepository } from '@nestjs/typeorm';
import {
  Location,
  SiteInfo,
} from 'src/borads/presentation/dto/post.board.request.dto';
import { Repository } from 'typeorm';
import { BoardRepository } from '../BoardRepository';
import { BoardEntity } from '../entities/BoardEntity';
import { BoardDataEntity } from '../entities/BoardsDataEntity';
import { LocationEntity } from '../entities/BoardsLoationDataEntity';

export class MysqlBoardBoardDataLoactionRepository implements BoardRepository {
  constructor(
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
    id,
  ) {
    const board = await this.boardEntitiy
      .save({
        user: id,
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
    await this.boardEntitiy
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
    await this.boardDataEntity.findOne({
      where: { board: id },
    });
  }

  async locationData(id: string) {
    await this.LocationEntity.findOne({
      where: { board: id },
    });
  }
}