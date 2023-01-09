import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Patch, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/core/guards/role.guard'
import { JwtService } from '@nestjs/jwt'
import { SearchQuery } from 'src/types/interface/query.interface'
import { Roles } from 'src/core/decorators/role.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import type { UserRo } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'
import { updatePasswordDto } from './dto/update-user.dto'

@ApiTags('用户')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [UserEntity] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser)
  }

  @ApiOperation({ summary: '获取全部用户信息' })
  @Roles('admin')
  @ApiResponse({ status: 200, description: '获取用户列表', type: [UserEntity] })
  @ApiResponse({ status: 403, description: '无权获取用户列表' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUserInfo(@Query() query: SearchQuery): Promise<UserRo> {
    return this.userService.findAll(query)
  }

  async checkPermission(req, user) {
    let token = req.headers.authorization
    if (!token)
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED)

    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop()
    }
    const tokenUser = this.jwtService.decode(token) as UserEntity
    const id = tokenUser.id

    if (!id)
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED)

    const exist = await this.userService.findOne(id)

    if (exist.id !== user.id && exist.role !== 'admin')
      throw new HttpException('无权处理', HttpStatus.FORBIDDEN)

    req.user = tokenUser
  }

  /**
   * 用户更新
   * @param user
   */
  @ApiResponse({ status: 200, description: '更新用户成功', type: UserEntity })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '更新用户信息' })
  @Patch('update')
  @Roles('admin')
  async update(@Request() req, @Body() user: Partial<UserEntity>): Promise<UserEntity> {
    await this.checkPermission(req, user)
    const d = await this.userService.updateById(req.user, user.id, user)
    return d
  }

  /**
   * 更新用户密码
   * @param user
   */
  @ApiResponse({ status: 201, description: '更新密码成功', type: UserEntity })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '更新用户密码' })
  @Post('password')
  async updatePassword(@Request() req, @Body() user: updatePasswordDto): Promise<UserEntity> {
    await this.checkPermission(req, user)
    const d = await this.userService.updatePassword(req.user.id, user)
    return d
  }

  // @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }
}
