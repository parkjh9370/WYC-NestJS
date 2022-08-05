import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/infra/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';

type Payload = {
  id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersRepository: UsersRepository,
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

    const payload: Payload = { id: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
      nickname: user.nickname,
      message: '로그인에 성공했습니다.',
    };
  }
}
