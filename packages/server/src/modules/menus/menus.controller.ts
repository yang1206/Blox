import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard'
import { RolesGuard } from 'src/core/guards/role.guard'
import { Roles } from 'src/core/decorators/role.decorator'
import { MenusService } from './menus.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { MenuEntity } from './entities/menu.entity'

@ApiTags('菜单')
@UseGuards(RolesGuard)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  /**
 * 创建菜单
 * @param body
 */
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ type: MenuEntity })
  @Roles('admin')
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto)
  }

  /**
 * 查询全部菜单
 */
  @ApiOperation({ summary: '查询全部菜单' })
  @ApiResponse({ type: [MenuEntity] })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.menusService.findAll()
  }

  /**
* 查询指定菜单
* @param id
*/
  @ApiOperation({ summary: '查询指定菜单' })
  @ApiResponse({ type: MenuEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id)
  }

  /**
* 更新指定菜单
* @param id
* @param body
*/
  @ApiOperation({ summary: '更新指定菜单' })
  @ApiResponse({ type: MenuEntity })
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto)
  }

  /**
* 删除指定菜单
* @param id
*/
  @ApiOperation({ summary: '删除指定菜单' })
  @ApiResponse({ type: MenuEntity })
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id)
  }
}
