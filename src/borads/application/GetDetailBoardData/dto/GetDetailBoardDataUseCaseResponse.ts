export interface GetDetailBoardDataUseCaseResponse {
  board: any; // 추후 수정
  boardData: any; // 추후 수정
  location: Location;
  message: string;
}

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  roadAdd: string;
  lotAdd: string;
}
