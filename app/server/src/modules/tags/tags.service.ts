import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import type { ResponseVo } from 'src/common/vo/res.vo'
import { getPagination } from 'src/utils/pagination'
import type { SearchDTO } from 'src/common/dto/search.dto'
import { TagEntity } from './entities/tag.entity'
import type { CreateTagDto } from './dto/tag.dto'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>,
  ) { }

  async create(body: CreateTagDto) {
    const { name } = body
    const existTag = await this.tagsRepository.findOne({ where: { name } })

    if (existTag)
      throw new HttpException('标签已存在', HttpStatus.BAD_REQUEST)

    const newTag = await this.tagsRepository.create(body)
    return await this.tagsRepository.save(newTag)
  }

  /**
   * 获取所有标签
   */
  async findAll(queryParams: SearchDTO): Promise<ResponseVo<TagEntity>> {
    const { page = 1, size = 10, postsStatus, ...params } = queryParams
    const query = this.tagsRepository.createQueryBuilder('tag').orderBy('tag.createTime', 'ASC')

    if (postsStatus) {
      query.leftJoinAndSelect('tag.posts', 'post', 'post.status=:status', {
        status: postsStatus,
      })
    }
    else {
      query.leftJoinAndSelect('tag.posts', 'post')
    }
    if (params) {
      Object.keys(params).forEach((key) => {
        const data = new TagEntity()
        if (!(key in data))
          return
        query.andWhere(`tag.${key} LIKE :${key}`).setParameter(`${key}`, `%${params[key]}%`)
      })
    }
    query.skip((+page - 1) * +size)
    query.take(+size)
    const [data, total] = await query.getManyAndCount()
    data.forEach((d) => {
      Object.assign(d, { postsCount: d.posts.length })
      delete d.posts
    })
    const pageData = getPagination(total, page, size)

    return {
      list: data,
      ...pageData,
    }
  }

  /**
  * 获取指定标签
  * @param id
  */
  async findById(id: number): Promise<TagEntity> {
    const data = await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.id=:id')
      .leftJoinAndSelect('tag.posts', 'post')
      .setParameter('id', id)
      .getOne()

    return data
  }

  /**
  * 更新标签
  * @param id
  * @param tag
  */
  async updateById(id: number, tag: CreateTagDto): Promise<TagEntity> {
    const oldTag = await this.tagsRepository.findOneBy({ id })
    const updatedTag = await this.tagsRepository.merge(oldTag, tag)
    return this.tagsRepository.save(updatedTag)
  }

  /**
   * 删除标签
   * @param id
   */
  async deleteById(id: number) {
    try {
      const tag = await this.tagsRepository.findOneBy({ id })
      await this.tagsRepository.remove(tag)
      return true
    }
    catch (e) {
      throw new HttpException('删除失败，未查询到标签或该标签可能存在关联文章', HttpStatus.BAD_REQUEST)
    }
  }

  async findByIds(ids: string[]) {
    return await this.tagsRepository.findBy({ id: In(ids) })
  }
}
