import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OauthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersEntity: Repository<UserEntity>,
  ) {}

  async isPreUser(getKakaoUserInfo) {
    return await this.usersEntity.findOne({
      where: {
        provider: 'kakao',
        snsid: getKakaoUserInfo.data.kakao_account.email,
      },
    });
  }

  async saveNewSocialUser(profile, getKakaoUserInfo) {
    return await this.usersEntity.save({
      nickname: profile.nickname,
      provider: 'kakao',
      snsid: getKakaoUserInfo.data.kakao_account.email,
    });
  }
}
