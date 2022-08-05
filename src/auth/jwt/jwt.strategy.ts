import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/users/infra/users.repository';
import { Payload } from './jwt.payload';

// 인증
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UsersRepository: UsersRepository) {
    // 인증 시 jwt 설정 + 인증까지 실행되는 듯!
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.UsersRepository.findUserByIdWithoutPassword(
      payload.id,
    );

    if (user) {
      return user; // request.user 에 user 설정됨
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}

/**
 * 유저 요청(+Jwt Token) -> JWT Guard
 * -> Jwt Strategy
 * 해당 Jwt Token 이 유효한지에 대한 판단 후
 * decode된 token 을 통해 유저 정보 확인 및 저장
 */
