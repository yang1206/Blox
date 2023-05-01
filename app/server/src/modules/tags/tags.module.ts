import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/modules/auth/auth.module'
import { TagsService } from './tags.service'
import { TagsController } from './tags.controller'
import { TagEntity } from './entities/tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule { }
