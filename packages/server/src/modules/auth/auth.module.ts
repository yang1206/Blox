import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UserModule } from 'src/modules/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStorage } from './strategies/local.strategy'
import { JwtStorage } from './strategies/jwt.strategy'

const passModule = PassportModule.register({ defaultStrategy: 'jwt' })
const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '3d' },
    }
  },
})

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    passModule,
    jwtModule,
    forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule, passModule],

})
export class AuthModule { }
