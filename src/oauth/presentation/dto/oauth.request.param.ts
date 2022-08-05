import { IsNotEmpty, IsString } from 'class-validator';

export class OauthRequestQuery {
  @IsString()
  @IsNotEmpty()
  code: string;
}
