import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import { HttpExceptionFilter } from './common/exceptions/http-api-exception.filter';

import * as path from 'path';

class Application {
  private logger = new Logger(Application.name);
  private DEV_MODE: boolean;
  private PORT: string;
  private corsOriginList: string[];
  private ADMIN_USER: string;
  private ADMIN_PASSWORD: string;

  constructor(private server: NestExpressApplication) {
    this.server = server;

    // if (!process.env.SECRET_KEY) this.logger.error('Set "SECRET" env');
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
    this.PORT = process.env.PORT || '8000';
    this.corsOriginList = process.env.CORS_ORIGIN_LIST
      ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
      : ['http://localhost:3000']; // 허용할 주소
    this.ADMIN_USER = process.env.ADMIN_USER;
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  }

  private setUpBasicAuth() {
    this.server.use(
      ['/docs', '/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.ADMIN_USER]: this.ADMIN_PASSWORD,
        },
      }),
    );
  }

  private setUseStaticAssets() {
    this.server.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
      prefix: '/media',
    });
  }

  private setUpOpenAPIMiddleware() {
    SwaggerModule.setup(
      'docs',
      this.server,
      SwaggerModule.createDocument(
        this.server,
        new DocumentBuilder()
          .setTitle('WYC - API')
          .setDescription('Server In NestJS')
          .setVersion('1.0.0')
          .build(),
      ),
    );
  }

  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    });
    this.setUseStaticAssets();
    this.setUpBasicAuth();
    this.setUpOpenAPIMiddleware();
    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    // 엔티티 설계 시 @Exclude 데코레이터를 통해 데이터 반환 받을 시 해당 인자는 빼줄 수 있다.
    this.server.useGlobalInterceptors(new ClassSerializerInterceptor(this.server.get(Reflector)));
    this.server.useGlobalFilters(new HttpExceptionFilter());
  }

  async boostrap() {
    await this.setUpGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }

  errorLog(error: string) {
    this.logger.error(`🆘 Server error ${error}`);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.boostrap();
  app.startLog();
}

init().catch((error) => {
  new Logger('init').error(error);
});
