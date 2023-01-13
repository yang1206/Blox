import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { Roles } from 'src/core/decorators/role.decorator'
import { PictureService } from './picture.service'

export const ApiFile
  = (fileName = 'file'): MethodDecorator =>
    (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            [fileName]: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })(target, propertyKey, descriptor)
    }

@ApiTags('图片')
@Controller()
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
  ) { }

  @Post('upload')
  @ApiFile()
  @Roles('admin')
  @ApiOperation({ summary: '上传图片' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.pictureService.upload(file)
  }

  @ApiOkResponse({ description: '图片列表' })
  @ApiOperation({ summary: '获取文件列表' })
  @Get('list')
  @Roles('admin')
  async getMany(
    @Query() pageDto: PaginationDTO,
  ) {
    return await this.pictureService.getMany(pageDto)
  }
}
