import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { ViewService } from './view.service'
import { ViewController } from './view.controller'
import { ViewEntity } from './entities/view.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ViewEntity]), AuthModule],
  controllers: [ViewController],
  providers: [ViewService],
  exports: [ViewService],
})
export class ViewModule { }
