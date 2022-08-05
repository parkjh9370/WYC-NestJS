import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../infra/entity/users.entity';

export class UserRegisterDTO extends PickType(UserEntity, [
  'email',
  'password',
  'nickname',
  'name',
] as const) {
  // @IsString()
  // @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  // password: string;
}
