import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UsersModule } from './users/users.module';
import { BoradsModule } from './borads/BoardsModule';
import * as Joi from 'joi';
import { UserEntity } from './users/infra/entity/users.entity';
import { BoardEntity } from './borads/infra/entities/BoardEntity';
import { CommentEntity } from './comments/infra/entity/comments.entity';
import { LocationEntity } from './borads/infra/entities/BoardsLoationDataEntity';
import { BoardDataEntity } from './borads/infra/entities/BoardsDataEntity';
import { LikesModule } from './likes/likes.module';
import { LikeEntity } from './likes/infra/entity/likes.entity';
import { CommentsModule } from './comments/comments.module';
import { ListsModule } from './lists/lists.module';
import { OauthModule } from './oauth/oauth.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'),
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
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
    keepConnectionAlive: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
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
