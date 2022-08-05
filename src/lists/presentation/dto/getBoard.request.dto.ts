import { IsNotEmpty, IsString } from 'class-validator';

export class boardListQuery {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  pages: string;

  @IsString()
  @IsNotEmpty()
  limit: string;
}
