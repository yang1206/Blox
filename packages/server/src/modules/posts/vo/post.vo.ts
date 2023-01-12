import { ApiProperty } from '@nestjs/swagger'

export class PostInfo {
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
