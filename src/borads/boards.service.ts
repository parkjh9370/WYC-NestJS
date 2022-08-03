import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { BoardEntity } from './entities/boards.entity';

@Injectable()
export class BoardsService {
  constructor() {}

  async uploadImg(cat: UserEntity, files: Express.Multer.File[]) {
    // console.log('dd');
    // console.log(files);
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    console.log(fileName);

    // const newCat = await this.catsRepository.findByIdAndUpdateImg(
    //   cat.id,
    //   fileName,
    // );
    // console.log(newCat);
    return 'hi';
  }
}
