import { LocationEntity } from 'src/borads/infra/entities/locations.entity';
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
import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utills/multer.options';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardsService } from '../application/boards.service';
import { BoardDataEntity } from '../infra/entities/board-datas.entity';
import { BoardEntity } from '../infra/entities/boards.entity';
import { getManager, getRepository, Repository } from 'typeorm';
import { NowUser } from 'src/auth/dto/user.validated.dto';
import { AddPostDTO } from './dto/post.board.request.dto';

@Controller('boards')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntitiy: Repository<BoardEntity>,
    @InjectRepository(BoardDataEntity)
    private readonly boardEntity: Repository<BoardDataEntity>,
    @InjectRepository(LocationEntity)
    private readonly LocationEntity: Repository<LocationEntity>,
    private readonly authService: AuthService,
    private readonly boardsService: BoardsService,
  ) {}

  @ApiOperation({ summary: '장소 이미지 업로드' })
  @UseInterceptors(FileInterceptor('image', multerOptions('image')))
  @Post('img')
  uploadBoardImg(@UploadedFile() files: Express.Multer.File) {
    return this.boardsService.uploadedFilePath(files);
  }

  @ApiOperation({ summary: '게시글 업로드' })
  @UseGuards(JwtAuthGuard)
  @Post()
  postBoard(@CurrentUser() user: NowUser, @Body() data: AddPostDTO) {
    return this.boardsService.postBoard(user, data);
  }

  @ApiOperation({ summary: '상세 게시글 정보 가져오기' })
  @Get(':id')
  async getDetailBoard(@Param('id') id: string) {
    return this.boardsService.getDetailBoard(id);
  }
}
