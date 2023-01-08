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
  @ApiProperty()
  public id: string

  @ApiProperty()
  public title: string

  @ApiProperty()
  public content: string

  @ApiProperty()
  public contentHtml: string

  @ApiProperty()
  public summary: string

  @ApiProperty()
  public toc: string

  @ApiProperty()
  public coverUrl: string

  @ApiProperty()
  public isRecommend: boolean

  @ApiProperty()
  public status: string

  @ApiProperty()
  // public userId: string;
  public author: string

  @ApiProperty()
  public category: string

  @ApiProperty()
  public tags: string[]

  @ApiProperty()
  public views: number

  @ApiProperty()
  public likeCount: number
}

export class PostsRo {
  @ApiProperty()
  list: PostInfoDto[]

  @ApiProperty()
  total: number

  @ApiProperty()
  pageNum: number

  @ApiProperty()
  pageSize: number
}
