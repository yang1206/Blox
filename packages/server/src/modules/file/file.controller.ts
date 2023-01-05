import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { FileService } from './file.service'

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

@ApiTags('公共接口')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传图片' })
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  // @ApiParam({ name: 'file', description: '图片文件', required: true })
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      file: `${this.configService.get('STATIC_BASE_Url')}/img/${file.originalname}`,
    }
  }
}
