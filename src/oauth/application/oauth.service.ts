import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { OauthRepository } from '../infra/oauth.repository';
import { OauthRequestQuery } from '../presentation/dto/oauth.request.param';

@Injectable()
export class OauthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly oauthRepository: OauthRepository,
  ) {}

  async kakaoLoginExcute(query: OauthRequestQuery) {
    const oauthData = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      // 클라이언트에서 받은 인가 코드
      code: query.code,
    };

    const url = `https://kauth.kakao.com/oauth/token?code=${oauthData.code}&client_id=${oauthData.client_id}&redirect_uri=${oauthData.redirect_uri}&grant_type=${oauthData.grant_type}`;

    const response = await axios.post(url, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    });

    const { access_token } = response.data;

    // access_toke을 통해 유저 정보 요청
    const getKakaoUserInfo = await axios.get(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/x-www-form-urlencoded',
        },
      },
    );

    // 유저 정보 세팅
    const { profile } = getKakaoUserInfo.data.kakao_account;

    const findPreLogin = await this.oauthRepository.isPreUser(getKakaoUserInfo);

    // 유저 정보 있을 시
    if (findPreLogin) {
      const userId = findPreLogin.id;
      const nickname = findPreLogin.nickname;
      const payload = { id: userId };

      return {
        userId: userId,
        accessToken: this.jwtService.sign(payload),
        nickname: nickname,
        message: '로그인에 성공했습니다.',
      };
      // 유저 정보 없을 시
    } else {
      const userInfo = await this.oauthRepository.saveNewSocialUser(
        profile,
        getKakaoUserInfo,
      );

      const userId = userInfo.id;
      const nickname = userInfo.nickname;

      const payload = { id: userId };

      return {
        userId: userId,

        accessToken: this.jwtService.sign(payload),
        nickname: nickname,
        message: '로그인에 성공했습니다.',
      };
    }
  }
}
