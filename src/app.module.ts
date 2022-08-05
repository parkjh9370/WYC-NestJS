import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UsersModule } from './users/users.module';
import { BoradsModule } from './borads/borads.module';
import * as Joi from 'joi';
import { UserEntity } from './users/infra/entity/users.entity';
import { BoardEntity } from './borads/infra/entities/boards.entity';
import { CommentEntity } from './comments/infra/entity/comments.entity';
import { LocationEntity } from './borads/infra/entities/locations.entity';
import { BoardDataEntity } from './borads/infra/entities/board-datas.entity';
import { LikesModule } from './likes/likes.module';
import { LikeEntity } from './likes/infra/entity/likes.entity';
import { CommentsModule } from './comments/comments.module';
import { ListsModule } from './lists/lists.module';
import { OauthModule } from './oauth/oauth.module';

const typeOrmModuleOptions = {
  // 함수에 대한 모듈 설정
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'), // process.env.DB_HOST
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [
      UserEntity,
      BoardEntity,
      CommentEntity,
      LikeEntity,
      LocationEntity,
      BoardDataEntity,
    ],
    // db가 모두 지워졌다 생성됨, 배포 단계에서는 false로 설정하고 마이그레이션 해야함
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true, // entity 가 자동으로 불러와짐
    logging: false,
    keepConnectionAlive: true, // 연결 될 때까지 시도
  }),
  // 의존성 주입, ConfigService.get 으로 환경변수 가져오기 위함
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      // 모든 모듈에서 ConfigModule 사용
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(8000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BoradsModule,
    LikesModule,
    CommentsModule,
    ListsModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 로깅
  }
}
