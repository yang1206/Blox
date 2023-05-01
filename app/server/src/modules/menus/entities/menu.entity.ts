import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/common/entity/common.entity'
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm'

@Entity('menu')
@Tree('closure-table')
export class MenuEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  // 菜单名
  @Column()
  name: string

  // 路由
  @Column()
  path: string

  // // 路由
  // @Column()
  // label: string

  // 排序
  @Column()
  sort: number

  // 图标
  @Column()
  icon: string

  // 是否显示在菜单中
  @Column({ default: true })
  show: boolean

  // 是否在layout中
  @Column({ default: true })
  inlayout: boolean

  // @ManyToOne(() => MenuEntity, menus => menus.children)
  // parent: MenuEntity

  // // 子菜单
  // @OneToMany(() => MenuEntity, menus => menus.parent)
  // children: MenuEntity[]

  @TreeChildren()
  children: MenuEntity[]

  @TreeParent()
  @JoinColumn({
    name: 'parent_id',
  })
  parent: MenuEntity

  // @BeforeInsert()
  // async setLabel() {
  //   if (this.path)
  //     this.label = this.path
  // }
}

export function Person2Id(data) {
  const responseObj: Array<MenuEntity & { parent_id: number }> = [...data]
  responseObj.forEach((item) => {
    if (item.parent)
      item.parent_id = item.parent.id
    delete item.parent
    if (item?.children?.length > 0)
      Person2Id(item.children)
    if (item.children.length === 0)
      delete item.children
  })
  return responseObj
}
