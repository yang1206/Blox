import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { PaginationDTO } from 'src/common/dto/pagination.dto'
import { Repository } from 'typeorm/repository/Repository'
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
    picture.name = pictureCreateDTO.name
    const result = await this.pictureRepository.save(picture)
    delete result.isDelete
    delete result.version
    return result
  }

  async getOneByName(name: string) {
    return await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.name = :name', { name })
      .getOne()
  }

  async upload(file: Express.Multer.File) {
    const { filename } = file
    const hasPicture = await this.getOneByName(filename)
    if (hasPicture)
      return hasPicture
    const src = `/${process.env.SERVE_UPLOAD_FOLDER}/${filename}`
    const newfile = await this.create({ src, name: filename })
    return newfile
  }
}
