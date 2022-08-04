import {
  Controller,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import axios, { AxiosResponse } from 'axios';
import { JwtService } from '@nestjs/jwt';

@Controller('oauth')
@UseInterceptors(SuccessInterceptor) // Response 형태
@UseFilters(HttpExceptionFilter) // Error 처리 형태
export class OauthController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  @Post('kakao')
  async kakaoLogin(@Query() query) {
    console.log(query);

    const oauthData = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      // 클라이언트에서 받은 인가 코드
      code: query.code,
    };

    const url = `https://kauth.kakao.com/oauth/token?code=${oauthData.code}&client_id=${oauthData.client_id}&redirect_uri=${oauthData.redirect_uri}&grant_type=${oauthData.grant_type}`;

    // console.log('axios');
    //  access_token 값 요청
    // const response = await axios.post(
    //   url,
    //   {},
    //   {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    // );

    const response = await axios.post(url, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    });

    const { access_token } = response.data;

    // // access_toke을 통해 유저 정보 요청
    const getKakaoUserInfo = await axios.get(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/x-www-form-urlencoded',
        },
      },
    );

    // console.log(getKakaoUserInfo);

    // // 유저 정보 세팅
    const { profile } = getKakaoUserInfo.data.kakao_account;

    const findPreLogin = await this.userRepository.findOne({
      where: {
        provider: 'kakao',
        snsid: getKakaoUserInfo.data.kakao_account.email,
      },
    });

    // const payload = { id: user.id };

    // // console.log(this.jwtService.sign(payload));
    // return {
    //   userId: user.id,
    //   // 토큰 생성하여 리턴
    //   accessToken: this.jwtService.sign(payload),
    //   nickname: user.nickname,
    //   message: '로그인에 성공했습니다.',
    // };
    // console.log('gggg');

    if (findPreLogin) {
      const userId = findPreLogin.id;
      const nickname = findPreLogin.nickname;
      const payload = { id: userId };

      console.log(userId);
      console.log(nickname);

      return {
        userId: userId,
        // 토큰 생성하여 리턴
        accessToken: this.jwtService.sign(payload),
        nickname: nickname,
        message: '로그인에 성공했습니다.',
      };
    } else {
      //   console.log('lkawejkl');
      //   console.log(getKakaoUserInfo.data.kakao_account.email);
      const userInfo = await this.userRepository.save({
        nickname: profile.nickname,
        provider: 'kakao',
        snsid: getKakaoUserInfo.data.kakao_account.email,
      });

      const userId = userInfo.id;
      const nickname = userInfo.nickname;

      const payload = { id: userId };

      //   console.log(userId);
      //   console.log(nickname);

      return {
        userId: userId,
        // 토큰 생성하여 리턴
        accessToken: this.jwtService.sign(payload),
        nickname: nickname,
        message: '로그인에 성공했습니다.',
      };
    }
  }

  @Post('google')
  async googleLogin() {
    return 'google';
  }

  @Post('naver')
  async naverLogin() {
    return 'naver';
  }
}
