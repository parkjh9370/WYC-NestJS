import { BoardData, BoardDataProps } from './../domain/BoardData';
import { LocationEntity } from './entities/BoardsLoationDataEntity';
import { BoardEntity } from './entities/BoardEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { BoardDataEntity } from './entities/BoardsDataEntity';
import { Location, SiteInfo } from '../presentation/dto/post.board.request.dto';
import { Board } from '../domain/Board';
import { BoardLocation, BoardLocationProps } from '../domain/BoardLocation';

export const BOARD_BOARDDATA_LOCATION_REPOSITORY = Symbol(
  'BOARD_BOARDDATA_LOCATION_REPOSITORY',
);

export interface BoardRepository {
  saveBoard(
    title: string,
    content: string,
    picture: string,
    location: Location,
    siteInfo: SiteInfo,
    rating: number,
    id,
  ): Promise<string>;
  board(id: string): Promise<any>;
  boardData(id: string): Promise<any>;
  locationData(id: string): Promise<any>;
}

@Injectable()
export class BoardsRepository {
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
  ): Promise<string> {
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
