import { Board } from 'src/borads/domain/Board';
import { BoardEntity } from '../../entities/BoardEntity';

export class MysqlBoardBoardDataLoactionRepositoryMapper {
  static toDomainBoard(entity: BoardEntity) {
    return Board.create({
      id: entity.id,
      createdAt: entity.createdAt,
      title: entity.title,
      content: entity.content,
      picture: entity.picture,
      rating: entity.rating,
      user: entity.user,
    });
  }

  static boardDataDomain() {}

  static locationData() {}
}

// 'board.id',
// 'user.nickname',
// 'user.profile',
// 'board.title',
// 'board.content',
// 'board.picture',
// 'board.rating',
// 'board.createdAt',
