import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OauthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersEntity: Repository<UserEntity>,
  ) {}

  async hi() {
    return 'hi';
  }
}
