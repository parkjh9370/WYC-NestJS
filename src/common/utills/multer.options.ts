import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

const createFolder = (folder: string) => {
  try {
    console.log('πΎ Create a root uploads folder...');
    // νμ¬ μμΉμ λΆλͺ¨ ν΄λμ κ°μ uploadsλΌλ ν΄λ μμ±
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`πΎ Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {
      //* μ΄λμ μ μ₯ν  μ§
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      //* μ΄λ€ μ΄λ¦μΌλ‘ μ¬λ¦΄ μ§
      // extname : νμ₯μ μΆμΆ
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};

export const multerDiskOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // μ΄λ―Έμ§ νμμ jpg, jpeg, pngλ§ νμ©ν©λλ€.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: 'μ§μνμ§ μλ μ΄λ―Έμ§ νμμλλ€.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      if (!fs.existsSync(uploadPath)) {
        // uploads ν΄λκ° μ‘΄μ¬νμ§ μμμ, μμ±ν©λλ€.
        fs.mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      //νμΌ μ΄λ¦ μ€μ 
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldNameSize: 200,
    filedSize: 1024 * 1024,
    fields: 2,
    fileSize: 16777216,
    files: 10,
  },
};
export const uploadFileURL = (fileName): string =>
  `http://localhost:8000/uploads/${fileName}`;
