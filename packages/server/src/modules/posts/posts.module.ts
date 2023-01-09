import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/modules/auth/auth.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { TagsModule } from 'src/modules/tags/tags.module'
import { PostsEntity } from './entities/posts.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity]),
    CategoryModule,
    TagsModule,
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule { }
