import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserEntity } from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
