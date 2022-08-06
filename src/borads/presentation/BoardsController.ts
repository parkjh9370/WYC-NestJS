import { PostBoardUseCase } from '../application/PostBoardUseCase/PostBoardUseCase';
import { UploadedBoardPathUseCase } from '../application/UploadedBoardPathUseCase/UploadedBoardPathUseCase';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utills/multer.options';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { AddPostDTO } from './dto/post.board.request.dto';
import { GetDetailBoardDataUseCase } from '../application/GetDetailBoardData/GetDetailBoardDataUseCase';

@Controller('boards')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(
    private readonly uploadedBoardPathUseCase: UploadedBoardPathUseCase,
    private readonly postBoardUseCase: PostBoardUseCase,
    private readonly getDetailBoardDataUseCase: GetDetailBoardDataUseCase,
  ) {}

  @ApiOperation({ summary: '장소 이미지 업로드' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions('image')))
  @Post('img')
  uploadBoardImg(@UploadedFile() files: Express.Multer.File) {
    return this.uploadedBoardPathUseCase.execute(files);
  }

  @ApiOperation({ summary: '게시글 업로드' })
  @UseGuards(JwtAuthGuard)
  @Post()
  postBoard(@CurrentUser() user: NowUser, @Body() data: AddPostDTO) {
    const { id } = user;
    return this.postBoardUseCase.execute(id, data);
  }

  @ApiOperation({ summary: '상세 게시글 정보 가져오기' })
  @Get(':id')
  async getDetailBoard(@Param('id') id: string) {
    return this.getDetailBoardDataUseCase.execute(id);
  }
}
