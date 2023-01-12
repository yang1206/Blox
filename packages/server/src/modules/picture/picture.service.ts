import * as path from 'node:path'
import * as fs from 'fs'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { PaginationDTO } from 'src/common/dto/pagination.dto'
import { Repository } from 'typeorm/repository/Repository'
import { encryptFileMD5 } from 'src/utils/crypto'
import type { PictureCreateDto } from './dto/picture-create'
import { PictureEntity } from './entities/picture.entity'

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(PictureEntity)
    private readonly pictureRepository: Repository<PictureEntity>,
  ) {}

  async getMany(
    pageDto: PaginationDTO,
  ) {
    const { pageNum = 1, pageSize = 10 } = pageDto
    const getList = this.pictureRepository
      .createQueryBuilder('picture')
      .select([
        'picture.src',
      ])
      .skip((+pageNum - 1) * +pageSize)
      .take(+pageSize)
      .getManyAndCount()

    const [list, total] = await getList

    return {
      list,
      total,
      pageNum,
      pageSize,
    }
  }

  async create(
    pictureCreateDTO: PictureCreateDto,
  ) {
    const picture = new PictureEntity()
    picture.src = pictureCreateDTO.src
    picture.sign = pictureCreateDTO.sign
    const result = await this.pictureRepository.save(picture)
    return {
      info: result,
    }
  }

  async getOneBySign(sign: string) {
    return await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.sign = :sign', { sign })
      .getOne()
  }

  async upload(file: any) {
    const { buffer } = file
    const currentSign = encryptFileMD5(buffer)
    const hasPicture = await this.getOneBySign(currentSign)

    if (hasPicture) {
      return {
        info: {
          src: hasPicture.src,
          isHas: true,
        },
      }
    }
    const arr = file.originalname.split('.')
    const fileType = arr[arr.length - 1]
    const fileName = `${currentSign}.${fileType}`
    const src = `${process.env.SERVE_UPLOAD_FOLDER}/${fileName}`
    fs.writeFileSync(path.join(__dirname, src), buffer)
    this.create({ src, sign: currentSign })

    return {
      info: {
        src,
        isHas: false,
      },
    }
  }
}
