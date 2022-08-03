import {
  BadRequestException,
  Bind,
  Controller,
  Post,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import {
  multerDiskOptions,
  multerOptions,
} from 'src/common/utills/multer.options';
import { BoardsService } from './boards.service';
import { join } from 'path';

@Controller('boards')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(
    private readonly authService: AuthService,
    private readonly boardsService: BoardsService,
  ) {}

  @ApiOperation({ summary: '장소 이미지 업로드' })
  // 프론트에서 전송해주는 키 이름으로 인자 설정,
  // 사진 업로드 갯수 제한
  // 파일 업로드 조건(upload/cats 라는 폴더에 사진 파일 저장)
  @UseInterceptors(FileInterceptor('image', multerOptions('image')))
  @UseGuards(JwtAuthGuard)
  @Post('img')
  uploadBoardImg(
    @UploadedFile() files: Express.Multer.File,
    @CurrentUser() user,
  ) {
    // console.log(user);
    // console.log(files.filename);
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    // return this.boardsService.uploadImg(user, files);
    // 현재 url 경로를 return 해준다.
    return { location: `http://localhost:8000/media/image/${files.filename}` };
  }
}
