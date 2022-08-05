import { Injectable } from '@nestjs/common';
import { BoardsRepository } from '../infra/boards.repository';
import { AddPostDTO } from '../presentation/dto/post.board.request.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async uploadedFilePath(files: Express.Multer.File) {
    return { location: `http://localhost:8000/media/image/${files.filename}` };
  }

  async postBoard(user, data: AddPostDTO) {
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
    return { boardId: board, message: '게시물 생성이 완료되었습니다.' };
  }

  async getDetailBoard(id: string) {
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
