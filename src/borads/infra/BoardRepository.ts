import { Location, SiteInfo } from '../presentation/dto/post.board.request.dto';

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
  board(id: string);
  boardData(id: string): Promise<any>;
  locationData(id: string): Promise<any>;
}
