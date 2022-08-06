import { Injectable } from '@nestjs/common';
import { BoardsRepository } from 'src/borads/infra/boards.repository';
import { UseCase } from 'src/common/core/presentation/UseCase';
import { GetDetailBoardDataUseCaseRequest } from './dto/GetDetailBoardDataUseCaseRequest';
import { GetDetailBoardDataUseCaseResponse } from './dto/GetDetailBoardDataUseCaseResponse';

@Injectable()
export class GetDetailBoardDataUseCase
  implements
    UseCase<
      GetDetailBoardDataUseCaseRequest,
      GetDetailBoardDataUseCaseResponse
    >
{
  constructor(private readonly boardsRepository: BoardsRepository) {}
  async execute(id: GetDetailBoardDataUseCaseRequest) {
    const boardQuery = await this.boardsRepository.board(id);

    const board = {
      ...boardQuery,
      nickname: `${boardQuery.user.nickname}`,
      profile: `${boardQuery.user.profile}`,
    };

    const boardData = await this.boardsRepository.boardData(id);

    const findLocation = await this.boardsRepository.locationData(id);

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
