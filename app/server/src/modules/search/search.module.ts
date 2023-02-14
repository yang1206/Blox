import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { PostsModule } from '../posts/posts.module'
import { SearchService } from './search.service'
import { SearchController } from './search.controller'
import { SearchEntity } from './entities/search.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SearchEntity]), AuthModule, PostsModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule { }
