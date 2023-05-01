import * as path from 'node:path'
import * as fsExtra from 'fs-extra'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { SearchDTO } from 'src/common/dto/search.dto'
import type { Repository } from 'typeorm/repository/Repository'
import type { ConfigService } from '@nestjs/config'
import * as mime from 'mime-types'
import { plainToInstance } from 'class-transformer'
import { getPagination } from 'src/utils/pagination'
import { getUUID } from 'src/utils/crypto'
import { FileEntity } from './entities/file.entity'

@Injectable()
export class PictureService {
  private readonly productLocation = process.cwd()
  private isAbsPath = false
  constructor(
    private configServer: ConfigService,
    @InjectRepository(FileEntity)
    private readonly pictureRepository: Repository<FileEntity>,
  ) {
    // 上传创建目录
    fsExtra.ensureDir(path.join(__dirname, path.normalize(`../../${this.configServer.get<string>('SERVE_UPLOAD_FOLDER')}`)))
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
    const fileData = files.map((file) => {
      // 重新命名文件， uuid, 根据 mimeType 决定 文件扩展名， 直接拿后缀名不可靠
      const newFileName = `${getUUID().replace(/-/g, '')}.${mime.extension(file.mimetype)}`
      // 文件存储路径
      const fileLocation = path.normalize(this.isAbsPath ? `dist/${this.configServer.get<string>('SERVE_UPLOAD_FOLDER')}/${newFileName}` : path.join(this.productLocation, `dist/${this.configServer.get<string>('SERVE_UPLOAD_FOLDER')}`, newFileName))
      // fs 创建文件写入流
      const writeFile = fsExtra.createWriteStream(fileLocation)
      writeFile.write(file.buffer)
      writeFile.close()
      const File = {
        url: `${this.configServer.get<string>('SERVER_PORT')}/${this.configServer.get<string>('SERVE_UPLOAD_FOLDER') || ''}/${newFileName}`,
        size: file.size,
        type: file.mimetype,
        location: fileLocation,
        business: business || '',
        userId: user.id,
        userAccount: user.account,
        // name: file.filename,
      }
      return plainToInstance(FileEntity, File)
    })
    const result = await this.pictureRepository.save<FileEntity>(fileData)
    return result
  }
}
