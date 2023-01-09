import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from 'typeorm'

@Entity('menu')
@Tree('closure-table')
export class MenuEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  // 菜单名
  @Column()
  name: string

  // 路由
  @Column()
  path: string

  // 排序
  @Column()
  sort: number

  // 图标
  @Column()
  icon: string

  // 是否显示
  @Column({ default: true })
  show: boolean

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

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_time',
  })
  createTime: Date

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
    name: 'update_time',
  })
  updateTime: Date
}

export const Person2Id = (data) => {
  const responseObj: Array<MenuEntity & { parent_id: number }> = [...data]
  responseObj.forEach((item) => {
    if (item.parent)
      item.parent_id = item.parent.id
    delete item.parent
    if (item?.children?.length > 0)
      Person2Id(item.children)
  })
  return responseObj
}
