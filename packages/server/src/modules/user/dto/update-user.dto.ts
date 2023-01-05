import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '昵称' })
  nickname: string

  @ApiProperty({ description: '头像' })
  avatar: string

  email: string
}

export class updatePasswordDto {
  @ApiProperty({ description: '新密码' })
  @IsNotEmpty({ message: '旧密码不能为空' })
  newPassword: string

  @ApiProperty({ description: '旧密码' })
  @IsNotEmpty({ message: '新密码不能为空' })
  oldPassword: string
}
