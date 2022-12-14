import { IsNotEmpty, IsString } from 'class-validator';

export class LikeBoardId {
  @IsString()
  @IsNotEmpty()
  id: string;
}
