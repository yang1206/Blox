import { Controller, Delete, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard'
import { RolesGuard } from 'src/core/guards/role.guard'
import { Roles } from 'src/core/decorators/role.decorator'
import type { SearchDTO } from 'src/common/dto/search.dto'
import type { SearchService } from './search.service'

@ApiTags('搜索')
@Controller('search')
@UseGuards(RolesGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  /**
   * 搜索文章
   * @param keyword
   */
  @ApiOperation({ summary: '搜索文章,增加搜索记录' })
  @Get('/article')
  async searchArticle(@Query('keyword') keyword: string) {
    const data = await this.searchService.searchArticle('article', keyword)
    return data
  }

  /**
   * 获取搜索记录
   */
  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取搜索记录' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryParam: SearchDTO) {
    return this.searchService.findAll(queryParam)
  }

  /**
   * 删除搜索记录
   * @param id
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除搜索记录' })
  @Roles('admin')
  deleteById(@Param('id') id) {
    return this.searchService.deleteById(id)
  }
}
