import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { getClientIP } from 'src/utils/ip'
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard'
import { Roles } from 'src/modules/auth/role.decorator'
import { RolesGuard } from '../auth/role.guard'
import { ViewService } from './view.service'
import { ViewEntity } from './entities/view.entity'

@Controller('view')
@ApiTags('查看')
@UseGuards(RolesGuard)
export class ViewController {
  constructor(private readonly viewService: ViewService) { }

  /**
   * 添加访问记录
   * @param tag
   */
  @ApiOperation({ summary: '添加访问记录' })
  @ApiResponse({ status: 200, description: '访问记录添加成功', type: [ViewEntity] })
  @Post()
  create(@Request() req, @Body() data) {
    const userAgent = req.headers['user-agent']
    const url = data.url
    return this.viewService.create(getClientIP(req), userAgent, url)
  }

  /**
 * 获取所有访问
 */
  @Get()
  @ApiResponse({ type: ViewEntity })
  @ApiOperation({ summary: '获取所有访问' })
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queryParam) {
    return this.viewService.findAll(queryParam)
  }

  /**
   * 根据url获取指定访问
   * @param id
   */
  @ApiResponse({ type: ViewEntity })
  @ApiOperation({ summary: '获取指定访问' })
  @Get('/url')
  findByUrl(@Query('url') url: string) {
    return this.viewService.findByUrl(url)
  }

  /**
   * 根据id获取指定访问
   * @param id
   */
  @Get(':id')
  @ApiResponse({ type: ViewEntity })
  @ApiOperation({ summary: '获取指定访问' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findById(@Param('id') id: string) {
    return this.viewService.findById(id)
  }

  /**
   * 删除访问
   * @param id
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除指定访问' })
  @Roles('admin')
  deleteById(@Param('id') id) {
    return this.viewService.deleteById(id)
  }
}
