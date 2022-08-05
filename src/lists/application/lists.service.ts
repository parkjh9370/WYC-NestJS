import { Injectable } from '@nestjs/common';
import { ListRepository } from '../infra/lists.repository';
import { boardListQuery } from '../presentation/dto/getBoard.request.dto';

@Injectable()
export class ListService {
  constructor(private readonly ListRepository: ListRepository) {}

  async getMainBoard(query: boardListQuery) {
    const { category, pages, limit } = query;
    if (category === '전체') {
      const boards = await this.ListRepository.allBoardFind(pages, limit);

      const boardsId = boards.map((board) => {
        return board.id;
      });

      const counting = [];
      for (let i = 0; i < boardsId.length; i++) {
        const count = await this.ListRepository.allBoardCount(boardsId, i);
        counting.push(count);
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['totalLike'] = counting[i];
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['nickname'] = boards[i].user.nickname;
      }

      return boards;
    } else if (category) {
      const boardsData = await this.ListRepository.categoryBoardFind(
        pages,
        limit,
      );

      const boards = boardsData.filter(
        (board) => board.boardData[0].area === category,
      );

      const boardsId = boards.map((board) => {
        return board.id;
      });

      const counting = [];
      for (let i = 0; i < boardsId.length; i++) {
        const count = await this.ListRepository.categoryBoardCount(boardsId, i);
        counting.push(count);
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['totalLike'] = counting[i];
      }

      for (let i = 0; i < boardsId.length; i++) {
        boards[i]['nickname'] = boards[i].user.nickname;
      }

      return boards;
    }
  }
}
