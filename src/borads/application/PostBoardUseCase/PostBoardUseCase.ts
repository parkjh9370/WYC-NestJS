import { BoardDataUseCase } from './dto/PostBoardUseCaseRequest';
import { Injectable } from '@nestjs/common';
import { BoardsRepository } from 'src/borads/infra/boards.repository';

// 추후 UseCase 지정

@Injectable()
export class PostBoardUseCase {
  constructor(private readonly boardsRepository: BoardsRepository) {}
  async execute(id: string, data: BoardDataUseCase) {
    const { title, content, picture, location, siteInfo, rating } = data;
    const board = await this.boardsRepository.saveBoard(
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
