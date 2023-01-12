import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

export abstract class CommonEntity {
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

  // 软删除
  @Column({
    default: false,
    select: false,
    name: 'is_delete',
  })
    isDelete: boolean

  // 更新次数
  @VersionColumn({
    select: false,
  })
    version: number
}
