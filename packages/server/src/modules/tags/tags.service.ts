import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import type { SearchQuery } from 'src/types/interface/query.interface'
import { TagEntity } from './entities/tag.entity'
import type { CreateTagDto, TagsRo } from './dto/tag.dto'
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
  async findAll(queryParams: SearchQuery): Promise<TagsRo> {
    const { pageNum = 1, pageSize = 10, postsStatus, ...params } = queryParams
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
        query.andWhere(`tag.${key} LIKE :${key}`).setParameter(`${key}`, `%${params[key]}%`)
      })
    }
    query.skip((+pageNum - 1) * +pageSize)
    query.take(+pageSize)
    const [data, total] = await query.getManyAndCount()
    data.forEach((d) => {
      Object.assign(d, { postsCount: d.posts.length })
      delete d.posts
    })
    return {
      list: data,
      total,
      pageNum,
      pageSize,
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