import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infra/entity/users.entity';

export class LoginRequestDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
