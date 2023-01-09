import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { MenusService } from './menus.service'
import { MenusController } from './menus.controller'
import { MenuEntity } from './entities/menu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity]), AuthModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule { }
