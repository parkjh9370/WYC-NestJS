import { LocationEntity } from './entities/locations.entity';
import { BoardEntity } from './entities/boards.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../users/users.entity';
import { BoardDataEntity } from './entities/board-datas.entity';

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
    title,
    content,
    picture,
    location,
    siteInfo,
    rating,
    user,
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
}
