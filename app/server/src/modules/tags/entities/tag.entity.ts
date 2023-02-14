import { CommonEntity } from 'src/common/entity/common.entity'
import { PostsEntity } from 'src/modules/posts/entities/posts.entity'
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('tag')
export class TagEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  // 标签名
  @Column()
  name: string

  @ManyToMany(() => PostsEntity, post => post.tags)
  posts: Array<PostsEntity>
}
