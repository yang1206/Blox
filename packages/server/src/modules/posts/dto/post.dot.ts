import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string

  @ApiPropertyOptional({ description: '文章封面' })
  readonly coverUrl: string

  @IsNotEmpty({ message: '文章状态必填' })
  @ApiPropertyOptional({ description: '文章状态' })
  readonly status: string

  @IsNumber()
  @ApiProperty({ description: '文章分类' })
  readonly category: number

  @ApiPropertyOptional({ description: '是否推荐' })
  readonly isRecommend: boolean

  @ApiPropertyOptional({ description: '文章标签' })
  readonly tag: string
}

export class LikePostDto {
  @ApiPropertyOptional({ description: '是否点赞' })
  @IsNotEmpty({ message: '必填' })
  readonly type: 0 | 1
}
export class PostInfoDto {
  public id: string
  public title: string
  public content: string
  public contentHtml: string
  public summary: string
  public toc: string
  public coverUrl: string
  public isRecommend: boolean
  public status: string
  // public userId: string;
  public author: string
  public category: string
  public tags: string[]
  public views: number
  public likeCount: number
}

export interface PostsRo {
  list: PostInfoDto[]
  total: number
  pageNum: number
  pageSize: number
}
