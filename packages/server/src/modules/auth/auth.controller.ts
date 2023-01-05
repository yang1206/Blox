import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { Roles } from './role.decorator'

@Controller('auth')
@ApiTags('验证')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @ApiOperation({ summary: '登录' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user)
  }

  @Post('admin')
  @Roles('admin')
  createBook() {
    return this.authService.checkAdmin()
  }
}
