import { UploadedBoardPathUseCaseResponse } from './dto/UploadedBoardPathUseCaseResponse';
import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/common/core/presentation/UseCase';

@Injectable()
export class UploadedBoardPathUseCase
  implements UseCase<Express.Multer.File, UploadedBoardPathUseCaseResponse>
{
  async execute(
    files: Express.Multer.File,
  ): Promise<UploadedBoardPathUseCaseResponse> {
    return { location: `http://localhost:8000/media/image/${files.filename}` };
  }
}
