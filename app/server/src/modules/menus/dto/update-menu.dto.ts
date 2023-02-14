import { PartialType } from '@nestjs/mapped-types'
import type { MenuEntity } from '../entities/menu.entity'
import { CreateMenuDto } from './create-menu.dto'

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  parent: MenuEntity
  parent_id: number
}
