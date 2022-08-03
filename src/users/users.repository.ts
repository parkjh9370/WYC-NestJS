import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async findUserByIdWithoutPassword(id: string): Promise<UserEntity | null> {
    // password 제외 된 데이터 가져옴
    const user = await this.usersRepository.findOne({ id });
    return user;
  }
}
