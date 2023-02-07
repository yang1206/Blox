import * as path from 'path'
import * as fs from 'fs'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { SearchDTO } from 'src/common/dto/search.dto'
import { Repository } from 'typeorm/repository/Repository'
import { ConfigService } from '@nestjs/config'
import * as mime from 'mime-types'
import * as uuid from 'uuid'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { ResultData } from 'src/core/decorators/api-result.decorator'
import { getPagination } from 'src/utils/pagination'
import { PictureEntity } from './entities/file.entity'

@Injectable()
export class PictureService {
  private readonly productLocation = process.cwd()
  private isAbsPath = false
  constructor(
    private configServer: ConfigService,
    @InjectRepository(PictureEntity)
    private readonly pictureRepository: Repository<PictureEntity>,
  ) {
    this.isAbsPath = path.isAbsolute(this.configServer.get<string>('SERVE_UPLOAD_FOLDER'))
  }

  async getMany(
    pageDto: SearchDTO,
  ) {
    const { page = 1, size = 10, updateTimeStart, updateTimeEnd } = pageDto
    const query = this.pictureRepository
      .createQueryBuilder('file')
      .skip((+page - 1) * +size)
      .take(+size)

    // 时间段查询
    if (updateTimeStart && updateTimeEnd) {
      query.andWhere('post.update_time BETWEEN :start AND :end', {
        start: updateTimeStart,
        end: updateTimeEnd,
      })
    }
    const [list, total] = await query.getManyAndCount()
    const pageData = getPagination(total, page, size)
    return {
      list,
      ...pageData,
    }
  }

  async getOneByName(id: number) {
    return await this.pictureRepository
      .createQueryBuilder('file')
      .where('file.id = :id', { id })
      .getOne()
  }

  async upload(files: Express.Multer.File[], business: string, user: { id: string; account: string }) {
    const ossList = files.map((file) => {
      // 重新命名文件， uuid, 根据 mimeType 决定 文件扩展名， 直接拿后缀名不可靠
      const newFileName = `${uuid.v4().replace(/-/g, '')}.${mime.extension(file.mimetype)}`
      // 文件存储路径
      const fileLocation = path.normalize(this.isAbsPath ? `dist/${this.configServer.get<string>('SERVE_UPLOAD_FOLDER')}/${newFileName}` : path.join(this.productLocation, `dist/${this.configServer.get<string>('SERVE_UPLOAD_FOLDER')}`, newFileName))
      // fs 创建文件写入流
      const writeFile = fs.createWriteStream(fileLocation)
      writeFile.write(file.buffer)
      writeFile.close()
      const ossFile = {
        url: `${this.configServer.get<string>('SERVER_PORT')}/${this.configServer.get<string>('SERVE_UPLOAD_FOLDER') || ''}/${newFileName}`,
        size: file.size,
        type: file.mimetype,
        location: fileLocation,
        business: business || '',
        userId: user.id,
        userAccount: user.account,
        // name: file.filename,
      }
      return plainToInstance(PictureEntity, ossFile)
    })
    const result = await this.pictureRepository.save<PictureEntity>(ossList)
    if (!result)
      return ResultData.fail(500, '文件存储失败，请稍后重新上传')

    return ResultData.ok(instanceToPlain(result))
  }
}
