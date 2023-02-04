import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string
}

export class RefreshDto {
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '请输入用户id' })
  id: string

  @ApiProperty({ description: '刷新token' })
  @IsNotEmpty({ message: '请输入刷新token' })
  refresh_token: string
}
