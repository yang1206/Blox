import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { PaginationDTO } from 'src/common/dto/pagination.dto'
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

@ApiTags('图床模块')
@Controller()
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
    private readonly configService: ConfigService,
  ) { }

  @Post('upload')
  @ApiFile()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.pictureService.upload(file)
  }

  @ApiOkResponse({ description: '图片列表' })
  @Get('list')
  async getMany(
    @Query() pageDto: PaginationDTO,
  ) {
    return await this.pictureService.getMany(pageDto)
  }
}
