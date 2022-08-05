import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/infra/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';
// import { UsersRepository } from 'src/users/infra/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersRepository: UsersRepository,
    // module(JwtModule) 에서 공급자가 있기 때문에 이를 DI 받을 수 있다.
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당 이메일 일치 여부
    const user = await this.UsersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // 해당 패스워드 일치 여부
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // jwt payload 정보
    // const payload = { email: email, sub: cat.id };
    const payload = { id: user.id };

    // console.log(this.jwtService.sign(payload));
    return {
      userId: user.id,
      // 토큰 생성하여 리턴
      accessToken: this.jwtService.sign(payload),
      nickname: user.nickname,
      message: '로그인에 성공했습니다.',
    };
  }
}
