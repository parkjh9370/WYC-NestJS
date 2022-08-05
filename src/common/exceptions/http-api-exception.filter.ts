import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // context 실행환경에 대해 응답, 요청 들고옴
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // error type : string, object
    // string : 직접 작성한 에러 메세지
    // object : Nest 자체적인 에러 메세지(json 형태)
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    // 응답값 형태
    // 직접 인자값에 넣은 에러 (라우터 자체적인 에러)
    // new UnauthorizedException
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
      // 그렇지 않을 경우 지정되어 있는 statuCode와 메세지 리턴한다.
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
