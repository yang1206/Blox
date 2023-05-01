import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { RefreshJwtAuthGuard } from 'src/core/guards/jwt-refresh-auth.guard'
import type { LoginDto, RefreshDto } from './dto/login.dto'
import type { AuthService } from './auth.service'

@Controller()
@ApiTags('验证')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @ApiOperation({ summary: '登录' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user)
  }

  @ApiOperation({ summary: '刷新token' })
  @UseGuards(RefreshJwtAuthGuard)
  @Post('auth/refresh')
  async refresh(@Body() refreshData: RefreshDto) {
    return await this.authService.refreshToken(refreshData)
  }
}
