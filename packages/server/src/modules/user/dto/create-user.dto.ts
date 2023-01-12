import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string

  @ApiProperty({ description: '确认密码' })
  @IsNotEmpty({ message: '请确认密码' })
  confirm_password?: string

  @ApiProperty({ description: '用户角色' })
  role?: 'admin' | 'visitor'
}
