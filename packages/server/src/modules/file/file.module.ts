import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PictureController } from './file.controller'
import { PictureService } from './file.service'
import { PictureEntity } from './entities/file.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([PictureEntity]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule { }
