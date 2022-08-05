import {
  Controller,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { OauthService } from '../application/oauth.service';
import { OauthRequestQuery } from './dto/oauth.request.param';

@Controller('oauth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class OauthController {
  constructor(private oauthService: OauthService) {}

  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  @Post('kakao')
  async kakaoLogin(@Query() query: OauthRequestQuery) {
    return await this.oauthService.kakaoLoginExcute(query);
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
