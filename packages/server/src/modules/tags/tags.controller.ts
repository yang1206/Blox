import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Roles } from '../auth/role.decorator'
import { RolesGuard } from '../auth/role.guard'
import { TagsService } from './tags.service'
import type { TagsRo } from './dto/tag.dto'
import { CreateTagDto } from './dto/tag.dto'
import type { TagEntity } from './entities/tag.entity'

@ApiTags('标签')
@Controller('tags')
@UseGuards(RolesGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @ApiOperation({ summary: '创建标签' })
  @Roles('admin')
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto)
  }

  /**
    * 获取所有标签
    */
  @Get()
  @ApiOperation({ summary: '获取所有标签' })
  findAll(@Query() queryParams): Promise<TagsRo> {
    return this.tagsService.findAll(queryParams)
  }

  /**
 * 获取指定标签
 * @param id
 */
  @ApiOperation({ summary: '获取指定标签' })
  @Get(':id')
  findById(@Param('id') id: number): Promise<TagEntity> {
    return this.tagsService.findById(id)
  }

  /**
   * 更新标签
   * @param id
   * @param tag
   */
  @ApiOperation({ summary: '更新标签' })
  @Put(':id')
  @Roles('admin')
  updateById(@Param('id') id: number, @Body() tag: CreateTagDto) {
    return this.tagsService.updateById(id, tag)
  }

  /**
     * 删除标签
     * @param id
     */
  @ApiOperation({ summary: '删除标签' })
  @Delete(':id')
  @Roles('admin')
  deleteById(@Param('id') id: number) {
    return this.tagsService.deleteById(id)
  }
}
