import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  createFile(files, field: string): string {
    try {
      const file = files[0];
      const format = file.mimetype.split('/')[1];
      const fileName = `${v4()}.${format}`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        {
          message: 'File upload error',
          field,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
