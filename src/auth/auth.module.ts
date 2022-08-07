import { OauthModule } from './../oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { BoradsModule } from 'src/borads/BoardsModule';
import { LikesModule } from 'src/likes/likes.module';
import { CommentsModule } from 'src/comments/CommenetModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => BoradsModule),
    forwardRef(() => LikesModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => OauthModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
