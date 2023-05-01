import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from 'src/core/guards/role.guard'
import { Request } from 'express'

import { Roles } from 'src/core/decorators/role.decorator'
import { ResponseVo } from 'src/common/vo/res.vo'
import { SearchDTO } from 'src/common/dto/search.dto'
import { CreatePostDto, LikePostDto } from './dto/post.dto'
import { PostsService } from './posts.service'
import { PostInfo } from './vo/post.vo'

@ApiTags('文章')
@Controller('posts')
@UseGuards(RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Roles('admin')
  @Post()
  async create(@Body() post: CreatePostDto, @Req() req: Request) {
    return await this.postsService.create(req.user, post)
  }

  /**
   * 获取所有文章
   */
  @ApiResponse({ status: 200, type: ResponseVo<PostInfo> })
  @ApiOperation({ summary: '获取所有文章' })
  @Get()
  async findAll(@Query() query: SearchDTO) {
    return await this.postsService.findAll(query)
  }

  /**
   * 获取所有推荐文章
   */
  @Get('/recommend')
  @ApiOperation({ summary: '获取所有推荐文章' })
  @ApiResponse({ status: 200, type: ResponseVo<PostInfo> })
  getRecommendArticles(@Query() query: SearchDTO) {
    return this.postsService.getRecommendArticles(query)
  }

  /**
     * 获取分类下所有文章
     */
  @Get('/category/:id')
  @ApiOperation({ summary: '获取分类下所有文章' })
  @ApiResponse({ status: 200, type: ResponseVo<PostInfo> })
  findArticlesByCategory(@Param('id') id: number, @Query() queryParams: SearchDTO) {
    return this.postsService.findArticlesByCategory(id, queryParams)
  }

  /**
   * 获取标签下所有文章
   */
  @ApiResponse({ status: 200, type: ResponseVo<PostInfo> })
  @Get('/tag/:id')
  @ApiOperation({ summary: '获取标签下所有文章' })
  findArticlesByTag(@Param('id') tag: number, @Query() queryParams: SearchDTO) {
    return this.postsService.findArticlesByTag(tag, queryParams)
  }

  /**
   * 获取所有文章归档
   */
  @Get('/archives')
  @ApiOperation({ summary: '获取所有文章归档' })
  getArchives(): Promise<{ [key: string]: PostInfo[] }> {
    return this.postsService.getArchives()
  }

  /**
  * 点赞 +1
  */
  @ApiOperation({ summary: '点赞文章' })
  @Post(':id/likes')
  updateLikesById(@Body() type: LikePostDto, @Param('id') id: number) {
    return this.postsService.updateLikesById(id, type)
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({ summary: '获取指定文章' })
  @ApiResponse({ status: 200, type: PostInfo })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postsService.findById(id)
  }

  /**
 * 获取相应文章的推荐文章
 */
  // @Get('/recommend')
  // recommend(@Query('articleId') articleId) {
  //   return this.postsService.recommend(articleId);
  // }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiOperation({ summary: '更新指定文章' })
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() post: CreatePostDto) {
    return await this.postsService.updateById(id, post)
  }

  /**
   * 删除
   * @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postsService.remove(id)
  }
}
