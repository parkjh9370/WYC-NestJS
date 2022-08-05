import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    example: '회원가입이 완료되었습니다.',
    description: 'message',
  })
  description: string;
}
