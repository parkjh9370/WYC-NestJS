import { ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OauthController } from './presentation/oauth.controller';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { OauthService } from './application/oauth.service';
import { OauthRepository } from './infra/oauth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [OauthController],
  providers: [OauthService, OauthRepository],
  exports: [],
})
export class OauthModule {}
