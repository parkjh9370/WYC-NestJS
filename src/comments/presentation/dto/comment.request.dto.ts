import { IsNotEmpty, IsString } from 'class-validator';

export class CommentBody {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
