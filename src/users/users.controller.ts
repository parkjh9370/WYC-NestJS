import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-api-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UserRegisterDTO } from './dto/user-register.dto';
import { SignUpResponseDto } from './dto/user-register-response.dto';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('auth')
@UseInterceptors(SuccessInterceptor) // Response 형태
@UseFilters(HttpExceptionFilter) // Error 처리 형태
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  @ApiResponse({
    status: 500,
    description: 'Server error...',
  })
  @ApiResponse({
    status: 200,
    description: '회원가입 성공!',
    type: SignUpResponseDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() userRegisterDTO: UserRegisterDTO) {
    return this.usersService.registerUser(userRegisterDTO);
  }

  @ApiOperation({ summary: '로그인 ' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('token/validate')
  validates(@CurrentUser() user) {
    return { valid: true, user };
  }
}
