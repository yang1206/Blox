import { join } from 'path'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ConfigModule } from '@nestjs/config'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../images'),
      filename: (_, file, callback) => {
        const fileName = `${file.originalname}`
        return callback(null, fileName)
      },
    }),
  }), ConfigModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }
