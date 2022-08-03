import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/users/users.entity';

export class LoginRequestDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
