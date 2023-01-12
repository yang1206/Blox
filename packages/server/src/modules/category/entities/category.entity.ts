import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/common/entity/common.entity'
import { PostsEntity } from 'src/modules/posts/entities/posts.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('category')
export class CategoryEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @OneToMany(() => PostsEntity, post => post.category)
  posts: Array<PostsEntity>
}
