import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { SearchDTO } from 'src/common/dto/search.dto'
import { Roles } from 'src/core/decorators/role.decorator'
import { PictureService } from './file.service'

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

@ApiTags('文件')
@Controller('file')
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
  ) { }

  @Post('upload')
  @ApiFile()
  @Roles('admin')
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: '文件',
          type: 'string',
          format: 'binary',
        },
        business: {
          description: '上传文件描述，可以是纯字符串，也可以是JSON字符串',
          type: 'string',
          format: 'text',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: { business: string }, @Req() req,
  ) {
    return await this.pictureService.upload([file], params.business || '', req.user)
  }

  @ApiOkResponse({ description: '文件列表' })
  @ApiOperation({ summary: '获取文件列表' })
  @Get('list')
  @Roles('admin')
  async getMany(
    @Query() pageDto: SearchDTO,
  ) {
    return await this.pictureService.getMany(pageDto)
  }
}
