import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/core/guards/role.guard'
import { Roles } from 'src/core/decorators/role.decorator'
import type { SearchDTO } from 'src/common/dto/search.dto'
import type { CategoryService } from './category.service'
import type { CreateCategoryDto } from './dto/category.dto'
import { CategoryEntity } from './entities/category.entity'

@Controller('category')
@ApiTags('分类')
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  /**
   * 添加标签
   * @param body
   */
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ type: CategoryEntity })
  @Roles('admin')
  @Post()
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoryService.create(body.name)
  }

  /**
   * 获取所有分类
   */
  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  findAll(@Query() queryParams: SearchDTO) {
    return this.categoryService.findAll(queryParams)
  }

  /**
   * 获取指定标签
   * @param id
   */
  @Get(':id')
  @ApiOperation({ summary: '获取指定分类' })
  findById(@Param('id') id: number) {
    return this.categoryService.findById(id)
  }

  /**
 * 更新分类
 * @param id
 * @param category
 */
  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: '更新分类信息' })
  updateById(@Param('id') id: number, @Body() category: CreateCategoryDto) {
    return this.categoryService.updateById(id, category)
  }

  /**
   * 删除标签
   * @param id
   */
  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除分类' })
  deleteById(@Param('id') id: number) {
    return this.categoryService.deleteById(id)
  }
}
