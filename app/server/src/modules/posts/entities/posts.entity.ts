import { TagEntity } from 'src/modules/tags/entities/tag.entity'
import { CategoryEntity } from 'src/modules/category/entities/category.entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import type { TransformFnParams } from 'class-transformer'
import { Exclude, Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/common/entity/common.entity'
import type { PostInfo } from '../vo/post.vo'

@Entity('posts')
export class PostsEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // 文章标题
  @Column({ length: 50 })
  title: string

  // markdown内容
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content: string

  // markdown 转 html
  @Column({ type: 'mediumtext', default: null, name: 'content_html', charset: 'utf8mb4' })
  contentHtml: string

  @ApiProperty()
  @Column({ type: 'mediumtext', default: null })
  toc: string // 格式化内容索引，自动生成

  // 摘要，自动生成
  @Column({ type: 'text', default: null })
  summary: string

  // 封面图
  @Column({ default: null, name: 'cover_url' })
  coverUrl: string

  // 阅读量
  @Column({ type: 'int', default: 0 })
  views: number

  // 点赞量
  @Column({ type: 'int', default: 0, name: 'like_count' })
  likeCount: number

  // 推荐显示
  @Column({ type: 'tinyint', default: false, name: 'is_recommend' })
  isRecommend: boolean

  // 文章状态
  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string

  // 作者
  @ManyToOne(() => UserEntity, user => user.nickname)
  author: UserEntity

  // 分类
  @Exclude()
  @ManyToOne(() => CategoryEntity, category => category.posts, {
    cascade: true,
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: CategoryEntity

  // 标签
  // 多对多
  @ManyToMany(() => TagEntity, tag => tag.posts, { cascade: true })
  @JoinTable({
    name: 'post_tag',
    joinColumns: [{ name: 'post_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: TagEntity[]

  @ApiProperty()
  @Column({ type: 'text', default: null, select: false })
  password: string

  @ApiProperty()
  @Column({ type: 'boolean', name: 'need_password', default: false })
  needPassword: boolean

  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  isCommentable: boolean

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @Column({ type: 'timestamp', name: 'publish_time', default: null })
  publishTime: Date

  toResponseObject(): PostInfo {
    const responseObj: PostInfo = {
      ...this,
      // userId: '',
      author: '',
      category: '',
      tags: [],
      isRecommend: false,
    }
    if (this.category)
      responseObj.category = this.category.name

    if (this.tags && this.tags.length)
      responseObj.tags = this.tags.map(item => item.name)
    if (this.toc)
      responseObj.toc = JSON.parse(this.toc)
    if (this.author && this.author.id) {
      // responseObj.userId = this.author.id;
      responseObj.author = this.author.nickname || this.author.username
    }
    return responseObj
  }
}
