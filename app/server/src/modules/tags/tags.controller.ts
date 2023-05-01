import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/core/guards/role.guard'
import { Roles } from 'src/core/decorators/role.decorator'
import type { ResponseVo } from 'src/common/vo/res.vo'
import { TagsService } from './tags.service'
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
  findAll(@Query() queryParams): Promise<ResponseVo<TagEntity>> {
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
  @Patch(':id')
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
