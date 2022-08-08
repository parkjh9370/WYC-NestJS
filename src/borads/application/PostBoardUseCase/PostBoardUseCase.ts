import { BoardDataUseCase } from './dto/PostBoardUseCaseRequest';
import { Inject, Injectable } from '@nestjs/common';
import {
  BoardRepository,
  BOARD_BOARDDATA_LOCATION_REPOSITORY,
} from 'src/borads/infra/BoardRepository';

// 추후 UseCase 지정

@Injectable()
export class PostBoardUseCase {
  constructor(
    @Inject(BOARD_BOARDDATA_LOCATION_REPOSITORY)
    private readonly boardRepository: BoardRepository,
  ) {}
  async execute(id: string, data: BoardDataUseCase) {
    const { title, content, picture, location, siteInfo, rating } = data;
    const board = await this.boardRepository.saveBoard(
      title,
      content,
      picture,
      location,
      siteInfo,
      rating,
      id,
    );

    return { boardId: board, message: '게시물 생성이 완료되었습니다.' };
  }
}

//   @Injectable()
// export class PostBoardUseCase
//   implements UseCase<BoardDataUseCase, PostBoardUseCaseResponse>
// {
//   constructor(private readonly boardsRepository: BoardsRepository) {}

//   async execute(id: any, data: BoardDataUseCase) {
//     const { title, content, picture, location, siteInfo, rating } = data;
//     const board = await this.boardsRepository.saveBoard(
//       title,
//       content,
//       picture,
//       location,
//       siteInfo,
//       rating,
//       id,
//     );
//     return { boardId: board, message: '게시물 생성이 완료되었습니다.' };
//   }
// }
