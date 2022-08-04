import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { BoradsModule } from 'src/borads/borads.module';
import { LikesModule } from 'src/likes/likes.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    // 환경변수 사용
    ConfigModule.forRoot(),
    // 인증
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // 토근 발급(등록) 시 조건
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    // 순환 모듈 참조 문제 해결
    forwardRef(() => UsersModule),
    forwardRef(() => BoradsModule),
    forwardRef(() => LikesModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
