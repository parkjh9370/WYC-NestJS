import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDTO } from '../presentation/dto/user-register.dto';
import { UserEntity } from '../infra/entity/users.entity';

import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../infra/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersEntity: Repository<UserEntity>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async registerUser(userRegisterDTO: UserRegisterDTO) {
    const { email, password } = userRegisterDTO;

    const isUserExist = await this.usersRepository.findUserByEmail(email);
    if (isUserExist) {
      throw new UnauthorizedException('해당 이메일은 이미 존재합니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersEntity.save({
      ...userRegisterDTO,
      password: hashedPassword,
    });

    return { message: '회원가입 성공!' };
  }
}
