import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PictureController } from './file.controller'
import { PictureService } from './file.service'
import { FileEntity } from './entities/file.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule { }
