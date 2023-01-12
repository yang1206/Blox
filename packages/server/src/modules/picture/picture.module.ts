import { join } from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { PictureController } from './picture.controller'
import { PictureService } from './picture.service'
import { PictureEntity } from './entities/picture.entity'

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../images'),
      filename: (_, file, callback) => {
        const fileName = `${file.originalname}`
        return callback(null, fileName)
      },
    }),
  }),
  TypeOrmModule.forFeature([PictureEntity]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule { }
